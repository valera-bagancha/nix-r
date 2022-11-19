import { Provider } from 'react-redux'

import { store } from './redux/store'
import { TodosPage } from './pages/TodosPage'

import './App.css'

const App = () => (
  <div className="App">
    <Provider store={store}>
      <TodosPage />
    </Provider>
  </div>
)

export default App
