import React, { Component } from 'react';
import { diff } from 'deep-diff';

export const playerEl = document.createElement('div');
/*
 * TODO: this is a hack because we require a height on our player
 * element at initialization, but we really shouldn't.
 */
document.getElementById('root').appendChild(playerEl);
playerEl.className = 'Player';
export const api = window.claraplayer(playerEl);
api.sceneIO.fetchAndUse('96b232fa-21fe-49a8-b275-0fe45f0af35b');
window.api = api; // testing purposes

export class ApiProvider extends Component {
  state = { payload: {} };

  constructor(props) {
    super(props);
    api._store.subscribe(this.handleChange);
  }

  handleChange = () => {
    const { getInnerProps } = this.props;
    const { payload } = this.state;
    const nextPayload = getInnerProps(api);
    if (diff(payload, nextPayload)) {
      this.setState({ payload: nextPayload });
    }
  };

  render() {
    const { payload } = this.state;
    const { children } = this.props;
    return children(payload);
  }
}
