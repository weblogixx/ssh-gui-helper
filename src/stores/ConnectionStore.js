/*global ipc*/
import alt from 'components/Dispatcher';
import ConnectionActions from 'actions/ConnectionActions';

//import { ConnectionStore as ConnectionStorage, SSHCommand, SSHConnection } from 'ssh-cli-helper';
import { SSHConnection } from 'ssh-cli-helper';

export class ConnectionStore {

  constructor() {

    // Setup data
    this.connections = [];
    this.editMode = false;

    // Get data from the main process if available
    ipc.on('store-data', (items) => {

      if(!items || !items.length) {
        return;
      }

      this.connections = items.map((item) => {

        var newItem = item;
        newItem.connection = SSHConnection.fromObject(item.connection);
        return newItem;
      });

      this.emitChange();
    });

    this.bindListeners({
      handleActivateConnection: ConnectionActions.ACTIVATE,
      handleAddConnection: ConnectionActions.ADD,
      handleEditConnection: ConnectionActions.EDIT,
      handleRemoveConnection: ConnectionActions.REMOVE,
      handleOpenConnection: ConnectionActions.OPEN,
      handleToggleEditConnection: ConnectionActions.TOGGLE_EDIT,
      handleSearchConnection: ConnectionActions.SEARCH
    });
  }

  /**
   * Add the given connection as the currently choosen one
   * @param  {Object} connection
   */
  handleActivateConnection(connection) {
    this.getInstance().setActiveConnection(connection);
    ipc.send('save-command', this.connections);
  }

  /**
   * Add a new connection
   */
  handleAddConnection() {

    let suffix = this.connections.length + 1;
    let connection = {
      visible: true,
      active: false,
      connection: new SSHConnection(`New Connection ${suffix}`, 'user', 'host')
    };

    this.connections.push(connection);

    // Set the connection as the active one
    this.getInstance().setActiveConnection(connection);

    // Make sure we always use edit mode after adding new connections
    this.editMode = true;

    ipc.send('save-command', this.connections);
  }

  /**
   * Edit a field in the connection
   * @param  {Object} data Object containing the field, value and connection
   */
  handleEditConnection(data) {

    let { field, value, connection } = data;
    let index = this.connections.indexOf(connection);
    if(index === -1) {
      return;
    }

    this.connections[index].connection[field] = value;
    ipc.send('save-command', this.connections);
  }

  /**
   * Removes the active connection
   */
  handleRemoveConnection() {

    let connection = this.getInstance().getActiveConnection();
    let index = this.connections.indexOf(connection);

    if(connection === -1) {
      return;
    }

    this.connections.splice(index, 1);
    ipc.send('save-command', this.connections);
  }

  /**
   * Handle editing the active connection
   */
  handleToggleEditConnection() {
    this.editMode = !this.editMode;
  }

  /**
   * Search all available connections for the given prefix
   * @param  {String} key
   */
  handleSearchConnection(key) {

    this.connections.map((item) => {
      item.visible = item.connection.connectionName.toLowerCase().startsWith(key.toLowerCase());
    });
  }

  /**
   * Open the active item
   */
  handleOpenConnection() {

    let connection = this.getInstance().getActiveConnection();
    if(connection) {
      ipc.send('open-command', connection);
    }
  }

  /**
   * Get the current active connection
   * @return {Object} Connection
   */
  static getActiveConnection() {

    let state = this.getState();
    let filter = state.connections.filter((item) => {
      return item.active === true;
    });
    return filter.length === 1 ? filter[0] : state.connections[0];
  }

  /**
   * Set the given connection as active
   * @param  {Object} connection
   */
  static setActiveConnection(connection) {

    let state = this.getState();
    let index = state.connections.indexOf(connection);

    // Skip if the connection could not be found
    if(index === -1) {
      return;
    }

    let newConnections = state.connections.map((item, i) => {
      item.active = index === i;
      return item;
    });

    this.state.connections = newConnections;
  }
}

export default alt.createStore(ConnectionStore, 'ConnectionStore');
