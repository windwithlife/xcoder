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
import {
  Container,
  TabBar,
  NavBar,
  View,
} from 'amazeui-touch';
import 'amazeui-touch/dist/amazeui.touch.min.css';
import './styles/App.less';

const backNav = {
  icon: 'left-nav',
};


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    let children = this.props.children;
    return (
      <View>
        <NavBar
          title={children.props.title || '优测Uquiz'}
          leftNav={children.props.withoutBackBtn ? [] : [backNav]}
          rightNav={children.props.rightNav || []}
          onAction={this.backHandler.bind(this)}
          amStyle="primary"
          style={{backgroundColor: '#7E56E6'}}
        />
        <Container
          transition={this.state.transition || 'sfr'}
        >
          {React.cloneElement(children, {
            key: this.props.location.pathname,
            ...this.props
          })}
        </Container>
      </View>
    );
  }

  backHandler() {
    this.setState({transition: 'rfr'}, () => {
      history.back();
      setTimeout(() => {
        this.setState({transition: ''});
      }, 600);
    });
  }
}

export default App;
