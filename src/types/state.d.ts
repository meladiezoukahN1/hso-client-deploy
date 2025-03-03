declare module "state" {
  export interface State {
    isLoading: boolean;
    error: string | null;
  }

  export interface Select {
    label: string;
    value: string;
  }
}
