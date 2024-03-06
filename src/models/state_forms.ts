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

export type FormProductState =
  | {
      errors?: {
        categoryId?: string[];
        name?: string[];
        description?: string[];
      };
      message?: string | null;
    }
  | undefined;

export type FormLotState =
  | {
      errors?: {
        productId?: string[];
        supplierId?: string[];
        purchaseQuantity?: string[];
        stock?: string[];
        purchasePriceUnit?: string[];
        salePriceUnit?: string[];
        purchaseDate?: string[];
        expirationDate?: string[];
      };
      message?: string | null;
    }
  | undefined;
