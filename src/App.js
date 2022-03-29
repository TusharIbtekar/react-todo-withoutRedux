import { useEffect, useState } from "react";
import { Col, Row, Typography } from "antd";
import InputForm from "./components/input.component";
import TodoItem from "./components/todoItem.component";
import moment from "moment";

function App() {
  const [todos, setTodos] = useState([]);
  const [doneTodos, setDoneTodos] = useState([])

  const addTodo = todo => {
    setTodos([...todos, { id: Date.now(), title: todo, done: false, startTime: moment() }])
  }

  const handleDelete = id => {
    const availableTodos = [...todos].filter(todo => id != todo.id)
    setTodos(availableTodos);
  }

  const handleDone = (id, endTime) => {
    const todoList = [...todos];
    todoList.forEach((item, index, list) => {
      if (id === item.id) {
        if (item.done) {
          item.done = false;
        } else {
          item.done = true;
          item.endTime = endTime;
          const duration = moment
            .duration(endTime.diff(item.startTime))
            .asHours();
          item.duration = duration;
        }
        list[index] = item;
      }
    });
    console.log(todoList);
    setTodos(todoList);
  };



  const setLocalTodos = () => {
    if (todos.length > 0) {
      // console.log(todos);
      localStorage.setItem('todos', JSON.stringify(todos))
    }
  }

  const getLocalTodos = () => {
    let todoLocal = JSON.parse(localStorage.getItem('todos'));
    if (todoLocal && todoLocal.length)
      setTodos(todoLocal);
    console.log('here');
  }

  useEffect(() => {
    setLocalTodos();
    let todoLocal = JSON.parse(localStorage.getItem('todos'));
    todoLocal.map(todo => (
      // todo.done ? console.log(moment(todo.endTime).diff(todo.startTime, 'seconds')) : null
      todo.done ? setDoneTodos([...doneTodos, { title: todo.title, timeTaken: moment(todo.endTime).diff(moment(todo.startTime), 'seconds') }]) : null
    ))
  }, [todos])

  useEffect(() => {
    getLocalTodos();
  }, [])


  return (
    <>
      <Row align="middle" justify="center">
        <Col span={12} >
          <Row justify="center" style={{ 'marginTop': '5%' }}>
            <Typography.Title >
              ToDo
            </Typography.Title>
          </Row>
          <Row>
            <InputForm addTodo={addTodo} />
          </Row>
          <TodoItem
            todos={todos}
            onDelete={handleDelete}
            onDone={handleDone}
          />
        </Col>
      </Row>
    </>
  );
}

export default App;
