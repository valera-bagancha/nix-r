import { Box, Button, TextField } from '@mui/material';
import { useCallback, useState, ChangeEvent, FC } from 'react';
import { ITodo } from '../types';
import {v4 as uuidv4} from 'uuid';
import { STATUS } from '../types/enums'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 5,
  pb: 5,
};

interface IProps {
  onHideForm: () => void;
  onClick: (title: string, description: string) => void;
  defaultTitle: string;
  defaultDescription: string;
} 

export const FormModal: FC<IProps> = ({ onHideForm, onClick, defaultTitle, defaultDescription }) => {
  const [title, setTitle] = useState(defaultTitle);
  const [description, setDescription] = useState(defaultDescription);

  const onTitleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setTitle((event.target as HTMLInputElement).value)
  }, []);

  const onDescriptionChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setDescription((event.target as HTMLInputElement).value)
  }, []);

  const clickHandler = useCallback(() => 
    onClick(title, description), [title, description, onClick]);

  return (
    <div>
        <Box className='App' sx={style}>
          <TextField id="outlined-basic" label="Title" variant="outlined" sx={{ width: 275, margin: '10px' }} value={title} onChange = {onTitleChange} />
          <TextField id="outlined" label="Description" variant="outlined" sx={{ width: 275, margin: '10px' }} value={description} onChange = {onDescriptionChange} />
          <Button onClick={ clickHandler } size="large" sx={{ width: 275, margin: '10px', backgroundColor: '#EAEAEA', }}>Save</Button>
          <Button onClick={ onHideForm } size="large" sx={{ width: 275, margin: '10px', backgroundColor: '#EAEAEA', }}>Hide</Button>
        </Box>
    </div>
  );
}
