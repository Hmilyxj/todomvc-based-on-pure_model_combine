import '../../styles/base.css'
import '../../styles/index.css'
import { TodosContainer } from '../adapt-headless'
import { Todos } from './todos'

export default function App() {
  return (
    <TodosContainer.Provider>
      <Todos />
    </TodosContainer.Provider>
  )
}
