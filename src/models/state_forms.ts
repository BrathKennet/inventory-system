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

export type FormPersonState =
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

export type FormSaleState =
  | {
      errors?: {
        clientId?: string[];
        saleDate?: string[];
      };
      errorsSelect?: {
        [key: number]: {
          lotId?: string[];
          quantityId?: string[];
        };
      };
      message?: string | null;
    }
  | undefined;
