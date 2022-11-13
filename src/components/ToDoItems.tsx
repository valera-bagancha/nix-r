import {FC} from 'react'
import { BasicCard } from './ToDoCards'


interface IProps {
  goods: any;
  onEditItem: any;
}

export const ToDoItems: FC<IProps> = ({goods, onEditItem}) => {

  return(
    <div className="App">
     {goods.map((g:any) => <BasicCard key={g.id} item={g} onEditItem={onEditItem}/>)}
    </div>
  )
}