import React from 'react';
import UserTile from './userTile';
import UserActions from '../actions/userActions';
import UserStore from '../stores/userStore';


export default class App extends React.Component {
    constructor() {
        super();

        this.state = {savedUsers: UserStore.all(),
                      userInfo: {"firstName": "", "lastName": "", "address": ""}};
    }

    componentDidMount = () => {
      this.userStoreListener = UserStore.addListener(this.onUserChange);
    }

    onUserChange = () => {
      console.log("onUserChange");

      this.setState({savedUsers: UserStore.all()});
    }

    onChange = (event) => {
      event.preventDefault();
      var updateProfile = this.state.userInfo;
      updateProfile[event.target.id] = event.target.value;
      this.setState({userInfo: updateProfile});
    }

    addUser = (event) => {
      console.log("called addUser");

      event.preventDefault();
      UserActions.addUser(this.state.userInfo);
    }

    render = () => {
      var userList = this.state.savedUsers.map(function(profile, index){
          return <UserTile key={ index } profileData={ profile }/>;
      })

      return (
        <div className="app">
          <div className="title-header">User Page</div>
              <form onSubmit={this.addUser}>
                <div className='user-input-form'>
                    <input type="text"
                        className="form-textbox"
                        value={this.state.userInfo["firstName"]}
                        onChange={this.onChange}
                        placeholder=" Start Date: 10-10-2017"
                        id="firstName"/>
                    <br/>

                    <br/>
                    <input type="text"
                        className="form-textbox"
                        value={this.state.userInfo["lastName"]}
                        onChange={this.onChange}
                        placeholder=" End Date: 12-12-2017"
                        id="lastName"/>
                    <br/>

                    <br/>
                    <input type="text"
                        className="form-textbox"
                        value={this.state.userInfo["address"]}
                        onChange={this.onChange}
                        placeholder=" Rate: 123.45"
                        id="address"/>
                </div>


                <input className="submit-profile"
                       type="submit"
                       value="Submit New User"/>

              </form>
          <div className="users-container">
            {userList}
          </div>
        </div>
      );
    }
}
