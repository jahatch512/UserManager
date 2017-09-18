import React from 'react';


export default class UserTile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {profile: props.profileData};
    }


    render = () => {
      let profile = this.state.profile;
        return (
          <div className="user-tile">
            <div className="profile-data">First: {profile.first}</div>
            <div className="profile-data">Last: {profile.last}</div>
            <div className="profile-data">Address: {profile.address}</div>
          </div>
        );
    }
}
