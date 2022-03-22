import React from 'react'
import { Checkbox, List, Typography, Row, Col, Button, Space, Modal } from 'antd';
import { DeleteTwoTone, ExclamationCircleOutlined } from '@ant-design/icons';

function TodoItem({ todos, onDelete }) {
  const { confirm } = Modal;

  const onChange = () => {
    console.log('checked');
  }

  const showDeleteConfirm = title => {
    confirm({
      title: 'Are you sure delete this task?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        onDelete(title);
      },
      onCancel() { },
    });

  }

  return (
    <>
      <List
        dataSource={todos}
        renderItem={item => (
          <List.Item>
            <Row >
              <Space>

                <Checkbox onChange={onChange} />
                <Typography.Text>{item.title}</Typography.Text>
                <Button onClick={() => showDeleteConfirm(item.title)}><DeleteTwoTone /></Button>

              </Space>
            </Row>
          </List.Item>
        )}
      />
    </>
  )
}

export default TodoItem;