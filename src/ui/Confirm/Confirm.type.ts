import { Dispatch } from "react";

export type ConfirmProps = {
  buttonText?: string;
  message: string;
  title?: string;
  type?: "success" | "warning" | "danger" | "primary";
  onConfirm: () => void;
  loading: boolean;
  open: boolean;
  setOpen: Dispatch<boolean>;
};
