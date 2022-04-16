import { atom, AtomEffect, atomFamily, selectorFamily } from "recoil";
import { BoardState } from "./boardAtom";

export interface BoardEnableState {
  [key: string]: { [y: number]: boolean };
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

const changeBoardStateEffect =
  (boardState: BoardState): AtomEffect<BoardEnableState> =>
  ({ onSet }) => {
    onSet(() => {
      // TODO: ここで変更処理
      const length = Array.from({ length: 8 });
      console.log("ugoita");
      return Object.assign(
        {},
        length.map((_, i) => Object.assign(length.map((_, j) => true)))
      );
    });
  };

export const boardEnableAtom = atom<BoardEnableState>({
  key: "boardEnableState",
  default: INITIAL_BOARD_ENABLE_STATE,
});

export const getEnableCellState = selectorFamily<
  boolean,
  { i: number; j: number }
>({
  key: "getEnableCellStateSelector",
  get:
    ({ i, j }) =>
    ({ get }) => {
      // 盤内
      if (0 <= i && i <= 8 && 0 <= j && j <= 8) {
        const val = get(boardEnableAtom);
        return val[i][j];
      }
      return false;
    },
});
