import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MyReactNativeForm } from './assets/components/Login.jsx';
import { MainPage } from './assets/components/MainPage.jsx';
import PageNotFound from './assets/components/PageNotFound.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='login' element={<MyReactNativeForm />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
