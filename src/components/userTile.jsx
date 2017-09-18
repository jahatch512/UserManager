import React from 'react';
import UserActions from '../actions/userActions';


export default class UserTile extends React.Component {
    constructor(props) {
      super(props);
      this.updateInfo = props.onClick;
      this.state = {profile: props.profileData,
                    userId: this.props.userId,
                    updateInfo: {"firstName": "", "lastName": "", "address": ""}};
    }

    componentWillReceiveProps (props) {
      this.setState({profile: props.profileData, id: this.props.userId});
    }

    onChange = (event) => {
      event.preventDefault();
      var updateProfile = this.state.updateInfo;
      updateProfile[event.target.id] = event.target.value;
      this.setState({updateInfo: updateProfile});
    }

    deleteUser = () => {
      UserActions.deleteUser(this.state.id);
    }


    render = () => {
      let profile = this.state.profile;
        return (
          <div className="user-container" onClick={this.updateInfo}>
            <div id="user-tile">
              <div className="profile-data">First: {profile.firstName}</div>
              <div className="profile-data">Last: {profile.lastName}</div>
              <div className="profile-data">Address: {profile.address}</div>
              <div className="profile-data">ID: {this.state.userId}</div>
            </div>
            <div className="update-overlay">UPDATE/DELETE</div>
          </div>
        );
    }
}
