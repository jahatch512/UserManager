import { Store } from 'flux/utils';
import Dispatcher from '../dispatcher/dispatcher';
import UserConstants from '../constants/userConstants';

let UserStore = new Store(Dispatcher);
let _users = [];

UserStore.all = function() {
  return _users;
};

let addUser = function (user) {
  console.log("called addUser in store");
  _users.push(user);
  UserStore.__emitChange();
};

UserStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case UserConstants.ADD_USER:
      addUser(payload.user);
      break;
    case UserConstants.UPDATE_USER:
      // updateUser(payload.user);
      break;
    case UserConstants.DELETE_USER:
      // deleteUser(payload.user);
      break;
  }

};

export default UserStore;
