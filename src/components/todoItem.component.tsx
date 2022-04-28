import React from 'react'
import { Checkbox, List, Typography, Row, Button, Space, Modal, Collapse, DatePicker, notification } from 'antd';
import moment, { Moment } from 'moment';
import { DeleteTwoTone, ExclamationCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import { TodoRoot } from '../types/todo'
import { useSelector } from 'react-redux';
import { fetchTodoList } from '../features/todos/todoSlice';

type ITodoItem = {
  onDelete: (id: number) => void;
  onDone: (id: number, endTime: string) => void;
};

const TodoItem: React.FC<ITodoItem> = ({ onDelete, onDone }) => {
  const { confirm } = Modal;
  const key = 'updatable';
  let endTime = moment();

  const todos: TodoRoot[] = useSelector(fetchTodoList);

  const showDeleteConfirm = (id: number) => {
    confirm({
      title: 'Are you sure to delete this task?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        onDelete(id);
        openNotification('warn', 'Todo Deleted');
      },
      onCancel() { },
    });

  }

  const handleDone = (id: number) => {
    confirm({
      title: 'Select your finish time',
      icon: <ExclamationCircleOutlined />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        onDone(id, endTime.toString());
      },
      onCancel() { },
      content: (
        <DatePicker
          format="ddd, MMMM Do , h:mm:ss a"
          showTime={{ defaultValue: moment() }}
          defaultValue={endTime}
          onChange={(dateString) => (dateString ? endTime = dateString : null)}
        />
      ),
    });
  };

  const openNotification = (type: string, message: string) => {
    setTimeout(() => {
      (notification as any)[type]({
        key,
        message: message,
      });
    }, 1000);
  };

  return (
    <>
      <Row>
        <List
          style={{ 'width': '98.5%', 'marginTop': '2%' }}
          locale={{ emptyText: 'Add ToDo' }}
          dataSource={todos}
          renderItem={item => (
            !item.done ?
              <List.Item>
                <Row style={{ 'width': '100%' }} justify='space-between'>
                  <Space>
                    <Checkbox checked={item.done}
                      onChange={() => handleDone(item.id)}
                    />
                    <Typography.Text>
                      <Link style={{}} to={`/todo/${item.id}`}>
                        {item.title}
                      </Link>
                    </Typography.Text>
                  </Space>
                  <Button onClick={() => showDeleteConfirm(item.id)}><DeleteTwoTone /></Button>
                </Row>
              </List.Item> : null
          )}
        />
      </Row>
      <Row>
        {/* <Collapse bordered={false} style={{ 'width': '100%' }}> */}
        {/* <Collapse.Panel header="Completed"> */}
        <List
          locale={{ emptyText: 'No Task Completed' }}
          dataSource={todos}
          renderItem={item => (
            item.done ?
              <List.Item>
                <Row style={{ 'width': '100%' }} justify='space-between'>
                  <Space>
                    <Checkbox checked={item.done} onChange={() => onDone(item.id, '0')} />
                    <Typography.Text delete>
                      <Link style={{}} to={`/todo/${item.id}`}>
                        {item.title}
                      </Link>
                    </Typography.Text>
                  </Space>
                  <Button onClick={() => showDeleteConfirm(item.id)}><DeleteTwoTone /></Button>

                </Row>
              </List.Item> : null
          )}
        />
        {/* </Collapse.Panel> */}
        {/* </Collapse> */}
      </Row>
    </>
  )
}

export default TodoItem;