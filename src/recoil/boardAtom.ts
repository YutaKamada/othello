import { atom, selectorFamily } from "recoil";

export type StoneState = "Black" | "White" | null;

export interface BoardState {
  [key: string]: { [y: number]: StoneState };
}

const INITIAL_BOARD_STATE: BoardState = {
  0: { 0: null, 1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null },
  1: { 0: null, 1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null },
  2: { 0: null, 1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null },
  3: {
    0: null,
    1: null,
    2: null,
    3: "White",
    4: "Black",
    5: null,
    6: null,
    7: null,
  },
  4: {
    0: null,
    1: null,
    2: null,
    3: "Black",
    4: "White",
    5: null,
    6: null,
    7: null,
  },
  5: { 0: null, 1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null },
  6: { 0: null, 1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null },
  7: { 0: null, 1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null },
};

export const boardAtom = atom({
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
      const val = get(boardAtom);
      return val[i][j];
    },
});
