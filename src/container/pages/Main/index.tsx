import { Grid, Typography } from "@mui/material";
import { FC } from "react";
import { StatusView } from "../../../component/view/StatusView";
import { TurnView } from "../../../component/view/TurnView";
import { Board } from "../../organisms/Board";
import { useGameDetail } from "./hooks/useGameDetail";

export const Main: FC = () => {
  const { turn, points, pass } = useGameDetail();
  return (
    <Grid container>
      <Grid xs={12} display="flex" justifyContent="center" mb={5}>
        <Typography variant="h2">オセロ</Typography>
      </Grid>
      <Grid xs={12} display="flex" justifyContent="center" mb={3}>
        <TurnView turn={turn} passCallback={pass} />
      </Grid>
      <Grid md={12} lg={8} display="flex" justifyContent="center">
        <Board />
      </Grid>
      <Grid md={12} lg={4} p={3}>
        <StatusView {...points} />
      </Grid>
    </Grid>
  );
};
