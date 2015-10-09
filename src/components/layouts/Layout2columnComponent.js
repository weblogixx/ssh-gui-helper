'use strict';

import React from 'react/addons';

require('styles/layouts/Layout2column.css');

class Layout2columnComponent extends React.Component {
  render() {
    return (
      <div className="layout2column-component">
        <div className="content-left">
          {this.props.children[0]}
        </div>
        <div className="content-right">
          {this.props.children[1]}
        </div>
      </div>
    );
  }
}

export default Layout2columnComponent;
