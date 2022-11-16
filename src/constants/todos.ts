import {v4 as uuidv4} from 'uuid';
import { STATUS } from '../types/enums';


export const InitialToDoItem = [
  {
    id: uuidv4(),
    title:'Shopping',
    description:'until 11pm',
    status: STATUS.OPEN,
    creationDate: +(new Date()),
    updateDate: +(new Date()),
  },
  {
    id: uuidv4(),
    title:'Make same pictures',
    description:'until 9pm',
    status: STATUS.IN_PROGRESS,
    creationDate: +(new Date()),
    updateDate: +(new Date()),
  },{
    id: uuidv4(),
    title:'Do homework',
    description:'until 7pm',
    status: STATUS.DONE,
    creationDate: +(new Date()),
    updateDate: +(new Date()),
  }
];