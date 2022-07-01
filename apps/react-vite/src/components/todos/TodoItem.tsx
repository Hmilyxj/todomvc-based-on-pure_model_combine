import classNames from 'classnames'
import { useState, useRef, useEffect } from 'react'
import { TodoContainer } from '../../adapt-headless'


const TodoItem = TodoContainer.toWrappedComponent(({ actions, selected }) => {
  const { todo } = selected
  if (!todo) {
    return null
  }
  const { remove, toggle, edit} = actions

  const inputRef = useRef(null)
  const [currentId, setCurrentId] = useState(0)
  const [currentName, setCurrentName] = useState('')
  const handleDel = (id: any) => remove(id)
  const handleChange = (id: any) => toggle(id)
  const handleDblClick = (id: any, content: string) => {
    setCurrentId(id)
    setCurrentName(content)
  }
  const handleBlur = () => setCurrentId(0)
  // 先把输入的数据挤下来，敲回车的时候再更新到 Redux
  const handleEditChange = (e: { target: { value: string } }) => setCurrentName(e.target.value)
  const handleKeyUp = (e: { key: string }) => {
    if (e.key === 'Escape') return handleDblClick('', '')
    if (e.key === 'Enter') {
      edit(todo.id, currentName )
      handleDblClick('', '')
    }
  }
  // @ts-ignore
  useEffect(() => inputRef.current.focus(), [currentId])

  return (
    <li
      className={classNames({
        completed: todo.completed,
        editing: currentId == todo.id,
      })}
    >
      <div className='view'>
        <input
          className='toggle'
          type='checkbox'
          checked={todo.completed}
          onChange={() => handleChange(todo.id)}
        />
        <label onDoubleClick={() => handleDblClick(todo.id, todo.content)}>
          {todo.content}
        </label>
        <button className='destroy' onClick={() => handleDel(todo.id)}></button>
      </div>
      <input
        className='edit'
        value={currentName}
        onChange={handleEditChange}
        ref={inputRef}
        onBlur={handleBlur}
        onKeyUp={handleKeyUp}
      />
    </li>
  )
})

export default TodoItem
