import { atom, DefaultValue, selector, selectorFamily } from "recoil";
import {
  BLACK,
  BOTH,
  DRAW,
  INITIAL_BOARD_STATE,
  WHITE,
} from "../constants/board";
import { createEnableBoard } from "../container/utils/logic";
import {
  canPutBoardAtom,
  CanPutBoardState,
  CanPutStoneState,
} from "./canPutBoardAtom";
import { gameStatusAtom, GameStatusState } from "./gameStatusAtom";

// 盤目上の座標 (0 <= v(vertical) <= 8 , 0<= h(horizontal) <= 8)
export type Coordinate = { v: number; h: number };

// Stoneの種類
export type KindOfStone = typeof BLACK | typeof WHITE;
export type StoneState = KindOfStone | undefined;

export interface BoardState {
  [v: number]: { [h: number]: StoneState };
}

const boardAtom = atom<BoardState>({
  key: "BoardState",
  default: INITIAL_BOARD_STATE,
});

export const boardSelector = selector<BoardState>({
  key: "boardSelector",
  get: ({ get }) => get(boardAtom),
  set: ({ get, set }, newBoardState) => {
    set<BoardState>(boardAtom, newBoardState);
    if (newBoardState instanceof DefaultValue) {
      return;
    }
    const newCanPutBoardState = createEnableBoard(newBoardState);
    // CanPutBoardStateを更新
    set<CanPutBoardState>(canPutBoardAtom, createEnableBoard(newBoardState));

    // GameStatus更新
    const points = calcPoints(newBoardState);
    const canPutCounts = calcCanPutCounts(newCanPutBoardState);
    const prevGameStatus = get(gameStatusAtom);
    set<GameStatusState>(gameStatusAtom, {
      points,
      canPutCounts,
      turn: prevGameStatus.turn === BLACK ? WHITE : BLACK,
      gameResult: getGameResult({ points, canPutCounts }),
    });
  },
});

/**
 * 盤上の座標からセルの状態を取得する
 */
export const cellSelector = selectorFamily<StoneState, Coordinate>({
  key: "cellSelector",
  get:
    ({ v, h }) =>
    ({ get }) => {
      // 盤内
      if (0 <= v && v <= 7 && 0 <= h && h <= 7) {
        const val = get(boardAtom);
        return val[v][h];
      }
      return undefined;
    },
});

/**
 * BoardState から 現在の戦績を計算する
 * @param boardState
 * @returns
 */
const calcPoints = (boardState: BoardState) =>
  Object.entries(boardState)
    .map(([_, row]) =>
      Object.entries(row).map(([_, stone]) => stone as KindOfStone)
    )
    .flat()
    .reduce(
      (acc, cur) => {
        const black = cur === BLACK ? acc.black + 1 : acc.black;
        const white = cur === WHITE ? acc.white + 1 : acc.white;
        return { black, white };
      },
      { black: 0, white: 0 }
    );

/**
 * CanPutBoardState から設置可能数を計算する
 * @param canPutBoardState
 * @returns
 */
const calcCanPutCounts = (canPutBoardState: CanPutBoardState) =>
  Object.entries(canPutBoardState)
    .map(([_, row]) =>
      Object.entries(row).map(([_, stone]) => stone as CanPutStoneState)
    )
    .flat()
    .reduce(
      (acc, cur) => {
        const black = cur === BLACK || cur === BOTH ? acc.black + 1 : acc.black;
        const white = cur === WHITE || cur === BOTH ? acc.white + 1 : acc.white;
        return { black, white };
      },
      { black: 0, white: 0 }
    );

/**
 * ゲーム結果を取得する
 * @param condition
 * @returns
 */
const getGameResult = (
  condition: Pick<GameStatusState, "points" | "canPutCounts">
) => {
  const { points, canPutCounts } = condition;
  const gameEnd = canPutCounts.black === 0 && canPutCounts.white === 0;
  if (gameEnd) {
    const { black, white } = points;
    return { winner: black === white ? DRAW : black > white ? BLACK : WHITE };
  }
  return undefined;
};
