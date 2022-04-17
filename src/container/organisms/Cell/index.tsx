import { Box } from "@mui/material";
import React, { FC, useMemo } from "react";
import { useRecoilValue } from "recoil";
import { BLACK, CELL_STYLE } from "../../../constants/constants";
import {
  Coordinate,
  getStoneState,
  StoneState,
} from "../../../recoil/boardAtom";
import { getEnableCellState } from "../../../recoil/boardEnableAtom";
import { warSituationAtom } from "../../../recoil/warSituationAtom";

interface Props {
  coordinate: Coordinate;
  onClick: (() => void) | undefined;
}

export const Cell: FC<Props> = React.memo(({ coordinate, onClick }) => {
  const state = useRecoilValue(getStoneState(coordinate));
  const enableStone = useRecoilValue(getEnableCellState(coordinate));
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
      {enable ? <ShadowStone stoneState={turn} /> : null}
    </Box>
  );
});

const Stone: FC<{ stoneState: StoneState }> = ({ stoneState }) => {
  if (stoneState === undefined) {
    return null;
  }

  return (
    <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
      {stoneState === BLACK ? (
        <img
          src="/images/blackCat.png"
          alt="black stone"
          width={CELL_STYLE.width}
          height={CELL_STYLE.height}
        />
      ) : (
        <img
          src="/images/whiteCat.png"
          alt="white stone"
          width={CELL_STYLE.width}
          height={CELL_STYLE.height}
        />
      )}
    </Box>
  );
};

const ShadowStone: FC<{ stoneState: StoneState }> = ({ stoneState }) => {
  if (stoneState === undefined) {
    return null;
  }

  return (
    <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
      {stoneState === BLACK ? (
        <img
          src="/images/blackCat.png"
          alt="black stone"
          width={CELL_STYLE.width}
          height={CELL_STYLE.height}
          style={{ opacity: 0.2 }}
        />
      ) : (
        <img
          src="/images/whiteCat.png"
          alt="white stone"
          width={CELL_STYLE.width}
          height={CELL_STYLE.height}
          style={{ opacity: 0.2 }}
        />
      )}
    </Box>
  );
};
