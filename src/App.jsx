
import './App.css';
import Header from './components/UI/Header';

const App = () => {
  return (
    <>
    <Header/>
    {/* <Routes>
        <Route index element={<Home />} />
        <Route path="/dogs" element={
          currentUser ?
            <DogsPage /> :
            <Navigate to="/login" />
        } />
        <Route path="/addDog" element={
          currentUser ?
            <AddNewDog /> :
            <Navigate to="/login" />
        } />
        <Route path="/register" element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<h1>Aww dogs! You are lost! </h1>} />
      </Routes> */}
    </>
  );
}

export default App;
