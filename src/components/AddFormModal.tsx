import * as React from 'react';
import { Box, Button, TextField } from '@mui/material';
import { useCallback, useState } from 'react'


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

export const AddFormModal = ({ onAddItem = () => {}, onHideForm  = () => {}, onEditItem = () => {}, item}:any) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  React.useEffect(() => {
    setTitle(item?.title);
    setDescription(item?.description);
  }, [item])

  const onTitleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle((event.target as HTMLInputElement).value)
  }, []);

  const onDescriptionChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription((event.target as HTMLInputElement).value)
  }, []);

  const ClickHandler = useCallback(() => {
    if (item?.id) {
      onEditItem({ ...item, title, description })
    } else {
      onAddItem({ title, description })
    }
  },[title, description, onAddItem, onEditItem, item ]);

  return (
    <div>
        <Box className='App' sx={style}>
          <TextField id="outlined-basic" label="Title" variant="outlined" sx={{ width: 275, margin: '10px' }} value={title} onChange = {onTitleChange} />
          <TextField id="outlined-basic" label="Description" variant="outlined" sx={{ width: 275, margin: '10px' }} value={description} onChange = {onDescriptionChange} />
          <Button onClick={ ClickHandler } size="large" sx={{ width: 275, margin: '10px', backgroundColor: '#EAEAEA', }}>Save</Button>
          <Button onClick={ onHideForm } size="large" sx={{ width: 275, margin: '10px', backgroundColor: '#EAEAEA', }}>Hide</Button>
        </Box>
    </div>
  );
}
