import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import 'antd/dist/antd.css';

import App from './App';
import ChartWrapper from './components/chart/chart-wrapper.component';
import TodoDetails from './components/todo/todo-details.component';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
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
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
