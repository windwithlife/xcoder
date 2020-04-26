/**
 * 用于列表上拉分页的loading
 */
import React from 'react';
import {
  Loader,
} from 'amazeui-touch';

export default class extends React.Component {
  static defaultProps = {
    done: false, // 是否已经到最后一页
  };

  render() {
    let {done} = this.props, loading;
    if(done) {
      loading = <div style={styles.loadingFinished}>- 已经看完 -</div>;
    } else {
      loading = <Loader amStyle="primary" rounded={true} style={styles.loading} />;
    }
    return loading;
  }
}

let styles = {
  loading: {
    margin: '10px auto',
    textAlign: 'center',
    display: 'block',
  },
  loadingFinished: {
    margin: '10px auto',
    textAlign: 'center',
    color: '#999',
    fontSize: 12,
  },
};
