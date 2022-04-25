import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  todoList: [],
  // showDone: Boolean
}

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    saveTodo: (state, action) => {
      state.todoList.push(action.payload)
    },
    setCheck: (state, action) => {
      state.todoList.map(item => {
        if (action.payload === item.id) {
          item.done = item.done ? false : true
        }
      })
    },
    // setShowDone: (state, action) => {
    //   state.todoList.map(item => {
    //     if (item.done === true) {
    //       state.showDone = true;
    //     }
    //   })
    // },
  }
});

export const { saveTodo, setCheck } = todoSlice.actions

export const fetchTodoList = state => state.todos.todoList

export default todoSlice.reducer