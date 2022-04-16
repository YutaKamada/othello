import { Box } from "@mui/material";
import { FC } from "react";
import { Cell } from "../Cell";
import { useCellCallbacks } from "./hooks/useCellCallbacks";

const LENGTH = Array.from({ length: 8 });

export const Board: FC = () => {
  const { clickCallbackFactory } = useCellCallbacks();
  return (
    <>
      {LENGTH.map((_, v) => (
        <Box key={`c-ver-${v}`} display="flex">
          {LENGTH.map((_, h) => (
            <Box key={`c-hol-${h}`}>
              <Cell
                coordinate={{ v, h }}
                onClick={clickCallbackFactory(v, h)}
              />
            </Box>
          ))}
        </Box>
      ))}
    </>
  );
};
