import { atom } from "recoil";
import { BLACK } from "../constants/constants";
import { StoneState } from "./boardAtom";

interface WarSituationState {
  turn: StoneState;
  winner: StoneState;
}

export const warSituationAtom = atom<WarSituationState>({
  key: "warSituationState",
  default: { turn: BLACK, winner: undefined },
});
