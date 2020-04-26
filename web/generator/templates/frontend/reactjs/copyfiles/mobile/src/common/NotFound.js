import React from 'react';
import {
  Container,
  Group,
} from 'amazeui-touch';

export default class extends React.Component {
  render() {
    return (
      <Container {...this.props}>
        <Group>
          <h2>Oops, Not Found.</h2>
        </Group>
      </Container>
    );
  }
}
