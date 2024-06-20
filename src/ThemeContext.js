import { useState, createContext } from 'react';

const ThemeContext = createContext();

function ThemeProvider({ children }) {
    let initTheme = localStorage.getItem('darkMode') === 'enabled' ? 'light' : 'dark';
    const [theme, setTheme] = useState(initTheme);
    //
    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };
    //
    if (theme === 'dark') {
        document.body.classList.remove('lightmode');
        document.body.classList.add('darkmode');
        localStorage.setItem('darkMode', 'enabled');
    } else {
        document.body.classList.remove('darkmode');
        document.body.classList.add('lightmode');
        localStorage.setItem('darkMode', null);
    }
    //
    const value = {
        theme,
        toggleTheme,
    };

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export { ThemeContext, ThemeProvider };
