import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './pages/LoginForm.jsx';
import PageNotFound from './pages/PageNotFound.jsx';
import ChannelsPage from './pages/ChannelsPage.jsx';
import RequireAuth from './pages/RequireAuth.jsx';
import SignUpForm from './pages/SignUpForm.jsx';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <RequireAuth>
              <ChannelsPage />
            </RequireAuth>
          }
        />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/signup' element={<SignUpForm />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
