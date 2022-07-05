import { produce, Draft } from 'immer'
import { setupPreloadCallback, setupStartCallback, setupStore } from '@pure-model/core'

export type Todo = {
    id: number;
    content: string;
    completed: boolean;
};

export type Todos = Todo[];

const initialState: Todos = []
// const data = localStorage.getItem('todoState')
// const initialState = (data && JSON.parse(data)) || []

export default function TodosInitializer () {
  const { store, actions } = setupStore({
    name: 'todos',
    initialState,
    reducers: {
      addTodo: produce((draft: Draft<Todos>, content: string) => {
        draft.push({
          id: Date.now(),
          content,
          completed: false
        })
      }),
      editTodo: produce((draft: Draft<Todos>, { id, content }: { id: number, content: string }) => {
        draft.map((todo: Todo) => {
          if (todo.id !== id) return todo
          todo.content = content
          return todo
        }).slice()
      }),
      toggleTodo: produce((draft: Draft<Todos>, id: number) => {
        draft.map((todo: Todo) => {
          if (todo.id !== id) return todo
          todo.completed = !todo.completed
          return todo
        })
      }),
      toggleAll: (state: Todos) => produce(state, (draft: Draft<Todos>) => {
        const allCompleted = draft.every(todo => todo.completed)
        if (allCompleted) {
          draft.map((todo: Todo) => {
            todo.completed = false
            return todo
          })
        } else {
          draft.map((todo: Todo) => {
            todo.completed = true
            return todo
          })
        }
      }),
      removeTodo: produce((draft: Draft<Todos>, id: number) => {
        return draft.filter((todo: Todo) => todo.id !== id)
      }),
      clearCompleted: (state: Todos) => produce(state, (draft: Draft<Todos>) => {
        return draft.filter((todo: Todo) => !todo.completed)
      }),
      updateTodoState: (state: Todos) => produce(state, (draft: Draft<Todos>) => {
        const todoState = localStorage.getItem('todoState')
        // @ts-ignore
        let todoList = JSON.parse(todoState || [])
        return todoList
      })
    }
  })
  return { store, actions }
}

