/* eslint-disable react/jsx-fragments */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const ToDoItem = (props) => {
  // eslint-disable-next-line object-curly-newline
  const { toDo, markAsCompleted, removeFinishedTask, removeTask } = props;
  return (
    <li>
      <span>{toDo.title}</span>
      {!toDo.complete ? (
        <Fragment>
          <button className="button button--remove" type="button" onClick={() => removeTask(toDo)}>
            remove
          </button>

          <button
            className="button button--done"
            type="button"
            onClick={() => markAsCompleted(toDo)}
          >
            completed
          </button>
        </Fragment>
      ) : (
        <Fragment>
          <button
            className="button button--remove"
            type="button"
            onClick={() => removeFinishedTask(toDo)}
          >
            remove
          </button>
        </Fragment>
      )}
    </li>
  );
};

ToDoItem.propTypes = {
  toDo: PropTypes.shape({ title: PropTypes.string, complete: PropTypes.bool }).isRequired,
  markAsCompleted: PropTypes.func.isRequired,
  removeFinishedTask: PropTypes.func.isRequired,
  removeTask: PropTypes.func.isRequired,
};

export default ToDoItem;
