require('normalize.css');
require('styles/App.css');

import React from 'react/addons';
import ConnectionStore from 'stores/ConnectionStore';

// Get required components
import Layout from './layouts/Layout2columnComponent';
import Search from './sidebar/SearchComponent';
import ConnectionList from './sidebar/ConnectionListComponent';
import ConnectionView from './content/ConnectionViewComponent';
import ConnectionFooter from './content/FooterComponent';

class AppComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = ConnectionStore.getState();
  }

  componentDidMount() {
    ConnectionStore.listen(this.onChange.bind(this));
  }

  componentWillUnmount() {
    ConnectionStore.unlisten(this.onChange.bind(this));
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    return (
      <Layout>
        <div>
          <Search />
          <ConnectionList items={this.state.connections} />
        </div>
        <div>
          <ConnectionView item={ConnectionStore.getActiveConnection()} editMode={this.state.editMode} />
          <ConnectionFooter editMode={this.state.editMode} allowEdit={this.state.connections.length > 0} />
        </div>
      </Layout>
    );
  }
}

export default AppComponent;
