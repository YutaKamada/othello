import { atom } from "recoil";
import { BLACK, INITIAL_POINTS } from "../constants/board";
import { KindOfStone, StoneState } from "./boardAtom";

interface GameStatusState {
  turn: StoneState;
  gameResult?: {
    winner: KindOfStone;
  };
  points: {
    black: number;
    white: number;
  };
}

export const gameStatusAtom = atom<GameStatusState>({
  key: "gameStatusAtom",
  default: { turn: BLACK, points: INITIAL_POINTS },
});
