/**
 * Created by zhangyq on 2015/9/15.
 */
import React from 'react';

import { TabBar } from 'antd-mobile';
import Home from './list.js';
import My from './detail.js';
import Auth from  '../common/components/api/auth.js';
const TabBarExample = React.createClass({
    getInitialState() {
        return {
            selectedTab: 'homeTab',
            hidden: false,
            userRole:null
        };
    },
    componentWillMount(){
        var that = this;
        Auth.getUserInfo(function(info){
            console.log(info);
            that.setState({userRole:'student'});
        })

    },
    renderContent(page) {


        let Component;
        switch (page){
            case 'homeTab':
                Component =  Home;

                break;
            case 'myTab':
                Component =  My;
                break;
            case 'relationTab':
                Component =  My;
                break;
            case 'serviceTab':
                Component =  My;
                break;
            default :
                break;
        }
        if (Component){
            return (<Component user={{name:"zhangyq"}} role="teacher" />);
        }else{
            return ( <div style={{ paddingTop: 60 }}>你已点击“{this.state.selectedTab}” tab， 但功能尚在开发中，Coming soon!</div>);
        }

    },
    render() {
        if (!this.state.userRole){
            return (<div>loading page...</div>);
        }
        return (
            <TabBar
                unselectedTintColor="#949494"
                tintColor="#33A3F4"
                barTintColor="white"
                hidden={this.state.hidden}
                >
                <TabBar.Item
                    title="首页"
                    key="home"
                    icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/UNQhIatjpNZHjVf.png' }}
                    selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/HLkBvJOKnmOfBPO.png' }}
                    selected={this.state.selectedTab === 'homeTab'}
                    onPress={() => {
            this.setState({
              selectedTab: 'homeTab',
            });
          }}
                    data-seed="logId"
                    >
                    {this.renderContent('homeTab')}
                </TabBar.Item>
                <TabBar.Item
                    icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/UNQhIatjpNZHjVf.png' }}
                    selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/HLkBvJOKnmOfBPO.png' }}
                    title="服务"
                    key="口碑"
                    badge={1}
                    selected={this.state.selectedTab === 'serviceTab'}
                    onPress={() => {
            this.setState({
              selectedTab: 'serviceTab',
            });
          }}
                    data-seed="logId1"
                    >
                    {this.renderContent('serviceTab')}
                </TabBar.Item>
                <TabBar.Item
                    icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/EljxLrJEShWZObW.png' }}
                    selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/LWNaMdwAFSmYBFw.png' }}
                    title="好友"
                    key="朋友"
                    selected={this.state.selectedTab === 'relationTab'}
                    onPress={() => {
            this.setState({
              selectedTab: 'relationTab',
            });
          }}
                    >
                    {this.renderContent('relationTab')}
                </TabBar.Item>
                <TabBar.Item
                    icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/YWpPVCVOnJoCYhs.png' }}
                    selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/WadBBxOIZtDzsgP.png' }}
                    title="我"
                    key="我的"
                    selected={this.state.selectedTab === 'myTab'}
                    onPress={() => {
            this.setState({
              selectedTab: 'myTab',
            });
          }}
                    >
                    {this.renderContent('myTab')}
                </TabBar.Item>
            </TabBar>
        );
    }
});
export default TabBarExample;
