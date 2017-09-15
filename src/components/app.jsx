import React from 'react';
import UserTile from './userTile';


export default class App extends React.Component {
    constructor() {
        super();

        this.state = {};
    }



    render = () => {
        var userList = data.map(function(profile, index){
            return <UserTile key={ index } profileData={ profile }/>;
        })

        return (
          <div className="app">

          </div>
        );
    }
}
