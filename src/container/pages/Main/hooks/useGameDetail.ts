import { useMemo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { BLACK, BOTH, WHITE } from "../../../../constants/board";
import { boardSelector, KindOfStone } from "../../../../recoil/boardAtom";
import {
  boardEnableAtom,
  EnableStoneState,
} from "../../../../recoil/boardEnableAtom";
import { gameStatusAtom } from "../../../../recoil/gameStatusAtom";

export const useGameDetail = () => {
  const [gameStatus, setGameStatus] = useRecoilState(gameStatusAtom);

  const { turn, winner } = gameStatus;
  const boardState = useRecoilValue(boardSelector);
  const boardEnableState = useRecoilValue(boardEnableAtom);

  const points = useMemo(() => {
    const stones: KindOfStone[] = Object.entries(boardState)
      .map(([_, row]) =>
        Object.entries(row).map(([_, stone]) => stone as KindOfStone)
      )
      .flat();

    return {
      black: stones.filter((s) => s === BLACK).length,
      white: stones.filter((s) => s === WHITE).length,
    };
  }, [boardState]);

  const enableCounts = useMemo(() => {
    const stones: EnableStoneState[] = Object.entries(boardEnableState)
      .map(([_, row]) =>
        Object.entries(row).map(([_, stone]) => stone as EnableStoneState)
      )
      .flat();

    return {
      black: stones.filter((s) => s === BLACK || s === BOTH).length,
      white: stones.filter((s) => s === WHITE || s === BOTH).length,
    };
  }, [boardEnableState]);

  const passCallback = useMemo(() => {
    const disablePutBlack = enableCounts.black === 0;
    const disablePutWhite = enableCounts.white === 0;

    if (
      (turn === BLACK && disablePutBlack) ||
      (turn === WHITE && disablePutWhite)
    ) {
      return () => {
        setGameStatus({
          ...gameStatus,
          turn: gameStatus.turn === BLACK ? WHITE : BLACK,
        });
      };
    }
  }, [enableCounts.black, enableCounts.white, setGameStatus, turn, gameStatus]);

  return {
    turn,
    winner,
    points,
    enableCounts,
    passCallback,
  };
};
