import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Header from './components/Header';
import { AppProvider } from './context/AppContext';
import ProductPage from './pages/ProductsPage';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<ProductPage />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
