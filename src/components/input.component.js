import React, { useState } from 'react'
import { Input, Button, Row, Col } from 'antd';

function InputForm({ addTodo }) {
  const [todo, setTodo] = useState('');

  const handleSubmit = () => {
    setTodo('');
    addTodo(todo);
  }

  return (

    <Row style={{ 'width': '100%' }} justify='space-between'>
      <Input.Group compact size="large">
        <Input style={{ width: 'calc(100% - 100px)', 'marginRight': '3%' }} placeholder="Todo" value={todo} onChange={(e) => setTodo(e.target.value)} />
        <Button type="primary" size='large' onClick={handleSubmit}>Add</Button>
      </Input.Group>
    </Row>
  )
}

export default InputForm;
// size="large" style={{ 'width': '100%' }}