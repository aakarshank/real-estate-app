import './App.css';
import Input from './Input';
import {Route, Routes, Navigate, useNavigate} from 'react-router-dom';
import ProtectedDatabaseRoute from './ProtectedDatabaseRoute';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './Nav';
import Home from './Home';
import Auth from './Auth';
import SignUp from './SignUp';
function App() {
  return (
    <div className="App">
      <NavBar />
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path ='*' element={<Navigate to='/' />} />
        <Route path ='/db' element={<ProtectedDatabaseRoute />} />
        <Route path='/signIn' element={<SignUp />} />
  `</Routes>
    </div>
  );
}

export default App;
