import { useCallback, useEffect, useMemo } from "react";
import { useRecoilState } from "recoil";
import { BLACK, INITIAL_BOARD_STATE, WHITE } from "../../../../constants/board";
import { boardSelector } from "../../../../recoil/boardAtom";
import { gameStatusAtom } from "../../../../recoil/gameStatusAtom";

export const useGameCallbacks = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setBoardState] = useRecoilState(boardSelector);

  const [gameStatus, setGameStatus] = useRecoilState(gameStatusAtom);

  const { turn, canPutCounts } = gameStatus;

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
    setGameStatus((prev) => ({ ...prev, turn: BLACK }));
  }, [setGameStatus, setBoardState]);

  // NOTE: 依存するステータスを更新するために初回セットを行う
  useEffect(() => {
    setBoardState((prev) => prev);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    passCallback,
    resetCallback,
  };
};
