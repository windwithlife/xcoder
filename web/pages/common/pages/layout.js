import Head from 'next/head'
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider, Footer } = Layout;
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
  SettingOutlined,
} from '@ant-design/icons';

import router from 'next/router';
import { inject, observer } from 'mobx-react';

@inject("menusStore")
@observer
export default class MyLayout extends React.Component {

  state = {
    current: this.props.path
  }
  Store = () => {
    return this.props.menusStore;
  }
  handleClick = (e) => {
    event.stopPropagation();
    //console.log('click ', e);
    let menuId = e.key;
    let menuObj = this.Store().findPagePathById(menuId);
    //console.log("Current MenuItem:");
    //console.log(menuObj);
    router.push(menuObj.url);
  }
  buildHeaderMenu(dataSource) {
    return (
      dataSource.map((menu, index) => {
        return (<Menu.Item key={menu.id}>{menu.name}</Menu.Item>)
      }));
  }
  buildSidebarMenu = (dataSource) => {
    return (
      dataSource.map((menu, index) => {
        if (menu.childrenList) {
          return (
            <SubMenu key={menu.id} title={
              <span>
                <AppstoreOutlined />
                <span>{menu.name}</span>
              </span>
            }>
              {this.buildSidebarMenu(menu.childrenList)}
            </SubMenu>
          )
        } else {
        return (<Menu.Item key={menu.id} icon={<SettingOutlined />} >{menu.name}</Menu.Item>)
        }
      })
    );
  }
  componentDidMount() {

  }

  render() {
    let that = this;
    let channelNmae = "config";
    let path = this.props.path;
    let pathArray = path.split('/');
    let homePath = "/home";
    let moduleName = pathArray[1]; let modulePath = "/" + moduleName + "/home";
    let currentPageName = pathArray[2];
    let headerMenus = this.Store().findHeadrMenuItems("default").childrenList;
    let sidebarMenus = this.Store().findSiderMenuItemsByPath(path).childrenList;
    return (
      <div>
        <Head>
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <meta charSet='utf-8' />
        </Head>


        <Layout>
          <style jsx>{`
        #components-layout-demo-top-side-2 .logo {
          width: 120px;
          height: 31px;
          background: #333;
          border-radius: 6px;
          margin: 16px 28px 16px 0;
          float: left;
        }
      `}</style>

          <Header className="header">
            <div className="logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['2']}
              style={{ lineHeight: '64px' }}
              onClick={this.handleClick}
            >
              {that.buildHeaderMenu(headerMenus)}
            </Menu>
          </Header>
          <Content style={{ padding: '0 10px' }}>
            {/* <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item><a href={homePath} > Home</a></Breadcrumb.Item>
              <Breadcrumb.Item><a href={modulePath} > {moduleName}</a></Breadcrumb.Item>
              <Breadcrumb.Item>{currentPageName}</Breadcrumb.Item>
            </Breadcrumb> */}
            <Layout>
              <Sider width={200} style={{ background: '#fff' }}>
                <Menu
                  onClick={this.handleClick}
                  style={{ height: '100%' }}
                  defaultSelectedKeys={['1']}
                  defaultOpenKeys={['sub1']}
                  mode="inline"
                >
                  {/*调用上面的递归方法*/}
                  {this.buildSidebarMenu(sidebarMenus)}
                </Menu>
              </Sider>

              <Content style={{ background: '#fff', padding: 10, margin: '0px 10px', minHeight: 620 }}>
                {this.props.children}
              </Content>

            </Layout>
          </Content >
          <Footer  theme="dark" style={{ textAlign: 'center', background:'#eee' }}>XCODER ©2020 Created by X Team</Footer>
        </Layout>
      </div>
    )
  }
}
