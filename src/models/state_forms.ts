export type FormAuthState =
  | {
      errors?: {
        email?: string[];
        password?: string[];
      };
      message?: string | null;
    }
  | undefined;

export type FormCategoryState =
  | {
      errors?: {
        nameCategory?: string[];
      };
      message?: string | null;
    }
  | undefined;

  export type FormDeleteState =
    | {
        message?: string | null;
      }
    | undefined;
