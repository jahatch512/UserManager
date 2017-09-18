import { Store } from 'flux/utils';
import Dispatcher from '../dispatcher/dispatcher';
import UserConstants from '../constants/userConstants';

let UserStore = new Store(Dispatcher);
let _users = [];

UserStore.all = function() {
  return _users;
};

let addUser = function (user) {
  _users.push(user);
  UserStore.__emitChange();
};

let deleteUser = function (userId) {
  _users.splice(userId, 1);
  UserStore.__emitChange();
};

let updateUser = function (data) {
  _users[data.userId] = data.userInfo;
  UserStore.__emitChange();
};

UserStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case UserConstants.ADD_USER:
      addUser(payload.user);
      break;
    case UserConstants.UPDATE_USER:
      updateUser(payload.data);
      break;
    case UserConstants.DELETE_USER:
      deleteUser(payload.userId);
      break;
  }

};

export default UserStore;
