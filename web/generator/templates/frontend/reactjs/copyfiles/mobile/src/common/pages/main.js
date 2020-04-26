import React from 'react';
import {
  render,
} from 'react-dom';
import {
  Router,
  Route,
  Link,
  IndexRoute,
  hashHistory,
  withRouter,
} from 'react-router';
import { NavBar, Icon } from 'antd-mobile';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    let children = this.props.children;
    return (

        <div>

          <NavBar leftContent="返回" mode="light" onLeftClick={() => {console.log('onLeftClick');this.props.history.goBack();}}
                  rightContent={[<Icon key="0" type="search" />, <Icon key="1" type="ellipsis" />]}
              >NavBar</NavBar>


          {React.cloneElement(children, {
            key: this.props.location.pathname,
            ...this.props
          })}
        </div>
    );
  }


}

export default App;
