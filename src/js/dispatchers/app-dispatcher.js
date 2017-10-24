import { Dispatcher } from 'flux';

const AppDispatcher = new Dispatcher();

AppDispatcher.handleViewAction = function handleViewAction(action) {
  this.dispatch({
    source: 'VIEW_ACTION',
    action
  });
};

export default AppDispatcher;
