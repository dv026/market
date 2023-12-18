export type Nullable<T> = T | null | undefined;

export enum CreateItemSteps {
  CHOOSE_TYPE = 'choose_type',
  MAIN_FORM = 'main_form'
}

export enum ItemTypes {
  CAR = 'car',
  APPARTMENT = 'appartment'
}

export const ItemTypeNames: Record<string, string> = {
  [ItemTypes.CAR]: 'Машина',
  [ItemTypes.APPARTMENT]: 'Квартира'
};

export interface IOption {
  label: string;
  value: string | number;
  object?: unknown;
}

export enum PurchaseStatuses {
  Future = 'future',
  Canceled = 'canceled',
  DepositPaid = 'depositPaid',
  Paid = 'paid',
  UnderCourtConsidiration = 'underCourtConsideration',
  Saling = 'saling',
  Completed = 'completed'
}

export const PurchaseStatusNames: Record<string, { title: string; color: string }> = {
  [PurchaseStatuses.Future]: {
    title: 'будущий',
    color: 'rgba(0, 0, 0, 0.25)'
  },
  [PurchaseStatuses.DepositPaid]: {
    title: 'внесен депозит',
    color: 'magenta'
  },
  [PurchaseStatuses.Paid]: {
    title: 'оплачен',
    color: 'blue'
  },
  [PurchaseStatuses.UnderCourtConsidiration]: {
    title: 'в суде',
    color: 'orange'
  },
  [PurchaseStatuses.Saling]: {
    title: 'в продаже',
    color: 'cyan'
  },
  [PurchaseStatuses.Completed]: {
    title: 'завершен',
    color: 'green'
  },
  [PurchaseStatuses.Canceled]: {
    title: 'отменен',
    color: 'volcano'
  }
};

export enum PurchaseTypes {
  Commission = 'commission',
  Auction = 'auction'
}

export const PurchaseTypeNames: Record<string, string> = {
  [PurchaseTypes.Auction]: 'аукцион',
  [PurchaseTypes.Commission]: 'комиссия'
};

export const getPurchaseTypeNameOptions = () => {
  return Object.entries(PurchaseTypeNames).map(([key, value]) => ({
    label: value,
    value: key
  }));
};

export const getItemTypeNameOptions = () => {
  return Object.entries(ItemTypeNames).map(([key, value]) => ({
    value: key,
    label: value
  }));
};
