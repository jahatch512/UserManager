import Dispatcher from '../dispatcher/dispatcher';
import UserConstants from '../constants/userConstants';

class Actions {
    updateUser = (userId, newInfo) => {
      Dispatcher.dispatch({actionType: UserConstants.UPDATE_USER, data: {userId: userId, userInfo: newInfo}});
    }

    addUser = (userInfo) => {
      Dispatcher.dispatch({actionType: UserConstants.ADD_USER, user: userInfo});

    }
    deleteUser = (userId) => {
      Dispatcher.dispatch({actionType: UserConstants.DELETE_USER, userId: userId});
    }
};

export default new Actions();
