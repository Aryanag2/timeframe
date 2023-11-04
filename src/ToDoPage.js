import React, { useState, useEffect } from 'react';
import M from 'materialize-css';

const TodoPage = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({
    title: '',
    deadline: '',
    priority: 'Low',
    notes: '',
    isEditing: false,
  });

  // Initialize Materialize CSS Components after render
  useEffect(() => {
    // Initialize Select
    const selects = M.FormSelect.init(document.querySelectorAll('select'));
    // Initialize Datepicker
    const datepickers = M.Datepicker.init(document.querySelectorAll('.datepicker'), {
      format: 'yyyy-mm-dd',
      onClose: () => {
        // Update state when datepicker closes
        const instance = M.Datepicker.getInstance(document.getElementById('deadline'));
        if (instance.date) {
          setNewTodo({ ...newTodo, deadline: instance.toString() });
        }
      },
    });

    // Cleanup function
    return () => {
      selects.forEach(select => select.destroy());
      datepickers.forEach(datepicker => datepicker.destroy());
    };
  }, [newTodo]);

  // Other handler functions remain unchanged

  const handleTodoFormSubmit = (e) => {
    e.preventDefault();
    if (newTodo.title && newTodo.deadline) {
      setTodos([...todos, { ...newTodo, isEditing: false }]);
      setNewTodo({
        title: '',
        deadline: '',
        priority: 'Low',
        notes: '',
        isEditing: false,
      });
    }
  };

    const handleTodoChange = (index, field, value) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, [field]: value } : todo
    );
    setTodos(updatedTodos);
  };

  const toggleEdit = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, isEditing: !todo.isEditing } : todo
    );
    setTodos(updatedTodos);
  };

  const handleTodoDelete = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };

  // Rest of your component code...

  return (
    <div className="container">
      <h1 className="header">Add Todo</h1>
      <form onSubmit={handleTodoFormSubmit}>
        {/* Form Fields */}
        <div className="input-field">
          <input
            id="title"
            type="text"
            className="validate"
            value={newTodo.title}
            onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
            required
          />
          <label htmlFor="title">Title</label>
        </div>

        <div className="input-field">
          <input
            id="deadline"
            type="text"
            className="datepicker"
            value={newTodo.deadline}
            onChange={(e) => {}}
            required
          />
          <label htmlFor="deadline">Deadline</label>
        </div>

        <div className="input-field">
          <select
            id="priority"
            value={newTodo.priority}
            onChange={(e) => setNewTodo({ ...newTodo, priority: e.target.value })}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <label htmlFor="priority">Priority</label>
        </div>

        <div className="input-field">
          <textarea
            id="notes"
            className="materialize-textarea"
            value={newTodo.notes}
            onChange={(e) => setNewTodo({ ...newTodo, notes: e.target.value })}
          />
          <label htmlFor="notes">Notes</label>
        </div>

        <button className="btn waves-effect waves-light" type="submit">Add Todo</button>
      </form>

      {/* Todo List */}
      <div className="section">
        {todos.map((todo, index) => (
          <div className="card" key={index}>
            <div className="card-content">
              {todo.isEditing ? (
                <div className="input-field">
                  <input
                    type="text"
                    value={todo.title}
                    onChange={(e) => handleTodoChange(index, 'title', e.target.value)}
                  />
                  <label className="active">Title</label>
                </div>
              ) : (
                <span className="card-title">{todo.title}</span>
              )}

              {todo.isEditing ? (
                <div className="input-field">
                  <input
                    type="text"
                    className="datepicker"
                    value={todo.deadline}
                    onChange={(e) => {}}
                  />
                  <label className="active">Deadline</label>
                </div>
              ) : (
                <p>Deadline: {todo.deadline}</p>
              )}

              {todo.isEditing ? (
                <div className="input-field">
                  <select
                    value={todo.priority}
                    onChange={(e) => handleTodoChange(index, 'priority', e.target.value)}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                  <label>Priority</label>
                </div>
              ) : (
                <p>Priority: {todo.priority}</p>
              )}

              {todo.isEditing ? (
                <div className="input-field">
                  <textarea
                    className="materialize-textarea"
                    value={todo.notes}
                    onChange={(e) => handleTodoChange(index, 'notes', e.target.value)}
                  />
                  <label className="active">Notes</label>
                </div>
              ) : (
                <p>Notes: {todo.notes}</p>
              )}
            </div>
            <div className="card-action">
              <button className="btn waves-effect waves-light" onClick={() => toggleEdit(index)}>
                {todo.isEditing ? 'Save' : 'Edit'}
              </button>
              <button className="btn waves-effect waves-light red" onClick={() => handleTodoDelete(index)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoPage;
