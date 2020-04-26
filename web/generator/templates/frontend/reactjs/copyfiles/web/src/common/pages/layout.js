import Head from 'next/head'
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
import router from 'next/router';
import '../../../asserts/styles.less'
import XLayout from './layout_base';
import PLayout from './layout_project';

export default class MyLayout extends React.Component{

    state = {
        //current:this.props.path
    }



    render(){
        var path = this.props.path;
        var isProjectChannel = false;
        if (path){
            isProjectChannel = (path.indexOf('project') >=0)||(path.indexOf('px') >=0)?true:false;
        }

        if (isProjectChannel){
            return( <PLayout path={path}>{this.props.children}</PLayout>);
        }else{
            return(<XLayout path={path}> {this.props.children} </XLayout>);
        }
    }
}
