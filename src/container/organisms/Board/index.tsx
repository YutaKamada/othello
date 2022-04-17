import { Box } from "@mui/material";
import React from "react";
import { FC } from "react";
import { Cell } from "../Cell";
import { useCellCallbacks } from "./hooks/useCellCallbacks";

const BOARD_LENGTH = Array.from({ length: 8 });

const Board: FC = () => {
  const { clickCallbackFactory } = useCellCallbacks();
  return (
    <Box>
      {BOARD_LENGTH.map((_, v) => (
        <Box key={`c-ver-${v}`} display="flex">
          {BOARD_LENGTH.map((_, h) => (
            <Box key={`c-hol-${h}`}>
              <Cell
                coordinate={{ v, h }}
                onClick={clickCallbackFactory({ v, h })}
              />
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
};

const MemorizedBoard = React.memo(Board);

export { MemorizedBoard as Board };
