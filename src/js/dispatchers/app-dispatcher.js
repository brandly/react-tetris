import {Dispatcher} from 'flux';

var AppDispatcher = new Dispatcher();

AppDispatcher.handleViewAction = function (action) {
  this.dispatch({
    source: 'VIEW_ACTION',
    action: action
  });
};

export default AppDispatcher;
