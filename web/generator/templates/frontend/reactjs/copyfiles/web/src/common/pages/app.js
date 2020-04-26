import React from 'react';
import {
  render,
} from 'react-dom';
import { Breadcrumb ,Card} from 'antd';

import {
  Router,
  Route,
  Link,
  IndexRoute,
  hashHistory,
  withRouter,
} from 'react-router';




class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    let children = this.props.children;
    let channel  = children.props.channel || 'home';
    let channelName  = children.props.channelName || '频道';
    let page     = children.props.page || 'home';
    let pageName     = children.props.pageName || '页面';
    let path = '/admin/' + channel + '/' ;
    return (
        <div>

          <Breadcrumb>
            <Breadcrumb.Item><a href="/"></a></Breadcrumb.Item>
            <Breadcrumb.Item><a href="/home/home">首页</a></Breadcrumb.Item>
            <Breadcrumb.Item><a href= {path} >{channelName}</a></Breadcrumb.Item>
            <Breadcrumb.Item>{pageName}</Breadcrumb.Item>
          </Breadcrumb>
          <Card title="内容页面" extra={<a href="#">More</a>} >
          {React.cloneElement(children, {
            key: this.props.location.pathname,
            ...this.props
          })}
          </Card>
       </div>
    );
  }

}

export default App;
