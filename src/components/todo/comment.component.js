import React from 'react';
import { Space, Tooltip, Button, Row, Modal } from 'antd';
import { ExclamationCircleOutlined, CloseOutlined } from '@ant-design/icons';

const Comment = ({ comment, onDeleteComment }) => {
  const { confirm } = Modal;

  const showDeleteConfirm = comment => {
    confirm({
      title: 'Are you sure to delete this comment?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        onDeleteComment(comment);
      },
      onCancel() { },
    });

  }

  return (
    <Row style={{ 'width': '100%' }} justify='space-between'>
      <Space>
        <ExclamationCircleOutlined />
        {comment}
      </Space>
      <Tooltip title="Delete">
        <Button
          shape="circle"
          icon={<CloseOutlined />}
          size="small"
          onClick={() => showDeleteConfirm(comment)}
        />
      </Tooltip>
    </Row>
  );
};

export default Comment;
