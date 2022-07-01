// @ts-ignore
import React from 'react'
import TodoHeader from './TodoHeader'
import TodoMain from './TodoMain'
import TodoFooter from './TodoFooter'
export const Todos = () => {
  return (
    <section className='todoapp'>
      <TodoHeader />
      <TodoMain />
      <TodoFooter />
    </section>
  )
}
