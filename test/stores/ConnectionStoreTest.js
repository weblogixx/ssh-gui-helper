'use strict';

import alt from 'components/Dispatcher';
import { ConnectionStore } from 'stores//ConnectionStore';
import AltTestingUtils from 'alt/utils/AltTestingUtils';

describe('ConnectionStore', () => {

  let storeClass;

  // Clean up localStorage before each try
  beforeEach(() => {
    storeClass = AltTestingUtils.makeStoreTestable(alt, ConnectionStore);
  });
});
