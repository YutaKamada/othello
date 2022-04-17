import { atom, selectorFamily } from "recoil";
import { INITIAL_BOARD_ENABLE_STATE } from "../constants/board";
import { BoardState, Coordinate, StoneState } from "./boardAtom";

export type BoardEnableState = BoardState;

export const boardEnableAtom = atom<BoardEnableState>({
  key: "boardEnableState",
  default: INITIAL_BOARD_ENABLE_STATE,
});

/**
 * 盤上の座標からセルの配置できる石の状態を取得する
 */
export const enableCellSelector = selectorFamily<StoneState, Coordinate>({
  key: "enableCellSelector",
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
