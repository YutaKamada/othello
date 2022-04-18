import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { FC, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { BLACK, DRAW } from "../../../constants/board";
import { gameStatusAtom } from "../../../recoil/gameStatusAtom";

interface ResultDialogProps {
  resetCallback: () => void;
}

export const ResultDialog: FC<ResultDialogProps> = React.memo(
  ({ resetCallback }) => {
    const [open, setOpen] = useState(false);
    const { gameResult, points } = useRecoilValue(gameStatusAtom);

    useEffect(() => {
      if (gameResult !== undefined) {
        setOpen(true);
      } else {
        setOpen(false);
      }
    }, [gameResult]);

    return (
      <Dialog open={open} maxWidth="sm">
        <DialogTitle>対戦結果</DialogTitle>

        <DialogContent>
          <Box> 黒：{points.black} ポイント</Box>
          <Box> 白：{points.white} ポイント</Box>
          {gameResult?.winner === DRAW ? (
            "引き分けです！"
          ) : (
            <>{gameResult?.winner === BLACK ? "黒" : "白"} の勝ちです！</>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={resetCallback}>リスタート</Button>
        </DialogActions>
      </Dialog>
    );
  }
);
