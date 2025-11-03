import React, { useState } from "react";
import { Button } from "./Button";
import "../styles/TodoForm.css";

export const TodoForm = ({ 
  initialValue = "", 
  onSubmit, 
  onCancel, 
  isEditing = false 
}) => {
  const [title, setTitle] = useState(initialValue);

  const handleSubmit = () => {
    onSubmit(title);
    setTitle("");
  };

  return (
    <div>
      <input
        type="text"
        placeholder="What needs to be done?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="todo-input"
        onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
        autoFocus
      />
      <div className="form-actions">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button 
          variant="primary" 
          onClick={handleSubmit}
          disabled={!title.trim()}
        >
          {isEditing ? "Save Changes" : "Add Todo"}
        </Button>
      </div>
    </div>
  );
};