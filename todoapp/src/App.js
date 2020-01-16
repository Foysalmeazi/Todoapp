import React, { Component } from 'react'
import './App.css';
import todos from './Component/Data'




export default class App extends Component {
  constructor() {
    super()
    this.state =
      {
        todos: todos,
        createTodoText: " ",
        updateTodoText: " ",
        isUpdate: false,
        updateTodo: {}
      }
  }

  _createTodoText = (event) => {
    this.setState(
      {
        createTodoText: event.target.value
      })
  }

  _createTodo = () => {
    let todo =
    {

      id: Date.now(),
      text: this.state.createTodoText,
      completion: false
    }
    let todos = [...this.state.todos, todo];
    this.setState(
      {
        todos: todos,
        createTodoText: ""
      });


  }

  _showTodoText = (todo) => {
    if (todo.completion) {
      return <span onClick={() => this._toggleTodo(todo)} className="dt">{todo.text}</span>
    }
    else {
      return <span onClick={() => this._toggleTodo(todo)}>{todo.text}</span>
    }

  }
  _toggleTodo = (td) => {
    let todos = this.state.todos.map(todo => {
      if (todo.id === td.id)
        return {
          id: todo.id,
          text: todo.text,
          completion: !todo.completion
        }
      else {
        return todo
      }
    });
    this.setState(
      {
        todos: todos
      })


  }

  _updateBlock = (todo) => {
    return <div>
      <div className="card m-2">
        <div className="card-header">
          <h3>Update  ToDo Form</h3>
        </div>

        <div className="card-body">
          <input type="text" className="form-control" value={this.state.updateTodoText} onChange={this._updateTodoText}></input>
          <button className="m-2" onClick={()=>this._updateTodo(todo)}>Update To Do</button>

        </div>

      </div>
    </div>
  }


  _updateTodoText = (e) => {
    this.setState(
      {
        updateTodoText: e.target.value
      }
    )
  }


  _updateTodo = td => {
    let todos = this.state.todos.map(todo => {
      if (todo.id === td.id) {
        return {
          id: todo.id,
          completion: todo.completion,
          text: this.state.updateTodoText
        }


      }
      else {
        return todo
      }

    })
    this.setState(
      {
        todos: todos,
        isUpdate:false
      })


  }

  _createBlock = () => {
    return <div className="card mt-4">
      <div className="card-header">
        <h3 className="card-title">Create a TO Do</h3>
      </div>
      <div className="card-body">

        <input
          type="text"
          value={this.state.createTodoText}
          className="form-control"
          onChange={this._createTodoText}
        />
        <button type="button" className="mt-2" onClick={this._createTodo}>Add a ToDo</button>

      </div>
    </div>
  }
  updateStart = (todo) => {
    this.setState(
      {
        isUpdate: true,
        updateTodo: todo,
        updateTodoText: todo.text

      })

  }
  deleteToDo=(td)=>
  {
    const todos=this.state.todos.filter((todo)=> td.id!==todo.id);
    
     
      this.setState(
        {
          todos
        }
      )
    
  }


  render() {
    return (
      <div>
        <div className="card mt-4">
          <div className="card-header">
            <h3 className="card-title">ALL TODO</h3>
          </div>
          <div className="card-body">
            {
              this.state.todos.map(todo => {
                return <li key={todo.id}>{this._showTodoText(todo)}
                  <button className="ml-2" onClick={() => this.updateStart(todo)}>Edit</button>
                  <button className="m-2" onClick={()=>this.deleteToDo(todo)}>Delete</button>
                </li>
                //<button>Edit</button>
              })
            }
          </div>
        </div>

        {
          this._createBlock()
        }

        {
          this.state.isUpdate ? this._updateBlock(this.state.updateTodo) : null
        }

      </div>

    )
  }
}

