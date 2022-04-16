import { atom, selectorFamily } from "recoil";
import { BLACK, WHITE } from "../constants/constants";

export type StoneState = typeof BLACK | typeof WHITE | undefined;

export interface BoardState {
  [key: string]: { [y: number]: StoneState };
}

export const INITIAL_BOARD_STATE: BoardState = {
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
    3: WHITE,
    4: BLACK,
    5: undefined,
    6: undefined,
    7: undefined,
  },
  4: {
    0: undefined,
    1: undefined,
    2: undefined,
    3: BLACK,
    4: WHITE,
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

export const boardAtom = atom<BoardState>({
  key: "BoardState",
  default: INITIAL_BOARD_STATE,
});

export const getStoneState = selectorFamily<
  StoneState,
  { i: number; j: number }
>({
  key: "getStoneStateSelector",
  get:
    ({ i, j }) =>
    ({ get }) => {
      // 盤内
      if (0 <= i && i <= 8 && 0 <= j && j <= 8) {
        const val = get(boardAtom);
        return val[i][j];
      }
      return undefined;
    },
});
