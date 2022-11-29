import { Box, Button, TextField } from '@mui/material'
import { useCallback, useState, ChangeEvent, FC, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { createTodoAsync, editTodoAsync } from '../redux/todos/actions'
import { editableTodoSelector } from '../redux/todos/todoSelectors'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 5,
  pb: 5,
}

interface IProps {
  onHideForm: () => void
  onClick: (title: string, description: string) => void
  defaultTitle: string
  defaultDescription: string
}

export const FormModal: FC<IProps> = ({
  onHideForm,
  onClick,
  defaultTitle,
  defaultDescription,
}) => {
  const [title, setTitle] = useState(defaultTitle)
  const [description, setDescription] = useState(defaultDescription)
  const [scrollTop, setScrollTop] = useState(0)

  const dispatch = useAppDispatch()

  const editableTodo = useSelector(editableTodoSelector);

  useEffect(() => {
    const scrollHandler = () => {
      setScrollTop(document.documentElement.scrollTop)
    }
    window.addEventListener('scroll', scrollHandler)
    return () => {
      window.removeEventListener('scroll', scrollHandler);
    }
  }, [])

  const { innerHeight } = window;
  const result = innerHeight/2 + scrollTop;  
  style.top = `${result}px`;

  const onTitleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
    setTitle((event.target as HTMLInputElement).value)
  }, [])

  const onDescriptionChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setDescription((event.target as HTMLInputElement).value)
    }, [])

  const clickHandler = useCallback(() => {
    if (editableTodo) {
      dispatch(editTodoAsync(editableTodo.id, title, description))
    } else {
      dispatch(createTodoAsync(title, description))
    }
    onHideForm()
  }, [title, description, onClick, editableTodo])


  return (
    <div>
      <Box className="App" sx={style}>
        <TextField
          id="outlined-basic"
          label="Title"
          variant="outlined"
          sx={{ width: 275, margin: '10px' }}
          value={title}
          onChange={onTitleChange}
        />
        <TextField
          id="outlined"
          label="Description"
          variant="outlined"
          sx={{ width: 275, margin: '10px' }}
          value={description}
          onChange={onDescriptionChange}
        />
        <Button

          onClick={clickHandler}
          size="large"
          sx={{ width: 275, margin: '10px', backgroundColor: '#EAEAEA' }}
        >
          Save
        </Button>
        <Button
          onClick={onHideForm}
          size="large"
          sx={{ width: 275, margin: '10px', backgroundColor: '#EAEAEA' }}
        >
          Hide
        </Button>
      </Box>
    </div>
  )
}
