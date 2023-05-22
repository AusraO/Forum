import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { UsersProvider } from './contexts/UsersContext';
import { NewUsersProvider } from './contexts/NewUsersContext';
import { PostsProvider } from './contexts/PostsContext';
import { BrowserRouter } from 'react-router-dom';
import {RepliesProvider} from './contexts/RepliesContext';
import { AddRepliesProvider } from './contexts/AddReplyContext';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <AddRepliesProvider>
    <RepliesProvider>
    <BrowserRouter>
    <PostsProvider>
    <NewUsersProvider>
 <UsersProvider>
    <App />
    </UsersProvider>
    </NewUsersProvider>
    </PostsProvider>
    </BrowserRouter>
    </RepliesProvider>
    </AddRepliesProvider>
 
);