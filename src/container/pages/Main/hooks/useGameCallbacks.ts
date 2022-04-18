import { useCallback, useMemo } from "react";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import {
  BLACK,
  BOTH,
  INITIAL_BOARD_STATE,
  WHITE,
} from "../../../../constants/board";
import { boardSelector } from "../../../../recoil/boardAtom";
import {
  canPutBoardAtom,
  CanPutStoneState,
} from "../../../../recoil/canPutBoardAtom";
import { gameStatusAtom } from "../../../../recoil/gameStatusAtom";

export const useGameCallbacks = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setBoardState] = useRecoilState(boardSelector);

  const [gameStatus, setGameStatus] = useRecoilState(gameStatusAtom);
  const resetGameStatus = useResetRecoilState(gameStatusAtom);

  const { turn } = gameStatus;
  const canPutBoardState = useRecoilValue(canPutBoardAtom);

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

  const resetCallback = useCallback(() => {
    setBoardState(INITIAL_BOARD_STATE);
    resetGameStatus();
  }, [resetGameStatus, setBoardState]);

  return {
    passCallback,
    resetCallback,
  };
};
