import React, { useState } from 'react'
import { Input, Button, Row, Col } from 'antd';

function InputForm({ addTodo }) {
  const [todo, setTodo] = useState('');

  const handleSubmit = () => {
    setTodo('');
    addTodo(todo);
  }

  return (
    <>
      <Input.Group size="large">
        <Row gutter={10}>
          <Col span={18} >
            <Input placeholder="Todo" value={todo} onChange={(e) => setTodo(e.target.value)} />
          </Col>
          <Col span={6}>
            <Button type="primary" size='large' onClick={handleSubmit}>Add</Button>
          </Col>
        </Row>
      </Input.Group>

    </>
  )
}

export default InputForm;