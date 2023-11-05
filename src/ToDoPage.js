// // import React, { useState, useEffect } from 'react';
// // import M from 'materialize-css';
// // import { useNavigate } from 'react-router-dom';

// // const TodoPage = () => {
// //   const [todos, setTodos] = useState([]);
// //   const [newTodo, setNewTodo] = useState({
// //     title: '',
// //     deadline: '',
// //     priority: 'Low',
// //     notes: '',
// //     isEditing: false,
// //   });
// //     const navigate = useNavigate();

// //   // Initialize Materialize CSS Components after render
// //   useEffect(() => {
// //     // Initialize Select
// //     const selects = M.FormSelect.init(document.querySelectorAll('select'));
// //     // Initialize Datepicker
// //     const datepickers = M.Datepicker.init(document.querySelectorAll('.datepicker'), {
// //       format: 'yyyy-mm-dd',
// //       onClose: () => {
// //         // Update state when datepicker closes
// //         const instance = M.Datepicker.getInstance(document.getElementById('deadline'));
// //         if (instance.date) {
// //           setNewTodo({ ...newTodo, deadline: instance.toString() });
// //         }
// //       },
// //     });

// //     // Cleanup function
// //     return () => {
// //       selects.forEach(select => select.destroy());
// //       datepickers.forEach(datepicker => datepicker.destroy());
// //     };
// //   }, [newTodo]);

// //   // Other handler functions remain unchanged

// //   const goToCalendar = () => {
// //     navigate('/calendar');
// //   };
  

// //   const handleTodoFormSubmit = (e) => {
// //     e.preventDefault();
// //     if (newTodo.title && newTodo.deadline) {
// //       setTodos([...todos, { ...newTodo, isEditing: false }]);
// //       setNewTodo({
// //         title: '',
// //         deadline: '',
// //         priority: 'Low',
// //         notes: '',
// //         isEditing: false,
// //       });
// //     }
// //   };

// //     const handleTodoChange = (index, field, value) => {
// //     const updatedTodos = todos.map((todo, i) =>
// //       i === index ? { ...todo, [field]: value } : todo
// //     );
// //     setTodos(updatedTodos);
// //   };

// //   const toggleEdit = (index) => {
// //     const updatedTodos = todos.map((todo, i) =>
// //       i === index ? { ...todo, isEditing: !todo.isEditing } : todo
// //     );
// //     setTodos(updatedTodos);
// //   };

// //   const handleTodoDelete = (index) => {
// //     const updatedTodos = [...todos];
// //     updatedTodos.splice(index, 1);
// //     setTodos(updatedTodos);
// //   };

// //   // Rest of your component code...

// //   return (
// //     <div className="container">
// //       <h1 className="header">Add Todo</h1>
// //       <form onSubmit={handleTodoFormSubmit}>
// //         {/* Form Fields */}
// //         <div className="input-field">
// //           <input
// //             id="title"
// //             type="text"
// //             className="validate"
// //             value={newTodo.title}
// //             onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
// //             required
// //           />
// //           <label htmlFor="title">Title</label>
// //         </div>

// //         <div className="input-field">
// //           <input
// //             id="deadline"
// //             type="text"
// //             className="datepicker"
// //             value={newTodo.deadline}
// //             onChange={(e) => {}}
// //             required
// //           />
// //           <label htmlFor="deadline">Deadline</label>
// //         </div>

// //         <div className="input-field">
// //           <select
// //             id="priority"
// //             value={newTodo.priority}
// //             onChange={(e) => setNewTodo({ ...newTodo, priority: e.target.value })}
// //           >
// //             <option value="Low">Low</option>
// //             <option value="Medium">Medium</option>
// //             <option value="High">High</option>
// //           </select>
// //           <label htmlFor="priority">Priority</label>
// //         </div>

// //         <div className="input-field">
// //           <textarea
// //             id="notes"
// //             className="materialize-textarea"
// //             value={newTodo.notes}
// //             onChange={(e) => setNewTodo({ ...newTodo, notes: e.target.value })}
// //           />
// //           <label htmlFor="notes">Notes</label>
// //         </div>

// //         <button className="btn waves-effect waves-light" type="submit">Add Todo</button>

// //       </form>
// //       <button className="btn waves-effect waves-light" onClick={goToCalendar}>
// //         Back to Calendar
// //         </button>

// //       {/* Todo List */}
// //       <div className="section">
// //         {todos.map((todo, index) => (
// //           <div className="card" key={index}>
// //             <div className="card-content">
// //               {todo.isEditing ? (
// //                 <div className="input-field">
// //                   <input
// //                     type="text"
// //                     value={todo.title}
// //                     onChange={(e) => handleTodoChange(index, 'title', e.target.value)}
// //                   />
// //                   <label className="active">Title</label>
// //                 </div>
// //               ) : (
// //                 <span className="card-title">{todo.title}</span>
// //               )}

// //               {todo.isEditing ? (
// //                 <div className="input-field">
// //                   <input
// //                     type="text"
// //                     className="datepicker"
// //                     value={todo.deadline}
// //                     onChange={(e) => {}}
// //                   />
// //                   <label className="active">Deadline</label>
// //                 </div>
// //               ) : (
// //                 <p>Deadline: {todo.deadline}</p>
// //               )}

// //               {todo.isEditing ? (
// //                 <div className="input-field">
// //                   <select
// //                     value={todo.priority}
// //                     onChange={(e) => handleTodoChange(index, 'priority', e.target.value)}
// //                   >
// //                     <option value="Low">Low</option>
// //                     <option value="Medium">Medium</option>
// //                     <option value="High">High</option>
// //                   </select>
// //                   <label>Priority</label>
// //                 </div>
// //               ) : (
// //                 <p>Priority: {todo.priority}</p>
// //               )}

// //               {todo.isEditing ? (
// //                 <div className="input-field">
// //                   <textarea
// //                     className="materialize-textarea"
// //                     value={todo.notes}
// //                     onChange={(e) => handleTodoChange(index, 'notes', e.target.value)}
// //                   />
// //                   <label className="active">Notes</label>
// //                 </div>
// //               ) : (
// //                 <p>Notes: {todo.notes}</p>
// //               )}
// //             </div>
// //             <div className="card-action">
// //               <button className="btn waves-effect waves-light" onClick={() => toggleEdit(index)}>
// //                 {todo.isEditing ? 'Save' : 'Edit'}
// //               </button>
// //               <button className="btn waves-effect waves-light red" onClick={() => handleTodoDelete(index)}>
// //                 Delete
// //               </button>
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default TodoPage;

// import React, { useState, useEffect, useContext } from 'react';
// import M from 'materialize-css';
// import { useNavigate } from 'react-router-dom';
// import { useEvents } from './EventsContext'; // Adjust this import to the correct path of your EventsContext

// const TodoPage = () => {
//   const [todos, setTodos] = useState([]);
//   const [newTodo, setNewTodo] = useState({
//     title: '',
//     deadline: '',
//     priority: 'Low',
//     notes: '',
//     isEditing: false,
//     duration: 1, // This is a new property representing the duration in hours
//   });
//   const navigate = useNavigate();
//   const { addEvent } = useEvents(); // Use the addEvent function from context

//     useEffect(() => {
//     // Initialize Select
//     const selects = M.FormSelect.init(document.querySelectorAll('select'));
//     // Initialize Datepicker
//     const datepickers = M.Datepicker.init(document.querySelectorAll('.datepicker'), {
//       format: 'yyyy-mm-dd',
//       onClose: () => {
//         // Update state when datepicker closes
//         const instance = M.Datepicker.getInstance(document.getElementById('deadline'));
//         if (instance.date) {
//           setNewTodo({ ...newTodo, deadline: instance.toString() });
//         }
//       },
//     });

//     // Cleanup function
//     return () => {
//       selects.forEach(select => select.destroy());
//       datepickers.forEach(datepicker => datepicker.destroy());
//     };
//   }, [newTodo]);

//   // Other handler functions remain unchanged

//   const goToCalendar = () => {
//     navigate('/calendar');
//   };

//     const handleTodoChange = (index, field, value) => {
//     const updatedTodos = todos.map((todo, i) =>
//       i === index ? { ...todo, [field]: value } : todo
//     );
//     setTodos(updatedTodos);
//   };

//   const toggleEdit = (index) => {
//     const updatedTodos = todos.map((todo, i) =>
//       i === index ? { ...todo, isEditing: !todo.isEditing } : todo
//     );
//     setTodos(updatedTodos);
//   };

//   const handleTodoDelete = (index) => {
//     const updatedTodos = [...todos];
//     updatedTodos.splice(index, 1);
//     setTodos(updatedTodos);
//   };

//   const handleTodoFormSubmit = (e) => {
//     e.preventDefault();
//     if (newTodo.title && newTodo.deadline) {
//       const todoToAdd = { ...newTodo, isEditing: false };
//       setTodos([...todos, todoToAdd]);
      
//       // Convert deadline string to Date object
//       const deadlineDate = new Date(todoToAdd.deadline);
//       // Calculate event start by subtracting the duration from the deadline
//       const eventStart = new Date(deadlineDate.getTime() - (todoToAdd.duration * 60 * 60 * 1000)); // assuming duration is in hours

//       // Add event to the events context
//       addEvent({
//         id: Date.now(), // Unique ID for the event, in a real app this could be more robust
//         title: todoToAdd.title,
//         start: eventStart,
//         end: deadlineDate,
//         allDay: false // or true depending on your requirements
//       });

//       // Reset form
//       setNewTodo({
//         title: '',
//         deadline: '',
//         priority: 'Low',
//         notes: '',
//         isEditing: false,
//         duration: 1, // Resetting duration as well
//       });
//     }
//   };

//   // ... Rest of the component (handleTodoChange, toggleEdit, handleTodoDelete)

//     return (
//     <div className="container">
//       <h1 className="header">Add Todo</h1>
//       <form onSubmit={handleTodoFormSubmit}>
//         {/* Form Fields */}
//         <div className="input-field">
//           <input
//             id="title"
//             type="text"
//             className="validate"
//             value={newTodo.title}
//             onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
//             required
//           />
//           <label htmlFor="title">Title</label>
//         </div>

//         <div className="input-field">
//           <input
//             id="duration"
//             type="number"
//             value={newTodo.duration}
//             onChange={(e) => setNewTodo({ ...newTodo, duration: e.target.value })}
//             required
//             min="1"
//           />
//           <label htmlFor="duration">Duration (hours)</label>
//         </div>

//         <div className="input-field">
//           <input
//             id="deadline"
//             type="text"
//             className="datepicker"
//             value={newTodo.deadline}
//             onChange={(e) => {}}
//             required
//           />
//           <label htmlFor="deadline">Deadline</label>
//         </div>

//         <div className="input-field">
//           <select
//             id="priority"
//             value={newTodo.priority}
//             onChange={(e) => setNewTodo({ ...newTodo, priority: e.target.value })}
//           >
//             <option value="Low">Low</option>
//             <option value="Medium">Medium</option>
//             <option value="High">High</option>
//           </select>
//           <label htmlFor="priority">Priority</label>
//         </div>

//         <div className="input-field">
//           <textarea
//             id="notes"
//             className="materialize-textarea"
//             value={newTodo.notes}
//             onChange={(e) => setNewTodo({ ...newTodo, notes: e.target.value })}
//           />
//           <label htmlFor="notes">Notes</label>
//         </div>

//         <button className="btn waves-effect waves-light" type="submit">Add Todo</button>

//       </form>
//       <button className="btn waves-effect waves-light" onClick={goToCalendar}>
//         Back to Calendar
//         </button>

//       {/* Todo List */}
//       <div className="section">
//         {todos.map((todo, index) => (
//           <div className="card" key={index}>
//             <div className="card-content">
//               {todo.isEditing ? (
//                 <div className="input-field">
//                   <input
//                     type="text"
//                     value={todo.title}
//                     onChange={(e) => handleTodoChange(index, 'title', e.target.value)}
//                   />
//                   <label className="active">Title</label>
//                 </div>
//               ) : (
//                 <span className="card-title">{todo.title}</span>
//               )}

//               {todo.isEditing ? (
//                 <div className="input-field">
//                   <input
//                     type="text"
//                     className="datepicker"
//                     value={todo.deadline}
//                     onChange={(e) => {}}
//                   />
//                   <label className="active">Deadline</label>
//                 </div>
//               ) : (
//                 <p>Deadline: {todo.deadline}</p>
//               )}

//               {todo.isEditing ? (
//                 <div className="input-field">
//                   <select
//                     value={todo.priority}
//                     onChange={(e) => handleTodoChange(index, 'priority', e.target.value)}
//                   >
//                     <option value="Low">Low</option>
//                     <option value="Medium">Medium</option>
//                     <option value="High">High</option>
//                   </select>
//                   <label>Priority</label>
//                 </div>
//               ) : (
//                 <p>Priority: {todo.priority}</p>
//               )}

//               {todo.isEditing ? (
//                 <div className="input-field">
//                   <textarea
//                     className="materialize-textarea"
//                     value={todo.notes}
//                     onChange={(e) => handleTodoChange(index, 'notes', e.target.value)}
//                   />
//                   <label className="active">Notes</label>
//                 </div>
//               ) : (
//                 <p>Notes: {todo.notes}</p>
//               )}
//             </div>
//             <div className="card-action">
//               <button className="btn waves-effect waves-light" onClick={() => toggleEdit(index)}>
//                 {todo.isEditing ? 'Save' : 'Edit'}
//               </button>
//               <button className="btn waves-effect waves-light red" onClick={() => handleTodoDelete(index)}>
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TodoPage;
import React, { useState, useEffect } from 'react';
import M from 'materialize-css';
import { useNavigate } from 'react-router-dom';
import { useEvents } from './EventsContext'; // Adjust this import to the correct path of your EventsContext

const TodoPage = () => {
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos')) || []);
  const [newTodo, setNewTodo] = useState({
    title: '',
    deadline: '',
    priority: 'Low',
    notes: '',
    duration: 1, // Default duration in hours
  });
  const navigate = useNavigate();
  const { addEvent } = useEvents();

  useEffect(() => {
    // Initialize MaterializeCSS Select and Datepicker
    const selects = document.querySelectorAll('select');
    M.FormSelect.init(selects);

    const datepickers = document.querySelectorAll('.datepicker');
    M.Datepicker.init(datepickers, {
      format: 'yyyy-mm-dd',
      onClose: () => {
        const instance = M.Datepicker.getInstance(document.getElementById('deadline'));
        if (instance.date) {
          setNewTodo({ ...newTodo, deadline: instance.toString() });
        }
      },
    });

    return () => {
      // Cleanup function to destroy initialized MaterializeCSS elements
      selects.forEach((select) => {
        const instance = M.FormSelect.getInstance(select);
        if (instance) instance.destroy();
      });

      datepickers.forEach((datepicker) => {
        const instance = M.Datepicker.getInstance(datepicker);
        if (instance) instance.destroy();
      });
    };
  }, [newTodo]);

  useEffect(() => {
    // Save todos to localStorage when todos state changes
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

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

  const handleTodoFormSubmit = (e) => {
    e.preventDefault();
    if (newTodo.title && newTodo.deadline) {
      const todoToAdd = { ...newTodo, isEditing: false };
      setTodos([...todos, todoToAdd]);

      // Convert deadline string to Date object
      const deadlineDate = new Date(todoToAdd.deadline);
      // Calculate event start by subtracting the duration from the deadline
      const eventStart = new Date(deadlineDate.getTime() - (todoToAdd.duration * 60 * 60 * 1000));

      // Add event to the events context
      addEvent({
        id: Date.now(),
        title: todoToAdd.title,
        start: eventStart,
        end: deadlineDate,
        allDay: false,
      });

      // Reset form to the initial state
      setNewTodo({
        title: '',
        deadline: '',
        priority: 'Low',
        notes: '',
        duration: 1,
      });
    }
  };

  const goToCalendar = () => {
    navigate('/calendar');
  };

  return (
    <div className="container">
      <h1 className="header">Add Todo</h1>
      <form onSubmit={handleTodoFormSubmit}>
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

        <div className="input-field">
          <input
            id="duration"
            type="number"
            value={newTodo.duration}
            onChange={(e) => setNewTodo({ ...newTodo, duration: e.target.value })}
            required
            min="1"
          />
          <label htmlFor="duration">Duration (hours)</label>
        </div>

        <button className="btn waves-effect waves-light" type="submit">Add Todo</button>
      </form>

      <button className="btn waves-effect waves-light" onClick={goToCalendar}>Go to Calendar</button>

      <ul className="collection with-header">
        <li className="collection-header"><h4>Todos</h4></li>
        {todos.map((todo, index) => (
          <li key={index} className="collection-item">
            <div>
              {todo.isEditing ? (
                <div>
                  <input
                    type="text"
                    value={todo.title}
                    onChange={(e) => handleTodoChange(index, 'title', e.target.value)}
                  />
                  <input
                    type="text"
                    className="datepicker"
                    value={todo.deadline}
                    onChange={(e) => handleTodoChange(index, 'deadline', e.target.value)}
                  />
                </div>
              ) : (
                <div>
                  <span>{todo.title}</span> | <span>{todo.deadline}</span>
                </div>
              )}
              <a href="#!" className="secondary-content">
                <button className="btn waves-effect waves-light" onClick={() => toggleEdit(index)}>edit</button>
                <button className="btn waves-effect waves-light" onClick={() => handleTodoDelete(index)}>delete</button>
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoPage;
