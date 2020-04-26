import Head from 'next/head'
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
import router from 'next/router';
import '../../../asserts/styles.less'

export default class MyLayout extends React.Component{

    state = {
        current:this.props.path
    }

    handleClick = (e) => {
    console.log('click ', e);
    var path = e.key;
    router.push({pathname:path});

}


    render(){
        return(
  <div>
    <Head>
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta charSet='utf-8' />
      <link rel='stylesheet' href='/_next/static/style.css' />
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
          <Menu.Item key="/xmodule/list">公共模块管理</Menu.Item>
          <Menu.Item key="/project/list">项目管理</Menu.Item>
          <Menu.Item key="3">配置</Menu.Item>
        </Menu>
      </Header>
      <Layout>
        <Sider width={200} style={{ background: '#fff' }}>
          <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%' }}
              onClick={this.handleClick}
              >
            <SubMenu key="sub1" title={<span><Icon type="user" />项目</span>}>
              <Menu.Item key="/project/list">项目管理</Menu.Item>
              <Menu.Item key="/pxchannel/list">频道管理</Menu.Item>
              <Menu.Item key="/pxmodule/list">模块管理</Menu.Item>
              <Menu.Item key="/pxtable/list">表管理</Menu.Item>
              <Menu.Item key="/pxpage/list">页面管理</Menu.Item>
              <Menu.Item key="/pxinterface/list">接口管理</Menu.Item>

            </SubMenu>
            <SubMenu key="sub2" title={<span><Icon type="laptop" />字典数据维护</span>}>

              <Menu.Item key="/dictionary/list">字典表</Menu.Item>
              <Menu.Item key="/category/list">字典表分类</Menu.Item>

            </SubMenu>

            <SubMenu key="sub4" title={<span><Icon type="notification" />基本配置</span>}>
                <Menu.Item key="16">主题管理</Menu.Item>
                <Menu.Item key="18">其它</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '12px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
)}
}
