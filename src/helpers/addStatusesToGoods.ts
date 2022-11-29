import { STATUS } from "../types/enums"

export const addStatusesToGoods = (goods: any) => goods.map((item: any) => ({ ...item, status: STATUS.OPEN }));
