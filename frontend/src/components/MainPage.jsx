
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  return <p className="text-muted">Но вы можете перейти <a href="/login">назад лол</a></p>;
};

export default MainPage;