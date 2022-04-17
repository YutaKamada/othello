import _ from "lodash";
import { BLACK, WHITE } from "../../constants/constants";
import { BoardState, Coordinate, KindOfStone } from "../../recoil/boardAtom";
import { INITIAL_BOARD_ENABLE_STATE } from "../../recoil/boardEnableAtom";

type Direction = Coordinate;

// 検知用単位ベクトル
const UNIT_VECTORS: readonly Direction[] = [
  { v: -1, h: -1 }, // 左上
  { v: 0, h: -1 }, // 左中
  { v: 1, h: -1 }, // 左下
  { v: -1, h: 0 }, //上
  { v: 1, h: 0 }, // 下
  { v: -1, h: 1 }, // 右上
  { v: 0, h: 1 }, // 右中
  { v: 1, h: 1 }, // 右下
];

interface CheckTurnOverSet {
  boardState: BoardState;
  coordinate: Coordinate;
  turn: KindOfStone;
}

export const turnOverStones = (checkTurnOverSet: CheckTurnOverSet) => {
  const turnOverDirections = UNIT_VECTORS.map((d) => {
    const tmpResults: Direction[] = [];
    const results = recursionCheckTurnOver(
      checkTurnOverSet,
      { ...d },
      tmpResults,
      d
    );
    return results;
  }).flat();

  const nextBoardState = { ...checkTurnOverSet.boardState };
  turnOverDirections.forEach((d) => {
    const v = d.v + checkTurnOverSet.coordinate.v;
    const h = d.h + checkTurnOverSet.coordinate.h;

    nextBoardState[v][h] = checkTurnOverSet.turn;
  });
  return nextBoardState;
};

// TODO: 再帰関数で定義する
const recursionCheckTurnOver = (
  checkTurnOverSet: CheckTurnOverSet,
  nowDiffDirection: Direction, //現在の差分方向
  diffDirections: Direction[], // 今までの差分方向
  checkDirection: Readonly<Direction> // 検査する方向
): Direction[] => {
  const { boardState, coordinate, turn } = checkTurnOverSet;
  const checkResult = checkNextType(
    boardState,
    { coordinate, color: turn },
    nowDiffDirection
  );
  switch (checkResult) {
    // 枠端 , 空
    case "EndFrame":
    case "Empty": {
      // 判定が途中で終了したため、色変更の必要なし
      return [];
    }
    // 同色
    case "SameColor": {
      // 今までの挟まれたものを返却
      return diffDirections;
    }
    // 異色
    case "OtherColor": {
      // resultsに変更の位置を追加して再度検査
      diffDirections.push(nowDiffDirection);
    }
  }

  // 方向の値を加算して次の検査へ
  const nextDiffDirection = {
    v: nowDiffDirection.v + checkDirection.v,
    h: nowDiffDirection.h + checkDirection.h,
  };

  return recursionCheckTurnOver(
    checkTurnOverSet,
    nextDiffDirection,
    diffDirections,
    checkDirection
  );
};

type EndType =
  | "EndFrame" // 枠端
  | "Empty" // 空
  | "SameColor"; // 同色;

type ContinueType = "OtherColor"; // 異色

type NextType = ContinueType | EndType;

type TotalType = { black: Coordinate[]; white: Coordinate[] };

export const createEnableBoard = (boardState: BoardState) => {
  // 配置されているStone
  const stones: {
    coordinate: Coordinate;
    color: KindOfStone;
  }[] = [];
  for (const [v, row] of Object.entries(boardState)) {
    for (const [h, stone] of Object.entries(row)) {
      if (stone !== undefined) {
        stones.push({
          coordinate: { v: +v, h: +h },
          color: stone as KindOfStone,
        });
      }
    }
  }

  // 白黒ごとのEnableを出す
  const enableCoordinates = stones
    .map((stone) =>
      UNIT_VECTORS.map((d) => {
        const tmpResults: Direction[] = [];
        const resultDirection = recursionCheckEnable(
          boardState,
          stone,
          { ...d },
          tmpResults,
          d
        );
        if (resultDirection !== undefined) {
          return {
            v: stone.coordinate.v + resultDirection.v,
            h: stone.coordinate.h + resultDirection.h,
          };
        }
        return undefined;
      })
        .flat()
        .reduce<TotalType>(
          (acc, cur) => {
            if (cur === undefined) return acc;
            if (stone.color === BLACK) {
              return { ...acc, black: [...acc.black, cur] };
            }

            return { ...acc, white: [...acc.white, cur] };
          },
          { black: [], white: [] }
        )
    )
    .reduce<TotalType>(
      (acc, cur) => {
        return {
          black: [...acc.black, ...cur.black],
          white: [...acc.white, ...cur.white],
        };
      },
      { black: [], white: [] }
    );

  const initialBoardEnableState = _.cloneDeep(INITIAL_BOARD_ENABLE_STATE);
  console.log({ initialBoardEnableState, enableCoordinates });
  enableCoordinates.black.forEach(
    (c) => (initialBoardEnableState[c.v][c.h] = BLACK)
  );
  enableCoordinates.white.forEach(
    (c) => (initialBoardEnableState[c.v][c.h] = WHITE)
  );
  return initialBoardEnableState;
};

// TODO: 再帰関数で定義する
const recursionCheckEnable = (
  boardState: BoardState,
  stone: {
    coordinate: Coordinate;
    color: KindOfStone;
  },
  nowDiffDirection: Coordinate,
  diffDirections: Direction[],
  direction: Readonly<Direction>
): Direction | undefined => {
  const checkResult = checkNextType(boardState, stone, nowDiffDirection);
  switch (checkResult) {
    // 枠端 , 同色
    case "EndFrame":
    case "SameColor": {
      // 判定が途中で終了したため、この方向には設置可能なものはない
      return undefined;
    }
    // 空
    case "Empty": {
      // 異色のものが一つでもあれば現在の方向を返却（Enable な座標）
      return diffDirections.length !== 0 ? nowDiffDirection : undefined;
    }
    // 異色
    case "OtherColor": {
      // diffDirectionsに現在の位置を追加して再度検査
      diffDirections.push(nowDiffDirection);
    }
  }

  // 方向の値を加算して次の検査へ
  const nextDiffDirection = {
    v: nowDiffDirection.v + direction.v,
    h: nowDiffDirection.h + direction.h,
  };

  return recursionCheckEnable(
    boardState,
    stone,
    nextDiffDirection,
    diffDirections,
    direction
  );
};

const checkNextType = (
  boardState: BoardState,
  stone: {
    coordinate: Coordinate;
    color: KindOfStone;
  },
  checkDirection: Direction
): NextType => {
  const { coordinate, color } = stone;
  const target = {
    v: coordinate.v + checkDirection.v,
    h: coordinate.h + checkDirection.h,
  };

  if (checkOutOfFrame(target)) {
    return "EndFrame";
  }

  if (checkEmpty(target, boardState)) {
    return "Empty";
  }

  if (checkSameColor(target, boardState, color)) {
    return "SameColor";
  }

  return "OtherColor";
};

const checkOutOfFrame = (target: Coordinate) =>
  !(0 <= target.v && target.v <= 7 && 0 <= target.h && target.h <= 7);

const checkEmpty = (
  target: Coordinate,
  boardState: CheckTurnOverSet["boardState"]
) => boardState[target.v][target.h] === undefined;

const checkSameColor = (
  target: Coordinate,
  boardState: CheckTurnOverSet["boardState"],
  turn: CheckTurnOverSet["turn"]
) => boardState[target.v][target.h] === turn;
