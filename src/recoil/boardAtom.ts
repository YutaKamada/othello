import { atom, DefaultValue, selector, selectorFamily } from "recoil";
import { BLACK, INITIAL_BOARD_STATE, WHITE } from "../constants/board";
import { createEnableBoard } from "../container/utils/logic";
import { boardEnableAtom } from "./boardEnableAtom";

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
  get: ({ get }) => {
    const boardState = get(boardAtom);
    return boardState;
  },
  set: ({ set }, newValue) => {
    set<BoardState>(boardAtom, newValue);
    if (newValue instanceof DefaultValue) {
      return;
    }
    // EnableStateを更新
    set<BoardState>(boardEnableAtom, createEnableBoard(newValue));
  },
});

export const getCellStoneSelector = selectorFamily<StoneState, Coordinate>({
  key: "getCellStoneSelector",
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
