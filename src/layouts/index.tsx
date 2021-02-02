import styles from './index.less';
import { Layout, Menu } from 'antd';
import { Link } from 'umi';

const { Header, Content, Footer } = Layout;

function BasicLayout(props: any) {
  const location = props.location;
  const pathname = location.pathname;
  const arr = [
    { url: '/hero', tab: 'hero' },
    { url: '/item', tab: 'item' },
    { url: '/skill', tab: 'skill' },
  ];
  return (
    <Layout>
      <Header>
        <div className={styles.logo}>detail</div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[pathname]}
          style={{ lineHeight: '64px' }}
        >
          {arr.map((item) => {
            return (
              <Menu.Item key={item.url}>
                <Link to={item.url}>{item.tab}</Link>
              </Menu.Item>
            );
          })}
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
          {props.children}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Created by xiaohuoni</Footer>
    </Layout>
  );
}

export default BasicLayout;
