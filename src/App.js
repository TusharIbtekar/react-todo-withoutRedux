import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import 'antd/dist/antd.css';

import ChartWrapper from './components/chart/chart-wrapper.component';
import TodoDetails from './components/todo/todo-details.component';
import Todo from './components/todo.component';
import Navbar from './components/navbar.component';

const App = () => {
  useEffect(() => {
    const hours = new Date().getHours()
    const isDayTime = hours > 6 && hours < 20
    if (isDayTime) {
      import('antd/dist/antd.css')
    } else {
      import('antd/dist/antd.dark.css')
    }

  }, [])
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Todo />} />
        <Route path="/charts" element={<ChartWrapper />} />
        <Route path="todo/:id" element={<TodoDetails />} />
        <Route
          path="*"
          element={
            <main style={{ padding: '1rem' }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
    </>
  )
}

export default App;
