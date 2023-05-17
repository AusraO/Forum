import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { UsersProvider } from './contexts/UsersContext';
import { NewUsersProvider } from './contexts/NewUsersContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <NewUsersProvider>
 <UsersProvider>
    <App />
    </UsersProvider>
    </NewUsersProvider>
);