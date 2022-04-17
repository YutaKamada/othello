import { useMemo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { BLACK, WHITE } from "../../../../constants/board";
import { boardAtom, KindOfStone } from "../../../../recoil/boardAtom";
import { boardEnableAtom } from "../../../../recoil/boardEnableAtom";
import { warSituationAtom } from "../../../../recoil/warSituationAtom";

export const useWarStatus = () => {
  const [warSituation, setWarSituation] = useRecoilState(warSituationAtom);

  const { turn, winner } = warSituation;
  const boardState = useRecoilValue(boardAtom);
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
    const stones: KindOfStone[] = Object.entries(boardEnableState)
      .map(([_, row]) =>
        Object.entries(row).map(([_, stone]) => stone as KindOfStone)
      )
      .flat();

    return {
      black: stones.filter((s) => s === BLACK).length,
      white: stones.filter((s) => s === WHITE).length,
    };
  }, [boardEnableState]);

  const pass = useMemo(() => {
    const hasNoNextClickBlack = turn === BLACK && enableCounts.black === 0;
    const hasNoNextClickWhite = turn === WHITE && enableCounts.white === 0;

    if (hasNoNextClickBlack || hasNoNextClickWhite) {
      return () => {
        setWarSituation({
          ...warSituation,
          turn: warSituation.turn === BLACK ? WHITE : BLACK,
        });
      };
    }
  }, [
    enableCounts.black,
    enableCounts.white,
    setWarSituation,
    turn,
    warSituation,
  ]);

  return {
    turn,
    winner,
    points,
    enableCounts,
    pass,
  };
};
