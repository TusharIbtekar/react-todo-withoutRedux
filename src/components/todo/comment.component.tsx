import React from 'react';
import { Space, Tooltip, Button, Row, Modal } from 'antd';
import { ExclamationCircleOutlined, CloseOutlined } from '@ant-design/icons';

type Props = {
  comment: string;
  onDeleteComment: (val: string) => void;
};

const Comment: React.FC<Props> = ({ comment, onDeleteComment }) => {
  const { confirm } = Modal;

  const showDeleteConfirm = (comment: string): void => {
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
