import { BoardState } from "../recoil/boardAtom";
import { CanPutBoardState } from "../recoil/canPutBoardAtom";

export const BLACK = "black" as const;
export const WHITE = "white" as const;
export const BOTH = "both" as const;

export const BLACK_IMAGE = "/images/blackCat.png";
export const WHITE_IMAGE = "/images/whiteCat.png";

export const CELL_STYLE = {
  height: 100,
  width: 100,
  color: "#123456",
};

export const INITIAL_POINTS = {
  black: 2,
  white: 2,
};

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

export const INITIAL_CAN_PUT_BOARD_STATE: CanPutBoardState = {
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
