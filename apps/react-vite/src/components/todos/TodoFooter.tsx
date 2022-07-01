import classNames from 'classnames'
import { FilterContainer } from '../../adapt-headless'

const TodosFooter = FilterContainer.toWrappedComponent(({ actions, selected }) => {
    // @ts-ignore
    const { list, filterList } = selected
    const { clearCompleted, filterActive } = actions

    // @ts-ignore
    const { arr, active } = filterList
    // @ts-ignore
    const leftCount = list.filter((item: { done: any }) => !item.done).length
    const handleClearDoned = () => clearCompleted()
    const handleActive = (item: any) => filterActive(item)
    const isShowClear = list.some((item: { completed: any }) => item.completed)
    return (
        <footer className='footer'>
        <span className='todo-count'>
            <strong>{leftCount}</strong> item left
        </span>
        <ul className='filters'>
            {arr.map((item: any) => (
            <li key={item} onClick={() => handleActive(item)}>
                <a
                className={classNames({
                    selected: active === item,
                })}
                href='#/'
                >
                {item.slice(0, 1).toUpperCase() + item.slice(1)}
                </a>
            </li>
            ))}
        </ul>
        {isShowClear && (
            <button className='clear-completed' onClick={handleClearDoned}>
            Clear completed
            </button>
        )}
        </footer>
    )
})

export default TodosFooter