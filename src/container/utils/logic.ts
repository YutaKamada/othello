import _ from "lodash";
import { BLACK, BOTH, WHITE } from "../../constants/board";
import { BoardState, Coordinate, KindOfStone } from "../../recoil/boardAtom";
import { INITIAL_CAN_PUT_BOARD_STATE } from "../../constants/board";

type Vector = Coordinate;

// 検知用単位ベクトル
const UNIT_VECTORS: readonly Vector[] = [
  { v: -1, h: -1 }, // 左上
  { v: 0, h: -1 }, // 左中
  { v: 1, h: -1 }, // 左下
  { v: -1, h: 0 }, //上
  { v: 1, h: 0 }, // 下
  { v: -1, h: 1 }, // 右上
  { v: 0, h: 1 }, // 右中
  { v: 1, h: 1 }, // 右下
];

/**
 * 石を反転させる
 * @param boardState 盤の状態
 * @param coordinate 石がおかれた座標
 * @param turn 現在のターン
 * @returns
 */
export const turnOverStones = (
  boardState: BoardState,
  coordinate: Coordinate,
  turn: KindOfStone
) => {
  const turnOverVectors = UNIT_VECTORS.map((d) => {
    const turnOverVectors: Vector[] = [];
    const results = recursionCheckTurnOver(
      boardState,
      coordinate,
      turn,
      { ...d },
      turnOverVectors,
      d
    );
    return results;
  }).flat();

  const nextBoardState = { ...boardState };
  // 現在の座標から ベクトル分だけ増加させた座標の石を反転させる
  turnOverVectors.forEach((d) => {
    const v = d.v + coordinate.v;
    const h = d.h + coordinate.h;

    nextBoardState[v][h] = turn;
  });
  return nextBoardState;
};

/**
 * 現在の座標から unitVector の方向に反転対象があるか再帰的に判定する
 *
 * @param boardState
 * @param coordinate
 * @param turn
 * @param nowVector 現在のベクトル
 * @param requiredTurnOverVectors 反転対象
 * @param unitVector 方向単位ベクトル
 * @returns
 */
const recursionCheckTurnOver = (
  boardState: BoardState,
  coordinate: Coordinate,
  turn: KindOfStone,
  nowVector: Vector,
  requiredTurnOverVectors: Vector[],
  unitVector: Readonly<Vector>
): Vector[] => {
  const checkResult = checkCellStatus(
    boardState,
    { coordinate, color: turn },
    nowVector
  );
  switch (checkResult) {
    // 枠端 , 空
    case "OutOfFrame":
    case "Empty": {
      // 判定が途中で終了したため、色変更の必要なし
      return [];
    }
    // 同色
    case "SameColor": {
      // 今までの挟まれたものを返却
      return requiredTurnOverVectors;
    }
    // 異色
    case "OtherColor": {
      requiredTurnOverVectors.push(nowVector);
    }
  }

  // 方向の値を加算して次の検査へ
  const nextDiffDirection = {
    v: nowVector.v + unitVector.v,
    h: nowVector.h + unitVector.h,
  };

  return recursionCheckTurnOver(
    boardState,
    coordinate,
    turn,
    nextDiffDirection,
    requiredTurnOverVectors,
    unitVector
  );
};

type TotalType = { black: Coordinate[]; white: Coordinate[] };

/**
 * 盤の状態から次に配置できる座標群を作成する
 * @param boardState
 * @returns
 */
export const createEnableBoard = (boardState: BoardState) => {
  // 配置されている石
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
      UNIT_VECTORS
        // 配置されている石から8方向に検査する
        .map((d) => {
          const tmpResults: Vector[] = [];
          const resultDirection = recursionCheckEnable(
            boardState,
            stone,
            { ...d },
            tmpResults,
            d
          );
          return resultDirection !== undefined
            ? {
                v: stone.coordinate.v + resultDirection.v,
                h: stone.coordinate.h + resultDirection.h,
              }
            : undefined;
        })
        .flat()
        // TotalTypeに成形
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
    // TotalTypeに成形
    .reduce<TotalType>(
      (acc, cur) => ({
        black: [...acc.black, ...cur.black],
        white: [...acc.white, ...cur.white],
      }),
      { black: [], white: [] }
    );

  const initialBoardEnableState = _.cloneDeep(INITIAL_CAN_PUT_BOARD_STATE);
  enableCoordinates.black.forEach(
    (c) => (initialBoardEnableState[c.v][c.h] = BLACK)
  );
  enableCoordinates.white.forEach((c) => {
    const prev = initialBoardEnableState[c.v][c.h];
    if (prev === BLACK) {
      // 黒も白もおける
      initialBoardEnableState[c.v][c.h] = BOTH;
    } else {
      initialBoardEnableState[c.v][c.h] = WHITE;
    }
  });
  return initialBoardEnableState;
};

/**
 * 現在の座標から unitVector の方向に配置可能箇所があるか再帰的に判定する
 * @param boardState
 * @param stone
 * @param nowVector
 * @param checkedVectors
 * @param unitVector
 * @returns Vector: unitVector方向に nowVector だけ動かしたところに配置箇所あり
 * 　　　　　undefined : unitVector方向に配置箇所なし
 */
const recursionCheckEnable = (
  boardState: BoardState,
  stone: {
    coordinate: Coordinate;
    color: KindOfStone;
  },
  nowVector: Vector,
  checkedVectors: Vector[],
  unitVector: Readonly<Vector>
): Vector | undefined => {
  const checkResult = checkCellStatus(boardState, stone, nowVector);
  switch (checkResult) {
    // 枠端 , 同色
    case "OutOfFrame":
    case "SameColor": {
      // 判定が途中で終了したため、この方向に配置可能箇所はない
      return undefined;
    }
    // 空
    case "Empty": {
      // 異色（検査済み）のものが一つでもあれば、nowVectorが配置可能座標
      return checkedVectors.length !== 0 ? nowVector : undefined;
    }
    // 異色
    case "OtherColor": {
      checkedVectors.push(nowVector);
    }
  }

  // 単位ベクトル値を加算して次の検査へ
  const nextDiffDirection = {
    v: nowVector.v + unitVector.v,
    h: nowVector.h + unitVector.h,
  };

  return recursionCheckEnable(
    boardState,
    stone,
    nextDiffDirection,
    checkedVectors,
    unitVector
  );
};

/** 検知後のタイプ */
type CellStatusType =
  | "OutOfFrame" // 枠外
  | "Empty" // 空
  | "SameColor" // 同色;
  | "OtherColor"; // 異色
/**
 * 対象の石を基準に、checkVector 分だけ動かした後の盤上ではどの状態かを検査する
 * @param boardState
 * @param stoneStatus 対象の石の状態
 * @param checkVector 検査方向
 * @returns {@type CellStatusType}
 */
const checkCellStatus = (
  boardState: BoardState,
  stoneStatus: {
    coordinate: Coordinate;
    color: KindOfStone;
  },
  checkVector: Vector
): CellStatusType => {
  const { coordinate, color } = stoneStatus;
  const target = {
    v: coordinate.v + checkVector.v,
    h: coordinate.h + checkVector.h,
  };

  if (checkOutOfFrame(target)) {
    return "OutOfFrame";
  }

  if (checkEmpty(target, boardState)) {
    return "Empty";
  }

  if (checkSameColor(target, boardState, color)) {
    return "SameColor";
  }

  return "OtherColor";
};

/**
 * 枠外検査
 * @param target
 * @returns
 */
const checkOutOfFrame = (target: Coordinate) =>
  !(0 <= target.v && target.v <= 7 && 0 <= target.h && target.h <= 7);

/**
 * 空検査
 * @param target
 * @param boardState
 * @returns
 */
const checkEmpty = (target: Coordinate, boardState: BoardState) =>
  boardState[target.v][target.h] === undefined;

/**
 * 同色検査
 * @param target
 * @param boardState
 * @param ownColor
 * @returns
 */
const checkSameColor = (
  target: Coordinate,
  boardState: BoardState,
  ownColor: KindOfStone
) => boardState[target.v][target.h] === ownColor;
