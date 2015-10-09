'use strict';

import classnames from 'classnames';

import React from 'react/addons';
import ConnectionActions from 'actions/ConnectionActions';

require('styles/content/Footer.css');

class FooterComponent extends React.Component {

  handleClick() {
    ConnectionActions.add();
  }

  handleEdit() {
    ConnectionActions.toggleEdit();
  }

  handleDelete() {
    if(!confirm('Do you really want to delete this connection?')) {
      return;
    }
    ConnectionActions.remove();
  }

  render() {

    let editContent = this.props.editMode ? 'Ready' : 'Edit';
    let editClass = classnames(
      'btn-edit',
      { active: this.props.editMode },
      { hidden: !this.props.allowEdit }
    );

    let deleteClass = classnames(
      'btn-delete',
      { hidden: !this.props.allowEdit || !this.props.editMode }
    );

    return (
      <footer className="footer-component cf">
        <button className="btn-add icon-btn" onClick={this.handleClick.bind(this)}><span>+</span></button>
        <button className={editClass} onClick={this.handleEdit.bind(this)}><span>{editContent}</span></button>
        <button className={deleteClass} onClick={this.handleDelete.bind(this)}><span>Delete</span></button>
      </footer>
    );
  }
}

// Uncomment properties you need
FooterComponent.propTypes = {
  allowEdit: React.PropTypes.bool,
  editMode: React.PropTypes.bool
};
FooterComponent.defaultProps = {
  allowEdit: false,
  editMode: false
};

export default FooterComponent;
