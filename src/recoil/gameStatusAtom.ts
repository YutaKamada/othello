import { atom } from "recoil";
import { BLACK } from "../constants/board";
import { StoneState } from "./boardAtom";

interface GameStatusState {
  turn: StoneState;
  winner: StoneState;
}

export const gameStatusAtom = atom<GameStatusState>({
  key: "gameStatusAtom",
  default: { turn: BLACK, winner: undefined },
});
