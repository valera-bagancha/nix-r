
import { useCallback, FC, useState, useEffect } from 'react'
import { Card, CardActions, CardContent, Button, Typography } from '@mui/material';
import { STATUS } from '../types/enums'
////////////////////////
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useDispatch } from 'react-redux';
import { deleteTodo, setEditableTodo, updateTodo } from '../redux/todos/actions';
import { ITodo } from '../types';
import { statusBgs } from '../constants/statusBgs';
//////////////////////////////

interface IProps {
  todo: ITodo;
  showForm: () => void;
}

export const TodoCard: FC<IProps> = ({todo, showForm}) => {
  const { id, title, description, status } = todo;
  const [selectedStatus, setSelectedStatus] = useState<STATUS>(status);

  const dispatch = useDispatch();  

  const onEditTodo = useCallback(() => {
    dispatch(setEditableTodo(todo));
    
    showForm();
  }, [dispatch, todo, showForm]);

  const onDeleteTodo = useCallback(() => 
    dispatch(deleteTodo(id)), [dispatch, id]);

  const onChange = useCallback((event: any) => {
    setSelectedStatus(event.target.value)
  }, [])

  useEffect(() => {
    if(status === selectedStatus) return;

    const updatedTodo = {...todo, status: selectedStatus};

    dispatch(updateTodo(updatedTodo))
  }, [dispatch, selectedStatus, todo, status])

  return (
    <Card className='body-card' sx={{ width: 275, margin: '10px', backgroundColor: statusBgs[status] }}>
      <Box sx={{ width: 128 }} className='status'>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Status</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={status}
            label="Status"
            onChange={onChange}
          >
            <MenuItem value={STATUS.OPEN}>{STATUS.OPEN}</MenuItem>
            <MenuItem value={STATUS.IN_PROGRESS}>{STATUS.IN_PROGRESS}</MenuItem>
            <MenuItem value={STATUS.DONE}>{STATUS.DONE}</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <CardContent>
        <Typography sx={{ fontSize: 15 }}>
          {title}
        </Typography>
        <Typography variant="body2" color="gray">
        {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={onEditTodo}>Edit</Button>
        <Button size="small" onClick={onDeleteTodo}>Remove</Button>
      </CardActions>
    </Card>
  );
}
