import React from 'react'
import { Checkbox, List, Typography, Row, Col, Button, Space, Modal, Collapse, DatePicker } from 'antd';
import moment from 'moment';
import { DeleteTwoTone, ExclamationCircleOutlined } from '@ant-design/icons';

function TodoItem({ todos, onDelete, onDone }) {
  const { confirm } = Modal;

  const showDeleteConfirm = id => {
    confirm({
      title: 'Are you sure delete this task?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        onDelete(id);
      },
      onCancel() { },
    });

  }

  return (
    <>
      <Row>
        <List
          locale={{ emptyText: 'Add ToDo' }}
          dataSource={todos}
          renderItem={item => (
            !item.done ?
              <List.Item>
                <Row>
                  <Space>

                    <Checkbox checked={item.done} onChange={() => onDone(item.id)} />
                    <Typography.Text>{item.title}</Typography.Text>
                    <DatePicker
                      format="ddd, MMMM Do , h:mm:ss a"
                      showTime={{ defaultValue: moment() }}
                      defaultValue={item.startTime}
                    />
                    <Button onClick={() => showDeleteConfirm(item.id)}><DeleteTwoTone /></Button>

                  </Space>
                </Row>
              </List.Item> : null
          )}
        />
      </Row>
      <Row>
        <Collapse bordered={false}>
          <Collapse.Panel header="Completed">
            <List
              locale={{ emptyText: 'No Task Completed' }}
              dataSource={todos}
              renderItem={item => (
                item.done ?
                  <List.Item>
                    <Row>
                      <Space>
                        <Checkbox checked={item.done} onChange={() => onDone(item.id)} />
                        <Typography.Text delete>{item.title}</Typography.Text>
                        <DatePicker
                          format="ddd, MMMM Do , h:mm:ss a"
                          showTime={{ defaultValue: moment() }}
                          defaultValue={item.startTime}
                        />
                        <DatePicker
                          format="ddd, MMMM Do , h:mm:ss a"
                          showTime={{ defaultValue: moment() }}
                          defaultValue={item.endTime}
                        />
                        <Button onClick={() => showDeleteConfirm(item.id)}><DeleteTwoTone /></Button>

                      </Space>
                    </Row>
                  </List.Item> : null
              )}
            />
          </Collapse.Panel>
        </Collapse>
      </Row>
    </>
  )
}

export default TodoItem;