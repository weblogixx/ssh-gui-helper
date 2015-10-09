import alt from 'components/Dispatcher';

class ConnectionActions {

  add() {
    this.dispatch();
  }

  edit(data) {
    this.dispatch(data);
  }

  remove() {
    this.dispatch();
  }

  toggleEdit() {
    this.dispatch();
  }

  activate(item) {
    this.dispatch(item);
  }

  search(value) {
    this.dispatch(value);
  }
}

export default alt.createActions(ConnectionActions);
