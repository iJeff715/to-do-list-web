import React from "react";
import { Button } from "./Button";
import "../styles/Pagination.css";

export const Pagination = ({ 
    currentPage, 
    totalPages, 
    onPageChange, 
    onPrev, 
    onNext
    }) => {
    if (totalPages <= 1) return null;
    // Generate page numbers with ellipsis
    const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 2; // Show max 2 page numbers
    
    if (totalPages <= maxVisiblePages + 2) {
        // Show all pages if total pages are small
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
    } else {
        // Always show first page
        pages.push(1);
        
        // Calculate start and end of visible page range
        let start = Math.max(2, currentPage);
        let end = Math.min(totalPages - 1, currentPage + 1);
        
        // Adjust if we're at the beginning
        if (currentPage <= 2) {
            start = 2;
            end = 3;
        }
        // Adjust if we're at the end
        if (currentPage >= totalPages - 1) {
            start = totalPages - 2;
            end = totalPages - 1;
        }
        
        // Add ellipsis after first page if needed
        if (start > 2) {
            pages.push('...');
        }
        
        // Add middle pages
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        
        // Add ellipsis before last page if needed
        if (end < totalPages - 1) {
            pages.push('...');
        }
        
        // Always show last page
        pages.push(totalPages);
    }
    
    return pages;
};

    const pageNumbers = getPageNumbers();

    return (
        <div className="pagination-container">
        
        <div className="pagination-controls">
            <Button
            variant="outline"
            onClick={onPrev}
            disabled={currentPage === 1}
            className="pagination-btn prev-next-btn"
            >
            ←
            </Button>

            <div className="page-numbers">
            {pageNumbers.map((page, index) => (
                page === '...' ? (
                <span key={`ellipsis-${index}`} className="page-ellipsis">
                    ...
                </span>
                ) : (
                <Button
                    key={page}
                    variant={currentPage === page ? "primary" : "outline"}
                    onClick={() => onPageChange(page)}
                    className={`page-number-btn ${currentPage === page ? 'active' : ''}`}
                >
                    {page}
                </Button>
                )
            ))}
            </div>

            <Button
            variant="outline"
            onClick={onNext}
            disabled={currentPage === totalPages}
            className="pagination-btn prev-next-btn"
            >
            →
            </Button>
        </div>
        </div>
    );
};