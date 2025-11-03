import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { Button } from "./Button";
import "../styles/TodoItem.css";

export const TodoItem = ({ 
  todo, 
  onToggleComplete, 
  onEdit, 
  onDelete 
}) => {
  return (
    <li className="todo-item">
      <div className="todo-content">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggleComplete(todo.id)}
          className="todo-checkbox"
          id={`todo-${todo.id}`}
        />
        <label 
          htmlFor={`todo-${todo.id}`} 
          className="custom-checkbox"
        />
        <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
          {todo.title}
        </span>
      </div>
      <div className="todo-actions">
        <Button 
          variant="text" 
          onClick={() => onEdit(todo.id)}
          className="edit-btn"
        >
          <FaEdit color="#6b7280" size={14} />
        </Button>
        <Button 
          variant="text" 
          onClick={() => onDelete(todo.id)}
          className="delete-btn"
        >
          <FaTrash color="#ef4444" size={14} />
        </Button>
      </div>
    </li>
  );
};