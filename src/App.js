import { useState } from "react";
import { Col, Row, Typography } from "antd";
import InputForm from "./components/input.component";
import TodoItem from "./components/todoItem.component";

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = todo => {
    setTodos([...todos, { title: todo, done: false }])
  }

  const handleDelete = title => {
    const newTodos = [...todos].filter(todo => title != todo.title)
    setTodos(newTodos);
  }

  return (
    <>
      <Row align="middle" justify="center">
        <Col span={12} >
          <Row justify="center">
            <Typography.Title>
              ToDo
            </Typography.Title>
          </Row>
          <Row>
            <InputForm addTodo={addTodo} />
          </Row>
          <Row>
            <TodoItem
              todos={todos}
              onDelete={handleDelete}
            />
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default App;
