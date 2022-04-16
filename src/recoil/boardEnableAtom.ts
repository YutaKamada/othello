import { atom, selectorFamily } from "recoil";
import { Coordinate } from "./boardAtom";

export interface BoardEnableState {
  [v: string]: { [h: number]: boolean };
}

const INITIAL_BOARD_ENABLE_STATE: BoardEnableState = {
  0: {
    0: true,
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
    6: true,
    7: true,
  },
  1: {
    0: true,
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
    6: true,
    7: true,
  },
  2: {
    0: true,
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
    6: true,
    7: true,
  },
  3: {
    0: true,
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
    6: true,
    7: true,
  },
  4: {
    0: true,
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
    6: true,
    7: true,
  },
  5: {
    0: true,
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
    6: true,
    7: true,
  },
  6: {
    0: true,
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
    6: true,
    7: true,
  },
  7: {
    0: true,
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
    6: true,
    7: true,
  },
};

export const boardEnableAtom = atom<BoardEnableState>({
  key: "boardEnableState",
  default: INITIAL_BOARD_ENABLE_STATE,
});

export const getEnableCellState = selectorFamily<boolean, Coordinate>({
  key: "getEnableCellStateSelector",
  get:
    ({ v, h }) =>
    ({ get }) => {
      // 盤内
      if (0 <= v && v <= 7 && 0 <= h && h <= 7) {
        const val = get(boardEnableAtom);
        return val[v][h];
      }
      return false;
    },
});
