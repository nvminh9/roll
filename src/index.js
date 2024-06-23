import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '~/App';
import reportWebVitals from './reportWebVitals';
import GlobalStyles from '~/components/GlobalStyles';
import GridSystem from '~/components/GridSystem';
import { ThemeProvider } from '~/ThemeContext';
import { AuthProvider } from './context/AuthProvider';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <GridSystem>
            <GlobalStyles>
                <ThemeProvider>
                    <Router>
                        <AuthProvider>
                            <Routes>
                                <Route path="/*" element={<App />} />
                            </Routes>
                        </AuthProvider>
                    </Router>
                </ThemeProvider>
            </GlobalStyles>
        </GridSystem>
    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
