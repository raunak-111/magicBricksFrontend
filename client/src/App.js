import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Layout from './components/layout/Layout';
import PrivateRoute from './components/common/PrivateRoute';
import AgentRoute from './components/common/AgentRoute';

// Import pages (to be created later)
import HomePage from './pages/HomePage';
import PropertyListPage from './pages/PropertyListPage';
import PropertyDetailPage from './pages/PropertyDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import FavoritesPage from './pages/FavoritesPage';
import AddPropertyPage from './pages/AddPropertyPage';
import EditPropertyPage from './pages/EditPropertyPage';
import MyPropertiesPage from './pages/MyPropertiesPage';
import AgentsPage from './pages/AgentsPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';

// Import axios config
import './utils/api';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Public Routes */}
            <Route index element={<HomePage />} />
            <Route path="properties" element={<PropertyListPage />} />
            <Route path="properties/:id" element={<PropertyDetailPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="agents" element={<AgentsPage />} />
            <Route path="contact" element={<ContactPage />} />
            
            {/* Private Routes */}
            <Route element={<PrivateRoute />}>
              <Route path="profile" element={<ProfilePage />} />
              <Route path="favorites" element={<FavoritesPage />} />
            </Route>
            
            {/* Agent/Admin Routes */}
            <Route element={<AgentRoute />}>
              <Route path="add-property" element={<AddPropertyPage />} />
              <Route path="edit-property/:id" element={<EditPropertyPage />} />
              <Route path="my-properties" element={<MyPropertiesPage />} />
            </Route>
            
            {/* 404 - Not Found */}
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
