import { Box, Typography } from "@mui/material";
import React, { FC } from "react";
import { useRecoilValue } from "recoil";
import { BLACK_IMAGE, WHITE_IMAGE } from "../../../constants/board";
import { gameStatusAtom } from "../../../recoil/gameStatusAtom";

interface StatusViewProps {}

export const StatusView: FC<StatusViewProps> = React.memo(() => {
  const { points } = useRecoilValue(gameStatusAtom);
  const { black, white } = points;
  return (
    <Box>
      <Typography variant="h3">
        黒：
        {Array.from({ length: black }).map((_, i) => (
          <img
            key={`b-count-${i}`}
            src={BLACK_IMAGE}
            alt="point of black"
            width={20}
            height={20}
          />
        ))}
      </Typography>

      <Typography variant="h3">
        白：
        {Array.from({ length: white }).map((_, i) => (
          <img
            key={`w-count-${i}`}
            src={WHITE_IMAGE}
            alt="point of white"
            width={20}
            height={20}
          />
        ))}
      </Typography>
    </Box>
  );
});
