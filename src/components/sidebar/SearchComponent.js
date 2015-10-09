'use strict';

import React from 'react/addons';
import ConnectionActions from 'actions/ConnectionActions';

require('styles/sidebar/Search.css');

class SearchComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      query: ''
    }
  }

  handleSearch(e) {
    let val = e.target.value;
    ConnectionActions.search(val);
  }

  render() {
    return (
      <div className="search-component">
        <input type="search" placeholder="Suchen" onChange={this.handleSearch.bind(this)} />
      </div>
    );
  }
}

// Uncomment properties you need
// SearchComponent.propTypes = {};
// SearchComponent.defaultProps = {};

export default SearchComponent;
