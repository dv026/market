import { useAuthStore } from './app/stores/auth-store';
import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages/login-page/login-page';
import { HomePage } from './pages/home/home-page';
import { CreateItem } from './pages/create-item/create-item';
import { Layout } from './features/layout/layout';
import { routes } from './routes';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// const socket = io('http://localhost:3000');

function App() {
  const { user } = useAuthStore((state) => state);

  return (
    <div>
      {user ? (
        <>
          <Routes>
            <Route path={routes.root} element={<Layout />}>
              <Route path={routes.root} element={<HomePage />} />
            </Route>

            <Route path={routes.purchase.create} element={<CreateItem />} />
            <Route path="/purchase/:id/edit" element={<CreateItem />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
