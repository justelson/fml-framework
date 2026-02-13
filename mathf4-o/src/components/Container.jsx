import React from 'react';

/**
 * A reusable container component for layout sections.
 */
export default function Container({ children, className = '', title, fullWidth = false, style = {}, ...props }) {
    return (
        <div
            className={`panel ${className}`}
            style={{
                ...(fullWidth ? { width: '100%', maxWidth: 'none' } : {}),
                ...style
            }}
            {...props}
        >
            {title && (
                <h3 className="section-title" style={{
                    marginBottom: '1rem',
                    fontSize: '1.1rem',
                    color: 'var(--text-primary)',
                    borderBottom: '1px solid var(--border)',
                    paddingBottom: '0.5rem'
                }}>
                    {title}
                </h3>
            )}
            {children}
        </div>
    );
}
