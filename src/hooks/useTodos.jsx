import { useState, useEffect } from "react";
import axios from "axios";

export const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all"); // Add filter state here

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos?_limit=30")
      .then((res) => setTodos(res.data))
      .catch((err) => console.error(err));
  }, []);

  const addTodo = (title) => {
    if (!title.trim()) return;
    const newTodo = {
      id: Date.now(),
      title,
      completed: false,
    };
    setTodos(prev => [newTodo, ...prev]);
  };

  const updateTodo = (id, updates) => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(prev => prev.map(t => 
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  // Search function - real-time
  const searchTodos = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  // Clear search
  const clearSearch = () => {
    setSearchTerm("");
  };

  // Filter change function
  const changeFilter = (newFilter) => {
    setFilter(newFilter);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  // Filter todos based on search term AND regular filter
  const getFilteredTodos = () => {
    let filtered = todos;
    
    // Apply search filter
    if (searchTerm.trim()) {
      filtered = filtered.filter(todo =>
        todo.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply status filter - now 'filter' is defined
    if (filter === "completed") {
      filtered = filtered.filter(todo => todo.completed);
    } else if (filter === "pending") {
      filtered = filtered.filter(todo => !todo.completed);
    }
    
    return filtered;
  };

  const filteredTodos = getFilteredTodos();

  // Pagination calculations based on filtered todos
  const totalPages = Math.ceil(filteredTodos.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTodos = filteredTodos.slice(startIndex, endIndex);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return {
    todos: currentTodos,
    allTodos: todos,
    filteredTodos: filteredTodos,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleComplete,
    // Search functions
    searchTerm,
    searchTodos,
    clearSearch,
    // Filter functions
    filter,
    changeFilter,
    // Pagination
    currentPage,
    totalPages,
    itemsPerPage,
    goToPage,
    nextPage,
    prevPage,
    setItemsPerPage,
    totalItems: filteredTodos.length,
    hasSearchResults: searchTerm.trim() !== "" && filteredTodos.length > 0,
    noSearchResults: searchTerm.trim() !== "" && filteredTodos.length === 0,
  };
};