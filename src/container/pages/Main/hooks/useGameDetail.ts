import { useMemo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { BLACK, BOTH, WHITE } from "../../../../constants/board";
import { boardSelector, KindOfStone } from "../../../../recoil/boardAtom";
import {
  canPutBoardAtom,
  CanPutStoneState,
} from "../../../../recoil/canPutBoardAtom";
import { gameStatusAtom } from "../../../../recoil/gameStatusAtom";

export const useGameDetail = () => {
  const [gameStatus, setGameStatus] = useRecoilState(gameStatusAtom);

  const { turn, winner } = gameStatus;
  const boardState = useRecoilValue(boardSelector);
  const canPutBoardState = useRecoilValue(canPutBoardAtom);

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

  const canPutCounts = useMemo(() => {
    const canPutCellStates: CanPutStoneState[] = Object.entries(
      canPutBoardState
    )
      .map(([_, row]) =>
        Object.entries(row).map(([_, stone]) => stone as CanPutStoneState)
      )
      .flat();

    return {
      black: canPutCellStates.filter((s) => s === BLACK || s === BOTH).length,
      white: canPutCellStates.filter((s) => s === WHITE || s === BOTH).length,
    };
  }, [canPutBoardState]);

  const passCallback = useMemo(() => {
    if (
      (turn === BLACK && canPutCounts.black === 0) ||
      (turn === WHITE && canPutCounts.white === 0)
    ) {
      return () => {
        setGameStatus({
          ...gameStatus,
          turn: gameStatus.turn === BLACK ? WHITE : BLACK,
        });
      };
    }
  }, [canPutCounts.black, canPutCounts.white, setGameStatus, turn, gameStatus]);

  return {
    turn,
    winner,
    points,
    canPutCounts,
    passCallback,
  };
};
