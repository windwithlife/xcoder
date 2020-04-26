import Head from 'next/head'
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
import router from 'next/router';
import { inject, observer } from 'mobx-react';
import '../../../asserts/styles.less'

@inject('modulesStore') @inject('projectsStore') 
@observer
export default class MyLayout extends React.Component{

    state = {
        current:this.props.path
    }

    handleClick = (e) => {
      event.stopPropagation();
    console.log('click ', e);
    var path = e.key;
    router.push(path);


}
componentDidMount() {
  //this.props.tablesStore.queryAll();
  
  this.props.projectsStore.queryAll();
}

    render(){
        return(
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
          <Menu.Item key="/xproject/list">项目</Menu.Item>
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
            <SubMenu key="sub1" title={<span><Icon type="user" />你的项目</span>}>
              {this.props.projectsStore.dataObject.list.map(function(item, i) {
                    item.key = item.id;
                    let path = "/xproject/detail?id=" + item.id;
              return (<Menu.Item key={path} >{item.name}</Menu.Item>);
                })
                }
             

            </SubMenu>
           
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
)}
}
