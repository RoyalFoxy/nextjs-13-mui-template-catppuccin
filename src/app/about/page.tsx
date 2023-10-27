"use client";

import { Button } from "@mui/material";
import { useSnackbar } from "notistack";

export default function Page() {
  const { enqueueSnackbar } = useSnackbar();

  return (
    <>
      <Button
        onClick={() => {
          enqueueSnackbar("Success Snack :3", { variant: "success" });
        }}
      >
        Success
      </Button>
      <Button
        onClick={() => {
          enqueueSnackbar("Warning Snack :3", { variant: "warning" });
        }}
      >
        Warning
      </Button>
      <Button
        onClick={() => {
          enqueueSnackbar("Error Snack :3", { variant: "error" });
        }}
      >
        Error
      </Button>
      <Button
        onClick={() => {
          enqueueSnackbar("InfoSnack :3", { variant: "info" });
        }}
      >
        Info
      </Button>
    </>
  );
}
