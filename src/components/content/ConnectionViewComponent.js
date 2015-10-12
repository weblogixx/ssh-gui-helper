/*global clipboard*/
'use strict';

import React from 'react/addons';
import ConnectionActions from 'actions/ConnectionActions';

require('styles/content/ConnectionView.css');

class ConnectionViewComponent extends React.Component {

  /**
   * Update field data for change events
   * @param  {String} field The field to update
   * @param  {Event} e The event object
   */
  handleChange(field, e) {

    ConnectionActions.edit({
      field: field,
      value: e.target.value,
      connection: this.props.item
    });
  }

  copyCommand() {
    clipboard.writeText(this.props.item.connection.getCommand('darwin'));
  }

  render() {

    // Skip if no connection is given!
    if(!this.props.item.connection) {
      return (
        <div className="connectionview-component">
          <header className="cf">
            <span className="connection-icon">!</span>
            <h3>
              No connections available!
              <small>Please add a connection by using the "+"-Button</small>
            </h3>
          </header>
        </div>
      );
    }

    let connection = this.props.item.connection;

    return (
      <div className="connectionview-component">

        <header className="cf">
          <span className="connection-icon">{connection.connectionName.substring(0, 1)}</span>
          <h3>
            <input
              type="text"
              value={connection.connectionName}
              readOnly={!this.props.editMode}
              onChange={this.handleChange.bind(this, 'connectionName')}
            />
          </h3>
        </header>

        <table className="connection-data">
          <tbody>
            <tr>
              <th>Username</th>
              <td>
                <input
                  type="text"
                  value={connection.userName}
                  readOnly={!this.props.editMode}
                  onChange={this.handleChange.bind(this, 'userName')}
                />
              </td>
            </tr>
            <tr>
              <th>Hostname</th>
              <td>
                <input
                  type="text"
                  value={connection.hostName}
                  readOnly={!this.props.editMode}
                  onChange={this.handleChange.bind(this, 'hostName')}
                />
              </td>
            </tr>
            <tr>
              <th>Port</th>
              <td>
                <input
                  type="number"
                  value={connection.port}
                  readOnly={!this.props.editMode}
                  onChange={this.handleChange.bind(this, 'port')}
                />
              </td>
            </tr>
            <tr>
              <th>Connection String:</th>
              <td onClick={this.copyCommand.bind(this)}>{connection.getCommand('darwin')}</td>
            </tr>
          </tbody>
        </table>

      </div>
    );
  }
}

// Uncomment properties you need
ConnectionViewComponent.propTypes = {
  item: React.PropTypes.object,
  editMode: React.PropTypes.bool
};
ConnectionViewComponent.defaultProps = {
  item: {},
  editMode: false
};


export default ConnectionViewComponent;
