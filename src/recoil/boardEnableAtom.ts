import { atom, selectorFamily } from "recoil";
import { Coordinate, StoneState } from "./boardAtom";

export interface BoardEnableState {
  [v: string]: { [h: number]: StoneState };
}

export const INITIAL_BOARD_ENABLE_STATE: BoardEnableState = {
  0: {
    0: undefined,
    1: undefined,
    2: undefined,
    3: undefined,
    4: undefined,
    5: undefined,
    6: undefined,
    7: undefined,
  },
  1: {
    0: undefined,
    1: undefined,
    2: undefined,
    3: undefined,
    4: undefined,
    5: undefined,
    6: undefined,
    7: undefined,
  },
  2: {
    0: undefined,
    1: undefined,
    2: undefined,
    3: undefined,
    4: undefined,
    5: undefined,
    6: undefined,
    7: undefined,
  },
  3: {
    0: undefined,
    1: undefined,
    2: undefined,
    3: undefined,
    4: undefined,
    5: undefined,
    6: undefined,
    7: undefined,
  },
  4: {
    0: undefined,
    1: undefined,
    2: undefined,
    3: undefined,
    4: undefined,
    5: undefined,
    6: undefined,
    7: undefined,
  },
  5: {
    0: undefined,
    1: undefined,
    2: undefined,
    3: undefined,
    4: undefined,
    5: undefined,
    6: undefined,
    7: undefined,
  },
  6: {
    0: undefined,
    1: undefined,
    2: undefined,
    3: undefined,
    4: undefined,
    5: undefined,
    6: undefined,
    7: undefined,
  },
  7: {
    0: undefined,
    1: undefined,
    2: undefined,
    3: undefined,
    4: undefined,
    5: undefined,
    6: undefined,
    7: undefined,
  },
};

export const boardEnableAtom = atom<BoardEnableState>({
  key: "boardEnableState",
  default: INITIAL_BOARD_ENABLE_STATE,
});

export const getEnableCellState = selectorFamily<StoneState, Coordinate>({
  key: "getEnableCellStateSelector",
  get:
    ({ v, h }) =>
    ({ get }) => {
      // 盤内
      if (0 <= v && v <= 7 && 0 <= h && h <= 7) {
        const val = get(boardEnableAtom);
        return val[v][h];
      }
      return undefined;
    },
});
