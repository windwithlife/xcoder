import Head from 'next/head'
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from '@ant-design/icons';

import router from 'next/router';
import { inject, observer } from 'mobx-react';
//import '../../../assets/styles.less'

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
    console.log('click ', e);
    let menuId = e.key;
    //let menuObj = this.Store().findPathById(menuId);
    let menuObj = this.Store().findPagePathById(menuId);
    console.log("Current MenuItem:");
    console.log(menuObj);
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
            <SubMenu key={menu.id}  title={
              <span>
                <AppstoreOutlined />
                <span>{menu.name}</span>
              </span>
            }>
              {this.buildSidebarMenu(menu.childrenList)}
            </SubMenu>
          )
        } else {
          return (<Menu.Item key={menu.id}>{menu.name}</Menu.Item>)
        }
      })
    );
  }
  componentDidMount() {
    //this.props.tablesStore.queryAll();
    //this.props.projectsStore.queryAll();
  }

  render() {
    let that = this;
    let channelNmae = "config";
    let path = this.props.path;
    //let headerMenus = this.Store().dataObject.headerMenus;
    let headerMenus = this.Store().findHeadrMenuItems().childrenList;
    let sidebarMenus = this.Store().findSiderMenuItems(channelNmae).childrenList;
    return (
      <div>
        <Head>
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <meta charSet='utf-8' />
        </Head>


        <Layout>
          {/* <style jsx>{`
        #components-layout-demo-top-side-2 .logo {
          width: 120px;
          height: 31px;
          background: #333;
          border-radius: 6px;
          margin: 16px 28px 16px 0;
          float: left;
        }
      `}</style> */}

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
            <Layout style={{ padding: '0 24px 24px' }}>

              <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
                {this.props.children}
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </div>
    )
  }
}
