import React from 'react';

/**
 * A reusable component for displaying label-value pairs.
 */
export default function Property({ label, value, icon, className = '' }) {
    return (
        <div className={`property-item ${className}`} style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.5rem 0',
            borderBottom: '1px solid var(--line)'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {icon && <span style={{ color: 'var(--text-secondary)', display: 'flex' }}>{icon}</span>}
                <span style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>{label}</span>
            </div>
            <div style={{ fontWeight: '500', color: 'var(--text)' }}>
                {value}
            </div>
        </div>
    );
}
