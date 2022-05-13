import axios from 'axios';
import { useEffect, useState } from 'react';
import { Col, Row, Typography } from 'antd';
import { EnvironmentFilled } from '@ant-design/icons';

import { WeatherRoot } from '../types/weather';

const Weather = () => {
  const [weather, setWeather] = useState<WeatherRoot | null>(null);

  useEffect(() => {
    getWeather(function (location: any) {
      let res = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.long}&appid=2c6d3ef7190833eab7714c3bc203d21f&units=metric&city`) //jbondy@nwhsii.com
      res
        .then(response => {
          setWeather(response.data);
        })
    })
  }, []);


  function getWeather(weatherAPI: any) {
    navigator.geolocation.getCurrentPosition(function (position) {
      weatherAPI({ lat: position.coords.latitude, long: position.coords.longitude })
    });
  }

  return (
    <>
      {weather && (
        <Row justify='end'>
          <Col>
            <Row>
              <Typography.Title level={3} type="secondary"><EnvironmentFilled />{weather.name}</Typography.Title>
            </Row>
            <Row>
              <Typography.Title level={4} type="secondary">{weather.main.temp}° Celcius</Typography.Title>
            </Row>
            <Row>
              <Typography.Title level={4} type="secondary">
                <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} />
                {weather.weather[0].main}
              </Typography.Title>
            </Row>
          </Col>
        </Row>
      )}
    </>
  )
}

export default Weather