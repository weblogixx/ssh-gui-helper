/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

// Uncomment the following lines to use the react test utilities
// import React from 'react/addons';
// const TestUtils = React.addons.TestUtils;
import createComponent from 'helpers/shallowRenderHelper';

import ConnectionListComponent from 'components/sidebar/ConnectionListComponent.js';

describe('ConnectionListComponent', () => {
    let component;

    beforeEach(() => {
      component = createComponent(ConnectionListComponent);
    });

    it('should have its component name as default className', () => {
      expect(component._store.props.className).to.equal('connectionlist-component');
    });
});
