import { Link, Outlet } from 'react-router-dom';

export const MainPage = () => (
  <>
    <nav>
      <ul>
        <li>
          <Link to='/login'>Login</Link>
        </li>
      </ul>
    </nav>
    <Outlet />
  </>
);
