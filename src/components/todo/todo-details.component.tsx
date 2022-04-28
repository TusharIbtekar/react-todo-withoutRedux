import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Space, Input, List, Row } from 'antd';
import { LeftCircleFilled } from '@ant-design/icons';

import Comment from './comment.component';
import getTodos from '../../services/getTodos';
import moment from 'moment';

import { TodoRoot } from '../../types/todo'
import { useDispatch } from 'react-redux';
import { saveTodo } from '../../features/todos/todoSlice';

const TodoDetails = () => {
  const [todo, setTodo] = useState<TodoRoot>();
  const [comment, setComment] = useState('');
  const [changed, setChanged] = useState(false);
  const [note, setNote] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = parseInt((useParams() as any).id);

  const addComment = (e: any) => {
    todo?.comment
      ? setTodo({ ...todo, comment: [...todo.comment, e.target.value] })
      : setTodo({ ...todo!, comment: [e.target.value] });
    setComment('');
    setChanged(true);
  };

  const updateNote = () => {
    setTodo({ ...todo!, note: note });
    setChanged(true);
  };

  const onDeleteComment = (comment: string) => {
    const allComments = [...todo?.comment!];
    const newComments = allComments.filter((item) => item !== comment);
    setTodo({ ...todo!, comment: newComments });
    setChanged(true);
  };

  const handleNote = (e: any) => {
    setNote(e.target.value);
  };

  const handleComment = (e: any) => {
    setComment(e.target.value);
  };

  useEffect(() => {
    if (changed) {
      const todos = getTodos();
      todos.forEach((item: TodoRoot, i: number, list: TodoRoot[]) => {
        if (item.id === id) {
          (list as any)[i] = todo;
        }
      });
      // setTodos(todos); // Update localstorage
      dispatch(saveTodo({ todos }))
    }
  }, [todo, changed, id]);

  useEffect(() => {
    const todos = getTodos();
    const todo = todos.find((todo: TodoRoot) => todo.id === id);
    if (todo.note) {
      setNote(todo.note);
    }
    setTodo(todo); // set current todo
  }, []);

  return (
    <Row>
      <LeftCircleFilled style={{ fontSize: '30px', marginLeft: '20%', marginTop: '2%' }} onClick={() => navigate(-1)} />
      <Space
        direction="horizontal"
        style={{ width: '100%', justifyContent: 'center' }}
      >
        <Card title={todo?.title} bordered={false} style={{ width: '50vw' }}>
          {todo?.duration ? <h4>Time taken: {moment.duration(todo?.duration, 'minutes').humanize()}</h4> : null}
          <Input.TextArea
            rows={6}
            showCount
            maxLength={150}
            placeholder="Todo Note"
            value={note}
            onPressEnter={updateNote}
            onChange={handleNote}
          />

          <Input.TextArea
            placeholder="Comment"
            value={comment}
            onChange={handleComment}
            onPressEnter={addComment}
          // prefix={<CommentOutlined />}
          />

          {todo?.comment && todo.comment.length ? (
            <List
              itemLayout="vertical"
              dataSource={todo.comment}
              renderItem={(item) => (
                <List.Item>
                  <Comment comment={item} onDeleteComment={onDeleteComment} />
                </List.Item>
              )}
            />
          ) : null}
        </Card>
      </Space>
    </Row>
  );
};

export default TodoDetails;
