import React, { useState } from "react";
import { useTodos } from "../hooks/useTodos";
import { Button } from "../components/Button";
import { Modal } from "../components/Modal";
import { TodoItem } from "../components/TodoItem";
import { TodoForm } from "../components/TodoForm";
import { FilterButtons } from "../components/FilterButtons";
import { Pagination } from "../components/Pagination";
import { SearchBar } from "../components/SearchBar";
import "../styles/TodoList.css";

const TodoApp = () => {
    const { 
        todos, 
        allTodos,
        addTodo, 
        updateTodo, 
        deleteTodo, 
        toggleComplete,
        // Search
        searchTerm,
        searchTodos,
        clearSearch,
        hasSearchResults,
        noSearchResults,
        // Filter
        filter,
        changeFilter,
        // Pagination
        currentPage,
        totalPages,
        goToPage,
        nextPage,
        prevPage,
    } = useTodos();
    
    const [editingId, setEditingId] = useState(null);
    const [showDialog, setShowDialog] = useState(false);

    const handleOpenCreate = () => {
        setEditingId(null);
        setShowDialog(true);
    };

    const handleEdit = (id) => {
        setEditingId(id);
        setShowDialog(true);
    };

    const handleSubmit = (title) => {
        if (editingId) {
        updateTodo(editingId, { title });
        } else {
        addTodo(title);
        }
        setShowDialog(false);
        setEditingId(null);
    };

    const getEditingTodoTitle = () => {
        if (!editingId) return "";
        const todo = allTodos.find(t => t.id === editingId);
        return todo ? todo.title : "";
    };

    return (
        <div className="todo-app-container">
        <div className="todo-card">
            {/* Header */}
            <div className="todo-header">
            <h1 className="todo-title">To-do List</h1>
            </div>

            {/* Search Bar */}
            <SearchBar
            searchTerm={searchTerm}
            onSearch={searchTodos}
            onClear={clearSearch}
            hasSearchResults={hasSearchResults}
            noSearchResults={noSearchResults}
            />

            {/* Filter Buttons */}
            <div className="filter-container" style={{
                display: 'flex', 
                alignItems: 'stretch', // Make children stretch to same height
                gap: '10px', 
                width: '100%'
            }}>
                <div style={{flex: 1}}>
                    <FilterButtons 
                        currentFilter={filter} 
                        onFilterChange={changeFilter}
                    />
                </div>
                <Button 
                    onClick={handleOpenCreate}
                    className="add-todo-btn"
                    style={{
                        flexShrink: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    + New
                </Button>
            </div>
            

            {/* Modal */}
            <Modal
            isOpen={showDialog}
            onClose={() => setShowDialog(false)}
            title={editingId ? "Edit To-do" : "Create New To-do"}
            >
            <TodoForm
                initialValue={getEditingTodoTitle()}
                onSubmit={handleSubmit}
                onCancel={() => setShowDialog(false)}
                isEditing={!!editingId}
            />
            </Modal>

            {/* Todo List */}
            <div className="todo-list-container">
            {todos.length === 0 ? (
                <div className="empty-state">
                <p className="empty-state-title">
                    {noSearchResults 
                    ? `No todos found matching "${searchTerm}"`
                    : filter === "completed" 
                    ? "No completed todos yet" 
                    : filter === "pending" 
                    ? "No pending todos" 
                    : "No todos yet"
                    }
                </p>
                <p className="empty-state-subtitle">
                    {(filter === "all" && !searchTerm) && "Add your first todo to get started!"}
                </p>
                </div>
            ) : (
                <ul className="todo-list">
                {todos.map((todo) => (
                    <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggleComplete={toggleComplete}
                    onEdit={handleEdit}
                    onDelete={deleteTodo}
                    />
                ))}
                </ul>
            )}
            </div>

            <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={goToPage}
            onPrev={prevPage}
            onNext={nextPage}
            />
            </div>
        </div>
    );
    };

export default TodoApp;