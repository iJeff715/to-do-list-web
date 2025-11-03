import React from "react";
import { Button } from "./Button";
import "../styles/SearchBar.css";

export const SearchBar = ({ searchTerm, onSearch, onClear }) => {
    const handleChange = (e) => {
        const value = e.target.value;
        onSearch(value);
    };

    const handleClear = () => {
        onClear();
    };

    return (
        <div className="search-container">
        <div className="search-input-group">
            <input
            type="text"
            placeholder="Search to-dos..."
            value={searchTerm}
            onChange={handleChange}
            className="search-input"
            />
            {searchTerm && (
            <Button
                type="button"
                variant="text"
                onClick={handleClear}
                className="clear-search-btn"
                title="Clear search"
            >
                ✕
            </Button>
            )}
        </div>
        </div>
    );
    };