import { SetStateAction, useState } from 'react'
import { HeaderContainer } from '../../adapt-headless'
// @ts-ignore
const TodoHeader = HeaderContainer.toWrappedComponent(({actions, selected}) => {
    const { toggleAll, addTodo } = actions
    const { todos } = selected

    const [name, setName] = useState('')
    const handleChange = (e: { target: { value: SetStateAction<string> } }) => setName(e.target.value)
    const handleKeyUp = (e: { key: string }) => {
        if (e.key === 'Enter') {
        if (name.trim().length === 0) return
        addTodo(name)
        setName('')
        }
    }
    return (
        <header className='header'>
        <h1>todos</h1>
        <input
            className='new-todo'
            placeholder='What needs to be done?'
            autoFocus
            value={name}
            onChange={handleChange}
            onKeyUp={handleKeyUp}
        />
        </header>
    )
}) 

export default TodoHeader