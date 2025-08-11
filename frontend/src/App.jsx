import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm.jsx';
import MainPage from './components/MainPage.jsx';
import PageNotFound from './components/PageNotFound.jsx';
import ChannelPage from './components/ChannelPage.jsx';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<ChannelPage />} />
        <Route path='login' element={<LoginForm />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
