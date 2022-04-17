import { Box, Typography } from "@mui/material";
import { FC } from "react";
import { BLACK_IMAGE, WHITE_IMAGE } from "../../../constants/board";

interface StatusViewProps {
  black: number;
  white: number;
}

export const StatusView: FC<StatusViewProps> = ({ black, white }) => {
  return (
    <Box>
      <Typography variant="h3">
        黒：
        {Array.from({ length: black }).map((_) => (
          <img
            src={BLACK_IMAGE}
            alt="point of black cat"
            width={20}
            height={20}
          />
        ))}
      </Typography>

      <Typography variant="h3">
        白：
        {Array.from({ length: white }).map((_) => (
          <img
            src={WHITE_IMAGE}
            alt="point of white cat"
            width={20}
            height={20}
          />
        ))}
      </Typography>
    </Box>
  );
};
