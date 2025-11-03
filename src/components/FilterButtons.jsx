import React from "react";
import { Button } from "./Button";
import "../styles/FilterButtons.css";

export const FilterButtons = ({ currentFilter, onFilterChange }) => {
  const filters = [
    { key: "all", label: "All", variant: "primary", outlineVariant: "outline" },
    { key: "pending", label: "Pending", variant: "pending", outlineVariant: "outline-pending" },
    { key: "completed", label: "Completed", variant: "completed", outlineVariant: "outline-completed" },
  ];

  return (
    <div className="filter-buttons-container">
      {filters.map((filter) => (
        <Button
          key={filter.key}
          variant={currentFilter === filter.key ? filter.variant : filter.outlineVariant}
          onClick={() => onFilterChange(filter.key)}
          className="filter-button"
        >
          {filter.label}
        </Button>
      ))}
    </div>
  );
};