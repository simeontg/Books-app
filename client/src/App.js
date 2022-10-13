import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar/Navbar';
import Catalog from './pages/Catalog';
import Footer from './components/Footer/Footer';
import Detail from './pages/Detail';
import Create from './pages/Create';
import { AuthProvider } from './context/AuthContext';
import Logout from './components/Logout/Logout';
import PrivateRoutes from './components/PrivateRoutes/PrivateRoutes';

function App() {
  return (
    <AuthProvider>
    <Navbar />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route element={<PrivateRoutes />} >
          <Route path='/logout' element={<Logout />} />
          <Route path='/create' element={<Create />} />
      </Route>
      <Route path='/catalog' element={<Catalog />} />
      <Route path='/catalog/:bookId' element={<Detail />} />
    </Routes>
    </AuthProvider>
    
  );
}

export default App;
