import React from 'react';
import UserTile from './userTile';
import UserActions from '../actions/userActions';
import UserStore from '../stores/userStore';


export default class App extends React.Component {
    constructor() {
      super();
      this.state = {updateIndex: -1,
                    savedUsers: UserStore.all(),
                    userInfo: {"firstName": "", "lastName": "", "address": ""}};
    }

    componentDidMount = () => {
      this.userStoreListener = UserStore.addListener(this.onUserChange);
    }

    componentWillUnmount = () => {
      this.userStoreListener.remove();
    }

    onUserChange = () => {
      this.setState({savedUsers: UserStore.all()});
    }

    updateInformation = (event) => {
      event.preventDefault();
      let updateProfile = this.state.userInfo;
      updateProfile[event.target.id] = event.target.value;
      this.setState({userInfo: updateProfile});
    }

    resetInputs = () => {
      document.getElementById("form-type").innerHTML = "Create New User";
      document.getElementById("update-info").style.display = "none";
    }

    addUser = (event) => {
      event.preventDefault();
      this.state.updateIndex > -1 ? UserActions.updateUser(this.state.updateIndex, this.state.userInfo) : UserActions.addUser(this.state.userInfo);
      this.setState({userInfo: {"firstName": "", "lastName": "", "address": ""}, updateIndex: -1});
      this.resetInputs();
    }

    updateUser = (index) => {
      event.preventDefault();
      this.setState({updateIndex: index});
      document.getElementById("form-type").innerHTML = "Update Existing User with ID: " + index;
      document.getElementById("update-info").style.display = "flex";
      document.getElementById('user-id').innerHTML = "USER ID: " + index;
    }

    cancelUpdate = (event) => {
      event.preventDefault();
      this.setState({updateIndex: -1});
      this.resetInputs();
    }

    deleteUser = (event) => {
      event.preventDefault();
      UserActions.deleteUser(this.state.updateIndex);
      this.resetInputs();
    }

    render = () => {
      var that = this;
      let userList = this.state.savedUsers.map(function(profile, index){
          return <UserTile key={ index } profileData={ profile } userId={index} onClick={() => that.updateUser(index)}/>;
      })

      return (
        <div className="app">
          <div className="title-header">User Page</div>
              <div className="flex-container" id="form-type">Create New User</div>
              <form onSubmit={this.addUser}>
                <div className='user-input-form'>
                    <input type="text"
                        className="form-textbox"
                        value={this.state.userInfo["firstName"]}
                        onChange={this.updateInformation}
                        placeholder=" First Name: James"
                        id="firstName"/>
                    <br/>

                    <br/>
                    <input type="text"
                        className="form-textbox"
                        value={this.state.userInfo["lastName"]}
                        onChange={this.updateInformation}
                        placeholder=" Last Name: Hatch"
                        id="lastName"/>
                    <br/>

                    <br/>
                </div>
                <div className="flex-container">
                  <input type="text"
                    className="form-textbox address"
                    value={this.state.userInfo["address"]}
                    onChange={this.updateInformation}
                    placeholder=" Address: 1234 Example Lane, Arvada CO 80004"
                    id="address"/>
                </div>

                <div className="flex-container" id="update-info">
                  <div id="user-id">

                  </div>
                  <button onClick={this.deleteUser}>DELETE</button>
                  <button onClick={this.cancelUpdate}>CANCEL</button>
                </div>

                <input id="submit-profile"
                       type="submit"
                       value="Submit"/>
              </form>

          <div className="users-container">
            {userList}
          </div>
        </div>
      );
    }
}
