import React, { Component } from 'react';
import SimpleStorage from 'react-simple-storage';
import fetchFunction from '../../utils';

import ToDoForm from '../ToDoForm';
import ToDoList from '../ToDoList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newToDo: '',
      toDos: [],
      finishedToDos: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.removeTask = this.removeTask.bind(this);
    this.removeFinishedTask = this.removeFinishedTask.bind(this);
    this.markAsCompleted = this.markAsCompleted.bind(this);
  }

  componentDidMount() {
    this.getTasks();
    this.getFinishedTasks();
  }

  getTasks = async () => {
    const toDosResponse = await fetch('http://localhost:8000/api/todos');
    const toDosJSON = await toDosResponse.json();
    this.setState({ toDos: toDosJSON });
  };

  getFinishedTasks = async () => {
    const finishedToDosResponse = await fetch('http://localhost:8000/api/todos?tasks=completed');
    const finishedToDosJSON = await finishedToDosResponse.json();
    this.setState({ finishedToDos: finishedToDosJSON });
  };

  handleChange = (event) => {
    this.setState({
      newToDo: event.target.value,
    });
  };

  removeTask = (todo) => {
    const { toDos } = this.state;
    toDos.splice(todo, 1);
    this.setState({ toDos });
    fetchFunction(todo, null, 'DELETE').then(this.getTasks);
  };

  removeFinishedTask = (todo) => {
    const { finishedToDos } = this.state;
    finishedToDos.splice(todo, 1);
    this.setState({ finishedToDos });
    fetchFunction(todo, null, 'DELETE').then(this.getFinishedTasks);
  };

  markAsCompleted = (todo) => {
    const { finishedToDos, toDos } = this.state;
    toDos.splice(todo, 1);
    this.setState({ finishedToDos: [...finishedToDos, todo], toDos });
    fetchFunction(todo, { complete: true }, 'PATCH');
    this.getFinishedTasks().then(this.getFinishedTasks);
  };

  submitForm = (event) => {
    event.preventDefault();
    const { toDos, newToDo } = this.state;
    if (!newToDo) {
      alert('Please enter the task!');
      return;
    }
    this.setState({
      newToDo: '',
      toDos: [
        ...toDos,
        {
          title: newToDo,
        },
      ],
    });
    fetchFunction(null, { title: newToDo, complete: false }, 'POST').then(this.getTasks);
  };

  render() {
    const { newToDo, toDos, finishedToDos } = this.state;
    return (
      <div id="app">
        <SimpleStorage parent={this} />
        <div className="container">
          <ToDoForm
            newToDo={newToDo}
            handleChange={this.handleChange}
            submitForm={this.submitForm}
          />
          <h2 className="todo">TO DO</h2>
          <ToDoList
            toDos={toDos}
            removeFinishedTask={this.removeFinishedTask}
            markAsCompleted={this.markAsCompleted}
            removeTask={this.removeTask}
          />
          <h2 className="done">DONE</h2>
          <ToDoList
            toDos={finishedToDos}
            removeFinishedTask={this.removeFinishedTask}
            markAsCompleted={this.markAsCompleted}
            removeTask={this.removeTask}
          />
        </div>
      </div>
    );
  }
}

export default App;
