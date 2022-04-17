import { Box } from "@mui/material";
import React, { FC, useMemo } from "react";
import { useRecoilValue } from "recoil";
import {
  BLACK,
  BLACK_IMAGE,
  CELL_STYLE,
  WHITE_IMAGE,
} from "../../../constants/board";
import {
  Coordinate,
  getCellStoneSelector,
  StoneState,
} from "../../../recoil/boardAtom";
import { getCellEnableSelector } from "../../../recoil/boardEnableAtom";
import { warSituationAtom } from "../../../recoil/warSituationAtom";

interface Props {
  coordinate: Coordinate;
  onClick: (() => void) | undefined;
}

export const Cell: FC<Props> = React.memo(({ coordinate, onClick }) => {
  const state = useRecoilValue(getCellStoneSelector(coordinate));
  const enableStone = useRecoilValue(getCellEnableSelector(coordinate));
  const { turn } = useRecoilValue(warSituationAtom);
  const enable = useMemo(
    () => enableStone !== undefined && enableStone === turn,
    [turn, enableStone]
  );

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      width={CELL_STYLE.width}
      height={CELL_STYLE.height}
      border="solid 1px"
      onClick={enable ? onClick : undefined}
      style={{ cursor: !state && enable ? "pointer" : "default" }}
    >
      <Stone stoneState={state} />
      {enable ? <Stone stoneState={turn} opacity={0.2} /> : null}
    </Box>
  );
});

const Stone: FC<{ stoneState: StoneState; opacity?: number }> = ({
  stoneState,
  opacity,
}) => {
  if (stoneState === undefined) {
    return null;
  }

  return (
    <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
      {stoneState === BLACK ? (
        <img
          src={BLACK_IMAGE}
          alt="black stone"
          width={CELL_STYLE.width}
          height={CELL_STYLE.height}
          style={{ opacity }}
        />
      ) : (
        <img
          src={WHITE_IMAGE}
          alt="white stone"
          width={CELL_STYLE.width}
          height={CELL_STYLE.height}
          style={{ opacity }}
        />
      )}
    </Box>
  );
};
