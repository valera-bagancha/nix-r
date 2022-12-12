import { ITodo } from "../types";
import { STATUS } from "../types/enums"

export const addStatusesToGoods = (goods: ITodo[]) => goods.map((item: ITodo) => ({ ...item, status: STATUS.OPEN }));
