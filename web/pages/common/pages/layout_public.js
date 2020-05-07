import Head from 'next/head'
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
import router from 'next/router';
import '../../../asserts/styles.less'

export default class MyLayout extends React.Component {

  state = {
    current: this.props.path
  }

  handleClick = (e) => {
    event.stopPropagation();
    console.log('click ', e);
    var path = e.key;
    router.push({ pathname: path });

  }


  render() {
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

              <Menu.Item key="/public/dictionary/home">组件仓库</Menu.Item>
              <Menu.Item key="/xproject/list">项目管理</Menu.Item>
              <Menu.Item key="/projectrelease/home">应用管理</Menu.Item>
              <Menu.Item key="/xrelease/home">发布管理CI</Menu.Item>
              <Menu.Item key="/config/home">配置</Menu.Item>
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
                <SubMenu key="sub1" title={<span><Icon type="user" />公共组件</span>}>


                  <Menu.Item key="/xtable/list">常用数据表</Menu.Item>
                  <Menu.Item key="/xinterface/list">常用接口</Menu.Item>
                  <Menu.Item key="/xcomponent/list">常用界面组件</Menu.Item>
                  <Menu.Item key="/xpage/list">常用页面</Menu.Item>
                  <Menu.Item key="/xmodule/list">常用模块</Menu.Item>
                  <Menu.Item key="16">常用主题管理</Menu.Item>

                </SubMenu>
                <SubMenu key="sub2" title={<span><Icon type="laptop" />通用数据维护</span>}>
                  <Menu.Item key="/public/dictionary/home">字典表维护</Menu.Item>
                  <Menu.Item key="/public/category/home">可选择数据类型维护</Menu.Item>

                  <Menu.Item key="/public/category/list">支持开发语言维护</Menu.Item>

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
    )
  }
}
