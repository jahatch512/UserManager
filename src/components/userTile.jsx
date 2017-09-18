import React from 'react';
import UserActions from '../actions/userActions';


const UserTile = ({profileData, userId, onClick}) => {
    return (
      <div className="user-container" onClick={onClick}>
        <div id="user-tile">
          <div className="profile-data">First: {profileData.firstName}</div>
          <div className="profile-data">Last: {profileData.lastName}</div>
          <div className="profile-data">Address: {profileData.address}</div>
          <div className="profile-data">ID: {userId}</div>
        </div>
        <div className="update-overlay">UPDATE/DELETE</div>
      </div>
    );
}

export default UserTile;
