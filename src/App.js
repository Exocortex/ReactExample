import React, { Component, Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import { api, playerEl, ApiProvider } from './api';

class ActiveCamera extends Component {
  getProps = api => ({
    camera: api.player.getCamera(),
    cameras: api.scene.filter({ type: 'Camera' }),
  });

  renderCameras(cameras) {
    if (!cameras || cameras.length === 0) {
      return null;
    }

    return (
      <ol>
        {cameras.map(camera => (
          <li className="Camera" onClick={() => api.player.setCamera(camera)}>
            {camera}
          </li>
        ))}
      </ol>
    );
  }

  render() {
    return (
      <ApiProvider getInnerProps={this.getProps}>
        {({ cameras, camera }) => (
          <div className="Cameras">
            <div>Active Camera: {camera}</div>
            {this.renderCameras(cameras)}
          </div>
        )}
      </ApiProvider>
    );
  }
}

class App extends Component {
  setPlayer = node => {
    if (node == null) {
      return;
    }
    node.appendChild(playerEl);
  };

  render() {
    return (
      <Fragment>
        <div className="App" ref={this.setPlayer} />
        <ActiveCamera />
      </Fragment>
    );
  }
}

export default App;
