
import './App.css';
import Header from './components/UI/Header';
import { useContext } from 'react';
import UsersContext from './contexts/UsersContext';
import { Route, Routes } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Login from './components/Page/Login';
import Register from './components/Page/Register';

import About from './components/Page/About';
import Activity from './components/Page/Activity';
import Footer from './components/UI/Footer';
import Home from './components/Page/Home';
import NewPost from './components/Page/NewPost';
import PostPage from './components/Page/PostPage';


const App = () => {

  const { currentUser } = useContext(UsersContext);
  return (
    <>
    <Header/>

    <Routes>
        <Route index element={<About />} />
        <Route path="/activity" element={
          currentUser ?
            <Activity /> :
            <Navigate to="/login" />
        } />
       
         <Route path="/posts/newPost" element={
          currentUser ?
          <NewPost /> :
          <Navigate to="/login" />
        } />
         <Route path="/posts/:postId" element={<PostPage />} />
        
        <Route path="/register" element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='*' element={<><h1> Nothing to see here ! </h1><img src='https://cdn.retrojunk.com/article-images/607_244b0c93b2.jpg' alt='shy duck'/></>} />
      </Routes>

      <Footer/>
    </>
  );
}

export default App;
