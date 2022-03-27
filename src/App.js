import { useEffect, useState } from "react";
import { Col, Row, Typography } from "antd";
import InputForm from "./components/input.component";
import TodoItem from "./components/todoItem.component";
import moment from "moment";

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = todo => {
    setTodos([...todos, { id: Date.now(), title: todo, done: false, startTime: moment() }])
  }

  const handleDelete = id => {
    const availableTodos = [...todos].filter(todo => id != todo.id)
    setTodos(availableTodos);
  }

  const handleDone = (id) => {
    const todoList = [...todos];
    todoList.map(item => {
      if (id === item.id) {
        if (item.done) {
          item.done = false;
        } else {
          item.done = true;
          item.endTime = moment();
        }
      }
    });
    setTodos(todoList);
  }

  const setLocalTodos = () => {
    if (todos.length > 0) {
      console.log(todos);
      localStorage.setItem('todos', JSON.stringify(todos))
    }
  }

  const getLocalTodos = () => {
    let todoLocal = JSON.parse(localStorage.getItem('todos'));
    setTodos(todoLocal);
  }

  useEffect(() => {
    setLocalTodos();
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
