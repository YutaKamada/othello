import _ from "lodash";
import { useCallback, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { BLACK, WHITE } from "../../../../constants/board";
import { boardSelector, Coordinate } from "../../../../recoil/boardAtom";
import { boardEnableAtom } from "../../../../recoil/boardEnableAtom";
import { gameStatusAtom } from "../../../../recoil/gameStatusAtom";
import { turnOverStones } from "../../../utils/logic";

export const useCellCallbacks = () => {
  const [boardState, setBoardState] = useRecoilState(boardSelector);
  const boardEnableState = useRecoilValue(boardEnableAtom);

  const [gameStatus, setGameStatus] = useRecoilState(gameStatusAtom);

  const clickCallbackFactory = useCallback(
    (coordinate: Coordinate) => {
      const { v, h } = coordinate;
      const isEnable = boardEnableState[v][h];
      const turn = gameStatus.turn;

      if (!isEnable || turn === undefined) return undefined;
      return () => {
        const changedBoardState = _.cloneDeep(boardState);

        // 追加の石を配置
        changedBoardState[v][h] = turn;
        const turnOveredBoardState = turnOverStones({
          boardState: changedBoardState,
          coordinate: { v, h },
          turn,
        });
        setBoardState(turnOveredBoardState);

        // 白黒変更
        setGameStatus((prev) => ({
          ...prev,
          turn: prev.turn === BLACK ? WHITE : BLACK,
        }));
      };
    },
    [boardState, gameStatus, boardEnableState, setBoardState, setGameStatus]
  );

  // NOTE: EnableStateを更新するために初回セットを行う
  useEffect(() => {
    setBoardState((prev) => prev);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { clickCallbackFactory };
};
