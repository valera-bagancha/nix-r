import { Box, Button, TextField } from '@mui/material'
import { ChangeEvent, Component } from 'react'

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
  onHideForm: () => void;
  onClick: (title: string, description: string) => void;
  defaultTitle: string;
  defaultDescription: string;
  // dispatchEditTodoAsync: (editableTodo: any, title: string, description: string) => void;
  // editableTodo: ITodo | null;
  // dispatchCreateTodoAsync: (title: string, description: string) => void
}

interface IState {
  title: string;
  description: string;
  scrollTop: number;
}



class FormModal extends Component<IProps, IState> {

  state = {
    title: this.props.defaultTitle,
    description: this.props.defaultDescription,
    scrollTop: 0
  };

  componentDidMount() {
    const {scrollTop} = this.state
    this.func()
    const { innerHeight } = window;
    const result = innerHeight/2 + scrollTop;  
    style.top = `${result}px`;
  }
  
  componentDidUpdate() {
    this.func()
  }

  func = () => {
    const scrollHandler = () => {
      this.setState({
        scrollTop: document.documentElement.scrollTop
      })
    }
    window.addEventListener('scroll', scrollHandler)
    return () => {
      window.removeEventListener('scroll', scrollHandler);
    } 
  }

  onTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      title:(event.target as HTMLInputElement).value
    })
  }

  onDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      description:(event.target as HTMLInputElement).value
    })
  }

  clickHandler = () => {
    const {title, description} = this.state
    const {onHideForm, onClick} = this.props
    onClick(title, description)
    onHideForm()
  }

  render() {
    const {title, description} = this.state
    const {onHideForm} = this.props 
    return (
      <div>
      <Box className="App" sx={style}>
        <TextField
          id="outlined-basic"
          label="Title"
          variant="outlined"
          sx={{ width: 275, margin: '10px' }}
          value={title}
          onChange={this.onTitleChange}
        />
        <TextField
          id="outlined"
          label="Description"
          variant="outlined"
          sx={{ width: 275, margin: '10px' }}
          value={description}
          onChange={this.onDescriptionChange}
        />
        <Button
          onClick={this.clickHandler}
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
}

// const mapStateToProps = (state: any) => ({
//   editableTodo: editableTodoSelector(state)
// })

// const mapDispatchToProps = (dispatch: any) => ({
  
// });

export default (FormModal);

