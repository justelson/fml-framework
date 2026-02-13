import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle({ theme, setTheme }) {
    const toggleTheme = () => {
        setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };

    return (
        <button
            className="tab-button theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
        >
            {theme === 'dark' ? <Moon size={16} /> : <Sun size={16} />}
            <span>{theme === 'dark' ? 'DARK' : 'LIGHT'}</span>
        </button>
    );
}
