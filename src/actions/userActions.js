import Dispatcher from '../dispatcher/dispatcher';
import UserConstants from '../constants/userConstants';

class Actions {
    addUser = (userInfo) => {
      console.log("about to dispatch from actions");
      Dispatcher.dispatch({actionType: UserConstants.ADD_USER, user: userInfo});

    }

    updateUser = (newInfo) => {
      let x = 5;
    }

    deleteUser = (userId) => {

    }
};

export default new Actions();
