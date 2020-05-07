import Head from 'next/head'
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
import router from 'next/router';
//import '../../../assets/styles.less'
//import PublicLayout from './layout_public';
import ProjectLayout from './layout_project';

export default class MyLayout extends React.Component{

    render(){
        var path = this.props.path;
        console.log(path);
        var isPublic = false;
        return(<ProjectLayout path={path}> {this.props.children} </ProjectLayout>);
        // if (path){
        //     isPublic = (path.indexOf('public') >=0)?true:false;
        // }

        // if (isPublic){
        //     return( <PublicLayout path={path}>{this.props.children}</PublicLayout>);
        // }else{
        //     return(<ProjectLayout path={path}> {this.props.children} </ProjectLayout>);
        // }
    }
}
