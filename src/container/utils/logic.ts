import { BLACK, WHITE } from "../../constants/constants";
import { BoardState, Coordinate } from "../../recoil/boardAtom";

type Direction = Coordinate;

// 検査方向
const DIRECTIONS: Direction[] = [
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
  turn: typeof BLACK | typeof WHITE;
}

export const turnOverStones = (checkTurnOverSet: CheckTurnOverSet) => {
  const turnOverDirections = DIRECTIONS.map((d) => {
    const tmpResults: Direction[] = [];
    const results = recursionCheckTurnOver(
      checkTurnOverSet,
      { ...d },
      tmpResults,
      d
    );
    return results;
  }).flat();

  // TODO: turnOverDirectionsを考慮して色変更する
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
  nowDirection: Coordinate,
  results: Direction[],
  direction: Readonly<Direction>
): Direction[] => {
  const checkResult = checkTurnOver(nowDirection, checkTurnOverSet);
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
      return results;
    }
    // 異色
    case "OtherColor": {
      // resultsに変更の位置を追加して再度検査
      results.push(nowDirection);
    }
  }

  // 方向の値を加算して次の検査へ
  const nextDirection = {
    v: nowDirection.v + direction.v,
    h: nowDirection.h + direction.h,
  };

  return recursionCheckTurnOver(
    checkTurnOverSet,
    nextDirection,
    results,
    direction
  );
};

type EndType =
  | "EndFrame" // 枠端
  | "Empty" // 空
  | "SameColor"; // 同色;

type ContinueType = "OtherColor"; // 異色

type NextType = ContinueType | EndType;

const checkTurnOver = (
  direction: Direction,
  checkTurnOverSet: CheckTurnOverSet
): NextType => {
  const { coordinate, boardState, turn } = checkTurnOverSet;
  const target = {
    v: coordinate.v + direction.v,
    h: coordinate.h + direction.h,
  };

  if (checkOutOfFrame(target)) {
    return "EndFrame";
  }

  if (checkEmpty(target, boardState)) {
    return "Empty";
  }

  if (checkSameColor(target, boardState, turn)) {
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
