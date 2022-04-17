import { atom, selectorFamily } from "recoil";
import { BLACK, INITIAL_BOARD_STATE, WHITE } from "../constants/board";

// 盤目上の座標 (0 <= v(vertical) <= 8 , 0<= h(horizontal) <= 8)
export type Coordinate = { v: number; h: number };

// Stoneの種類
export type KindOfStone = typeof BLACK | typeof WHITE;
export type StoneState = KindOfStone | undefined;

export interface BoardState {
  [v: number]: { [h: number]: StoneState };
}

export const boardAtom = atom<BoardState>({
  key: "BoardState",
  default: INITIAL_BOARD_STATE,
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
