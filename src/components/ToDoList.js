import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './ToDoItem';

const ToDoList = (props) => {
  // eslint-disable-next-line object-curly-newline
  const { toDos, markAsCompleted, removeFinishedTask, removeTask } = props;
  return (
    <ul>
      {toDos.map((toDo) => (
        <TodoItem
          toDo={toDo}
          markAsCompleted={markAsCompleted}
          removeFinishedTask={removeFinishedTask}
          removeTask={removeTask}
          key={toDo.id}
        />
      ))}
    </ul>
  );
};

ToDoList.propTypes = {
  toDos: PropTypes.arrayOf(PropTypes.object).isRequired,
  markAsCompleted: PropTypes.func.isRequired,
  removeFinishedTask: PropTypes.func.isRequired,
  removeTask: PropTypes.func.isRequired,
};

export default ToDoList;
