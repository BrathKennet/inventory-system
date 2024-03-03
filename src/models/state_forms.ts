export type FormAuthState =
  | {
      errors?: {
        email?: string[];
        password?: string[];
      };
      message?: string | null;
    }
  | undefined;

export type FormDeleteState =
  | {
      message?: string | null;
    }
  | undefined;

export type FormCategoryState =
  | {
      errors?: {
        name?: string[];
      };
      message?: string | null;
    }
  | undefined;

export type FormSupplierState =
  | {
      errors?: {
        name?: string[];
        address?: string[];
        phone?: string[];
        email?: string[];
      };
      message?: string | null;
    }
  | undefined;
