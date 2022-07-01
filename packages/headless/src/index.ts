import { createCombine, subscribeModels } from '@pure-model-combine/core'
import TodoFilter, { Filter} from './filter'
import TodosInitializer from './todos'

export type { Filter }

export const globalModels = [TodosInitializer, TodoFilter]


export const headerCombine = createCombine({
  todos: TodosInitializer
}, (props, models, getState) => {
  subscribeModels(models, state => {
    localStorage.setItem('todoState', JSON.stringify(state.todos))
  })
  type State = ReturnType<typeof getState>
  return {
    selectors: {
      todos: (state) => state.todos,
      isAllCompleted: ({ todos }) => todos.every(({ completed }) => completed),
      isEmpty: ({ todos }) => !todos.length
    },
    actions: {
      toggleAll: () => models.todos.actions.toggleAll(),
      addTodo: (content: string) => {
        if (!content) {
          return {
            error: new Error('content can not be empty')
          }
        }
        models.todos.actions.addTodo(content)
      }
    }
  }
})

export const todosCombine = createCombine({
  todo: TodosInitializer,
  filter: TodoFilter
}, (props, models) => {
  return {
    selectors: {
      count: (state) => state.todo.length,
      list: (state) => state.todo,
      filterList: (state) => state.filter
    },
    actions: {
      toggleAll: () => models.todo.actions.toggleAll(),
      updateTodoState: () => models.todo.actions.updateTodoState()
    }
  }
})


export const filterCombine = createCombine({
  todos: TodosInitializer,
  filter: TodoFilter
}, (props, models, getState) => {
  return {
    selectors: {
      filterList: (state) => state.filter,
      list: (state) => state.todos,
      allCount: (state) => state.todos.length
    },
    actions: {
      clearCompleted: () => models.todos.actions.clearCompleted(),
      filterActive: (active: string) => {
        models.filter.actions.filterActive(active)
      }
    }
  }
})

type TodoProps = {
  id: number,
  content: string
}
export const todoCombine = createCombine({
  todos: TodosInitializer,
}, (props: TodoProps, models, getState) => {
  type State = ReturnType<typeof getState>
  const todo = ({ todos }: State) => todos.find(({ id }) => id === props.id)
  const toggle = (id: number) => {
    models.todos.actions.toggleTodo(props.id)
  }
  const remove = (id: number) => {
    models.todos.actions.removeTodo(props.id)
  }
  const edit = (id: number, content: string) => {
    models.todos.actions.editTodo({ id: props.id, content: content })
  }
  return {
    selectors: {
      todo
    },
    actions: {
      toggle,
      remove,
      edit
    }
  }
})
