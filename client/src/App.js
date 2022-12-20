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
import PrivateRoutes from './components/PrivateRoutes/PrivateRoutes';
import Edit from './pages/Edit';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import Search from './pages/Search';

function App() {
  return (
    <AuthProvider>
    <Navbar />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route element={<PrivateRoutes />} >
          <Route path='/profile' element={<Profile />} />
          <Route path='/create' element={<Create />} />
          <Route path='/edit/:bookId' element={<Edit />} />
      </Route>
      <Route path='/catalog' element={<Catalog />} />
      <Route path='/catalog/:bookId' element={<Detail />} />
      <Route path='/search/:searchTerm' element={<Search />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
    </AuthProvider>
    
  );
}

export default App;
