import { Layout as AntLayout, Button } from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../app/stores/auth-store';
import { routes } from '../../routes';

export const Layout = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const startCreatreFlow = () => {
    navigate(routes.purchase.create);
  };
  return (
    <AntLayout style={{ minHeight: '100vh' }}>
      <Header
        style={{
          background: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          marginBottom: '30px',
          gap: '20px'
        }}>
        <Button size="large" type="primary" onClick={startCreatreFlow}>
          Создать запись
        </Button>
        <Button size="large" onClick={() => logout()}>
          Выйти
        </Button>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div className="site-layout-content">
          <Outlet />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>2023</Footer>
    </AntLayout>
  );
};
