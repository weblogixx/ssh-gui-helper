'use strict';

import ConnectionActions from 'actions/ConnectionActions';
import ConnectionStore from 'stores/ConnectionStore';

import React from 'react/addons';
import ListItem from './ConnectionListItemComponent';

require('styles/sidebar/ConnectionList.css');

class ConnectionListComponent extends React.Component {

  activateItem(item) {
    ConnectionActions.activate(item);
  }

  render() {
    return (
      <ul className="connectionlist-component">
        {this.props.items.map((item, index) => {
          if(!item.visible) {
            return;
          }
          return <ListItem
            key={index}
            connection={item}
            onActivate={this.activateItem.bind(this)}
          />
        })}
      </ul>
    );
  }
}

// Uncomment properties you need
ConnectionListComponent.propTypes = {
  items: React.PropTypes.array
};
ConnectionListComponent.defaultProps = {
  items: []
};

export default ConnectionListComponent;
