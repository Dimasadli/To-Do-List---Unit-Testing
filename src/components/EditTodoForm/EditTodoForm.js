import React, { useState } from "react";

function EditTodoForm({ editTodo, task }) {
  const [value, setValue] = useState(task.task);

  const handleSubmit = (e) => {
    e.preventDefault();
    editTodo(value, task.id);
  };
  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="todo-input"
        placeholder="Update task"
        data-testid="edit-form-input"
      />
      <button type="submit" className="todo-btn" data-testid="edit-form-submit">
        Add Task
      </button>
    </form>
  );
}

export default EditTodoForm;
