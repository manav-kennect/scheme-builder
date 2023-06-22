import { InjectionKey } from "vue";

export type snackBarOptions = {
  snackbarTime?: number;
  snackbarType: "success" | "warning" | "info" | "error";
  snackbarText: string;
};

export const snackbar = Symbol() as InjectionKey<(options: snackBarOptions) => void>;
