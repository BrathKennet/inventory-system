import { TypeTransaction } from "@/models/enum_models";

export const getIdTransaction = (v: TypeTransaction) => {
  switch (v) {
    case TypeTransaction.ADD:
      return 1;
    case TypeTransaction.SOLD:
      return 2;
    case TypeTransaction.REMOVE:
      return 3;
    default:
      return 0;
  }
};

export const getNameTransaction = (v: number) => {
  switch (v) {
    case 1:
      return TypeTransaction[TypeTransaction.ADD];
    case 2:
      return TypeTransaction[TypeTransaction.SOLD];
    case 3:
      return TypeTransaction[TypeTransaction.REMOVE];
    default:
      return "";
  }
};
