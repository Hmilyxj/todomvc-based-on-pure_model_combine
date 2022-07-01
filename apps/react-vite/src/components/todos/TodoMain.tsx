// @ts-nocheck
import { TodosContainer } from '../../adapt-headless'
import TodoItem from './TodoItem'
import { useEffect } from 'react'

const TodoMain = TodosContainer.toWrappedComponent(({ actions, selected }) => {
    const { list, filterList } = selected
    const { toggleAll, updateTodoState } = actions
    let renderLists
    const ac = filterList.active
    
    if (ac === 'active') {
      renderLists = list.filter((item) => !item.completed)
    }
    else if (ac === 'completed') {
      renderLists = list.filter((item) => item.completed)
    }
    else {
      renderLists = list
    }
    // @ts-ignore
    const nowStatus = list.every((item) => item.completed)
    const handleChangeAll = () => toggleAll(!nowStatus)
    
    
    useEffect(() => {
      updateTodoState()
    }, [])

    return (
      <section className='main'>
        <input
          id='toggle-all'
          className='toggle-all'
          type='checkbox'
          checked={nowStatus}
          onChange={handleChangeAll}
        />
        <label htmlFor='toggle-all'>Mark all as complete</label>
        <ul className='todo-list'>
          {renderLists.map((item) => (
            <TodoItem id={item.id} key={item.id} />
          ))}
        </ul>
      </section>
    )
})

export default TodoMain