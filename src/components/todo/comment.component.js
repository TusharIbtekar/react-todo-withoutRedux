import React from 'react';
import { Space, Tooltip, Button } from 'antd';
import { ExclamationCircleOutlined, CloseOutlined } from '@ant-design/icons';

const Comment = ({ comment, onDeleteComment }) => {
  return (
    <Space>
      <ExclamationCircleOutlined />
      {comment}
      <Tooltip title="Delete">
        <Button
          shape="circle"
          icon={<CloseOutlined />}
          size="small"
          onClick={() => onDeleteComment(comment)}
        />
      </Tooltip>
    </Space>
  );
};

export default Comment;
