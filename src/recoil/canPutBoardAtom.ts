import { atom, selectorFamily } from "recoil";
import { BOTH, INITIAL_CAN_PUT_BOARD_STATE } from "../constants/board";
import { Coordinate, StoneState } from "./boardAtom";

export type CanPutStoneState = StoneState | typeof BOTH;

export interface CanPutBoardState {
  [v: number]: { [h: number]: CanPutStoneState };
}

export const canPutBoardAtom = atom<CanPutBoardState>({
  key: "canPutBoardAtom",
  default: INITIAL_CAN_PUT_BOARD_STATE,
});

/**
 * 盤上の座標からセルの配置できる石の状態を取得する
 */
export const canPutCellSelector = selectorFamily<CanPutStoneState, Coordinate>({
  key: "canPutCellSelector",
  get:
    ({ v, h }) =>
    ({ get }) => {
      // 盤内
      if (0 <= v && v <= 7 && 0 <= h && h <= 7) {
        const val = get(canPutBoardAtom);
        return val[v][h];
      }
      return undefined;
    },
});
