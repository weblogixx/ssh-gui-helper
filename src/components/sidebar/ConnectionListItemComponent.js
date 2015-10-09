'use strict';

import React from 'react/addons';
import classnames from 'classnames';

require('styles/sidebar/ConnectionListItem.css');

class ConnectionListItemComponent extends React.Component {
  render() {

    let classes = classnames(
      'connectionlistitem-component',
      { active: this.props.connection.active }
    );

    return (
      <li className={classes} onClick={this.props.onActivate.bind(this, this.props.connection)}>
        {this.props.connection.connection.connectionName}
      </li>
    );
  }
}

ConnectionListItemComponent.propTypes = {
  onActivate: React.PropTypes.func
};
ConnectionListItemComponent.defaultProps = {
  onActivate: () => {}
};

export default ConnectionListItemComponent;
