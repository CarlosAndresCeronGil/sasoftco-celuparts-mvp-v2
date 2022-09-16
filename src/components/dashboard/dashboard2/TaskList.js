import React, { useState } from 'react';
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  ListGroup,
  ListGroupItem,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';

import './TaskList.scss';

const TaskList = () => {
  const [todos, setTodos] = useState([
    {
      id: 1,
      content: 'Schedule meeting with',
      status: 'Rejected',
      completed: false,
    },
    {
      id: 2,
      content: 'Give Purchase report to',
      status: 'Pending',
      completed: false,
    },
    {
      id: 3,
      content: 'Book flight for holiday',
      status: 'Rejected',
      completed: false,
    },
    {
      id: 4,
      content: 'Forward all tasks',
      status: 'Completed',
      completed: true,
    },
    {
      id: 5,
      content: 'Recieve shipment',
      status: 'Rejected',
      completed: false,
    },
    {
      id: 6,
      content: 'Send payment today',
      status: 'Rejected',
      completed: false,
    },
    {
      id: 7,
      content: 'Important tasks',
      status: 'Pending',
      completed: false,
    },
    {
      id: 8,
      content: 'Schedule meeting with',
      status: 'Pending',
      completed: false,
    },
    {
      id: 9,
      content: 'Give Purchase report to',
      status: 'Completed',
      completed: true,
    },
  ]);

  const toggleComplete = (todoId) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === todoId) todo.completed = !todo.completed;
        return todo;
      }),
    );
  };

  const deleteTodo = (todoId) => {
    setTodos(todos.filter((todo) => todo.id !== todoId));
  };

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h4">Task List</CardTitle>
        <CardSubtitle className="text-muted">Widget you can use</CardSubtitle>
        <div className="todo-widget mt-3">
          <ListGroup className="list-task todo-list list-group mb-0" data-role="tasklist">
            {todos.map((todo) => (
              <ListGroupItem
                className={`d-flex align-items-center todo-item px-0 border-0 ${
                  todo.completed ? 'completed' : ''
                }`}
                key={todo.id}
              >
                <FormGroup check inline>
                  <Input
                    type="checkbox"
                    checked={todo.completed}
                    id={todo.id}
                    data-toggle="checkbox"
                    onChange={() => toggleComplete(todo.id)}
                  />
                  <Label htmlFor={todo.id} check>
                    <span className="todo-desc">{todo.content}</span>
                  </Label>
                </FormGroup>
                <div className="ms-auto gap-2 d-flex align-items-center">
                  {todo.status === 'Rejected' ? (
                    <span className="badge text-dark-white bg-danger rounded-pill d-inline-block fw-bold">
                      {todo.status}
                    </span>
                  ) : todo.status === 'Pending' ? (
                    <span className="badge text-dark-white bg-primary rounded-pill d-inline-block fw-bold">
                      {todo.status}
                    </span>
                  ) : (
                    <span className="badge text-dark-white bg-success rounded-pill d-inline-block fw-bold">
                      {todo.status}
                    </span>
                  )}
                  <span className="cursor-pointer" onClick={() => deleteTodo(todo.id)}>
                    <i className="bi bi-x fs-4 text-muted"></i>
                  </span>
                </div>
              </ListGroupItem>
            ))}
          </ListGroup>
        </div>
      </CardBody>
    </Card>
  );
};

export default TaskList;
