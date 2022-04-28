import { createSlice } from '@reduxjs/toolkit'
import moment from 'moment';

const initialState = {
  todoList: [],
}

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    saveTodo: (state, action) => {
      state.todoList = action.payload.todos;
      if (action.payload.todos)
        localStorage.setItem('todos', JSON.stringify(action.payload.todos));
    },
    setDone: (state, action) => {
      state.todoList.map(item => {
        if (action.payload.id === item.id) {
          console.log(action);
          if (item.done) {
            item.done = false;
          } else {
            item.done = true;
            item.endTime = action.payload.endTime;
            const duration = moment
              .duration(moment(item.endTime).diff(moment(item.startTime)))
              .asHours();
            item.duration = duration;
          }
          // item.done = item.done ? false : true
        }
      })
      localStorage.setItem('todos', JSON.stringify(state.todoList));
    },
  }
});

export const { saveTodo, setDone } = todoSlice.actions

export const fetchTodoList = state => state.todos.todoList

export default todoSlice.reducer