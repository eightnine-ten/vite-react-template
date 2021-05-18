import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Route, Switch } from 'react-router-dom';
import { menuList } from './mock';
import style from './style.module.scss';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const LayoutPage = (props) => {
  const { routers, history } = props;

  const onHandleChooseMenuItem = (data) => {
    console.log(data);
    history.push(data.key);
  };

  return (
    <Layout className={style.container}>
      <Header className="header">
        <div className="logo" />
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            onClick={onHandleChooseMenuItem}
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
          >
            {menuList.map((item) => (
              <SubMenu key={item.key} title={item.title}>
                {item.children.map((child) => (
                  <Menu.Item key={child.path}>{child.title}</Menu.Item>
                ))}
              </SubMenu>
            ))}
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className={style.content}
          >
            <Switch>
              {routers.map((m, idx) => (
                <Route path={m.path} key={idx} component={m.component} />
              ))}
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default LayoutPage;
