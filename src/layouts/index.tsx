import styles from './index.less';
import { Layout, Menu, Breadcrumb } from 'antd';
import ProjectLayout from './projectLayout';
import { Link } from 'umi';

const { Header, Content, Footer } = Layout;

function BasicLayout(props: any) {
  const {
    location: { pathname, query, search },
    children,
    history,
  } = props;
  const breadcrumbNameMap = {
    '/hero': '英雄',
    ['/hero/detail?id=' + query.id]: '详情',
    '/item': '装备',
    '/skill': '技能',
  };
  console.log(breadcrumbNameMap);
  const arr = [
    { url: '/hero', tab: 'hero' },
    { url: '/item', tab: 'item' },
    { url: '/skill', tab: 'skill' },
    { url: '/projectInfo', tab: 'project' },
  ];
  if (pathname === '/') {
    history.replace('/hero');
  }
  const pathSnippets = (pathname + search).split('/').filter((i) => i);
  console.log(props);
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    console.log(url, pathSnippets);
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{breadcrumbNameMap[url]}</Link>
      </Breadcrumb.Item>
    );
  });
  const breadcrumbItems = [
    <Breadcrumb.Item key="home">
      <Link to="/">首页</Link>
    </Breadcrumb.Item>,
  ].concat(extraBreadcrumbItems);
  if (pathname === '/projectInfo') {
    return <ProjectLayout>{children}</ProjectLayout>;
  } else {
    return (
      <Layout>
        <Header>
          <div className={styles.logo}>detail</div>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={[pathname]}
            selectedKeys={[pathname]}
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
          <Breadcrumb separator="~">{breadcrumbItems}</Breadcrumb>
          <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Created by xiaohuoni</Footer>
      </Layout>
    );
  }
}

export default BasicLayout;
