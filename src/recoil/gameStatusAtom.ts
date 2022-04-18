import { atom } from "recoil";
import { BLACK, DRAW, INITIAL_POINTS } from "../constants/board";
import { KindOfStone, StoneState } from "./boardAtom";

export interface GameStatusState {
  turn: StoneState;
  gameResult?: {
    winner: KindOfStone | typeof DRAW;
  };
  points: {
    black: number;
    white: number;
  };
  canPutCounts: {
    black: number;
    white: number;
  };
}

export const gameStatusAtom = atom<GameStatusState>({
  key: "gameStatusAtom",
  default: {
    turn: BLACK,
    points: INITIAL_POINTS,
    canPutCounts: { black: 0, white: 0 },
  },
});
