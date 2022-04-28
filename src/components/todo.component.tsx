import { useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import moment from 'moment';

import InputForm from './input.component';
import TodoItem from './todoItem.component';
import getLocalTodos from '../services/getTodos';
import Weather from './weather.component';
import { TodoRoot } from '../types/todo'
import { useDispatch } from 'react-redux';
import { saveTodo, setDone } from '../features/todos/todoSlice';

function Todo() {
  const [todos, setTodos] = useState<TodoRoot[]>([]);

  const dispatch = useDispatch();

  const addTodo = (todo: string) => {
    setTodos([
      ...todos,
      { id: Date.now(), title: todo, done: false, startTime: moment().toString() },
    ]);
  };

  const handleDelete = (id: number) => {
    const availableTodos = [...todos].filter((todo) => id !== todo.id);
    setTodos(availableTodos);
  };

  const handleDone = (id: number, endTime: string) => {
    // const todoList = [...todos];
    dispatch(setDone({ id, endTime }));
    // todoList.forEach((item, index, list) => {
    // if (id === item.id) {
    // if (item.done) {
    //   item.done = false;
    // } else {
    //   item.done = true;
    //   item.endTime = endTime;
    //   const duration = moment
    //     .duration(endTime.diff(item.startTime))
    //     .asHours();
    //   item.duration = duration;
    // }
    // list[index] = item;
    // }
    // });
    // console.log(todoList);
    // setTodos(todoList);
  };

  useEffect(() => {
    if (todos.length > 0) {
      dispatch(saveTodo({
        todos
      }))
      // setLocalTodos(todos);
    }
  }, [todos]);

  useEffect(() => {
    let todoLocal = getLocalTodos();
    if (todoLocal && todoLocal.length) {
      setTodos(todoLocal);
    }
  }, []);

  return (
    <>
      <Row justify="center" style={{ 'marginTop': '5%' }}>
        <Col span={16}>
          <Row>
            <InputForm addTodo={addTodo} />
          </Row>
          <TodoItem onDelete={handleDelete} onDone={handleDone} />
        </Col>
        <Col span={4}>
          <Weather />
        </Col>
      </Row>
    </>
  );
}

export default Todo;