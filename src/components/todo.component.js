import { useEffect, useState } from 'react';
import { Col, Row, Typography } from 'antd';
import moment from 'moment';

import InputForm from './input.component';
import TodoItem from './todoItem.component';
import getLocalTodos from '../services/getTodos';
import setLocalTodos from '../services/setTodos';
import axios from 'axios';

function Todo() {
  const [todos, setTodos] = useState([]);
  const [weather, setWeather] = useState('');

  const addTodo = (todo) => {
    setTodos([
      ...todos,
      { id: Date.now(), title: todo, done: false, startTime: moment() },
    ]);
  };
  const handleDelete = (id) => {
    const availableTodos = [...todos].filter((todo) => id !== todo.id);
    setTodos(availableTodos);
  };

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

  useEffect(() => {
    if (todos.length > 0) {
      setLocalTodos(todos);
    }
  }, [todos]);

  useEffect(() => {
    let todoLocal = getLocalTodos();
    if (todoLocal && todoLocal.length) {
      setTodos(todoLocal);
    }
    getWeather(function (location) {
      let res = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.long}&appid=2c6d3ef7190833eab7714c3bc203d21f&units=metric&city`) //jbondy@nwhsii.com
      res
        .then(response => {
          setWeather(response.data);
          console.log(response.data);
        })
    })
  }, []);


  function getWeather(weatherAPI) {
    navigator.geolocation.getCurrentPosition(function (position) {
      weatherAPI({ lat: position.coords.latitude, long: position.coords.longitude })
    });
  }

  return (
    <>
      {weather && (
        <Row justify="end">
          <Col span={4}>
            <Row>
              <Typography.Title level={3} type="secondary">{weather.sys.country}</Typography.Title>
            </Row>
            <Row>
              <Typography.Title level={4} type="secondary">{weather.main.temp} Celcius</Typography.Title>
            </Row>
            <Row>
              <Typography.Title level={4} type="secondary">
                {/* <img src={weather.weather[0].icon} /> */}
                {weather.weather[0].main}
              </Typography.Title>
            </Row>
          </Col>
        </Row>
      )}
      <Row align="middle" justify="center">
        <Col span={12}>
          <Row justify="center" style={{ marginTop: '5%' }}>
            <Typography.Title>ToDo</Typography.Title>
          </Row>
          <Row>
            <InputForm addTodo={addTodo} />
          </Row>
          <TodoItem todos={todos} onDelete={handleDelete} onDone={handleDone} />
        </Col>
      </Row>
    </>
  );
}

export default Todo;