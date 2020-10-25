import React from 'react';
import PropTypes from 'prop-types';

const ToDoForm = (props) => {
  const { newToDo, submitForm, handleChange } = props;
  return (
    <form className="new-todo-form" onSubmit={submitForm}>
      <label htmlFor="newTodo">New Todo</label>
      <input
        className="input"
        onChange={handleChange}
        placeholder="ENTER TASK"
        id="newTodo"
        type="text"
        value={newToDo}
      />
      <button className="button button--add" type="submit">
        Add
      </button>
    </form>
  );
};

ToDoForm.propTypes = {
  newToDo: PropTypes.string.isRequired,
  submitForm: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default ToDoForm;
