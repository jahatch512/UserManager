# User Manager

[User Manager][pages]

[pages]: https://jahatch512.github.io/UserManager/

This is a simple application used to manage an index of users. To add a user, simply type in the relevant information in the input fields and hit "Submit". To update or delete a user, click on their profile: when the profile is selected, you will see the corresponding User ID appear along with buttons for "cancel" and "delete". When the user is selected, you can input the new data and click "Submit" once again. 

## Design & Implementation

Below are some of the implementation details and code snippets from some of the more challenging, creative, and unique aspects of the application. This ReadMe is designed specifically as an explanation to my thought process during this coding challenge. A readme created to explain the features of the site would look more like this:
[OkCoFounder by J. Hatch][okcofounder]
[okcofounder]: https://github.com/jahatch512/OkCoFounder

### React, Webpack, other tools

I decided to use the front end framework that I am most comfortable with and truly excited about. Writing vanilla React can be tedious so I made use of auxiliary packages such as Webpack and Babel. I wrote code as JSX, a JavaScript/XML hybrid which is transpiled into JS by Babel.  Webpack manages and flattens dependencies, creating a single minified file with all the code necessary to display the page. I wanted to write code in ES6 but not all browser implementations are ready for the new standard. Thus, there are some Babel plugins I used to help with this. babel-preset-es2015 converts ES6 code into ES5, while babel-plugin-transform-class-properties allows me to export a class (or instance of a class) which contains arrow functions. An example of this would be my Actions class:

```javascript
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
```

### Component Design

My favorite part about React is the modular nature of the components. I knew I would be repeating similar "tiles" to represent different user profiles, so I was able to use a .map function to loop through the stored users and generate a UserTile component for each inside my parent render function:

```javascript
render = () => {
  var that = this;
  let userList = this.state.savedUsers.map(function(profile, index){
      return <UserTile key={ index } profileData={ profile } userId={index} onClick={() => that.updateUser(index)}/>;
  })

  return (
    <div className="app">
      <div className="title-header">User Page</div>
          <div className="flex-container" id="form-type">Create New User</div>    
      <div className="users-container">
        {userList}
      </div>
    </div>
  );
}
```
You can also see in the above code that I made use of the props/state features that React provides in order to pass necessary data (profileData) from the parent component into the child. In keeping with React best practices, only my parent component interacts with the store. Each UserTile is just a dumby component that does not need to interact with the store, but rather receives its display information from its parent component. I also passed the updateUser function as props for a very specific reason: whenever I call "updateUser", I want to generate a form in the parent component. However, I also need to know the index of the component that was clicked, and this information is not available to the parent upon render. Thus, I pass the function as props with the dynamically generated "index" supplied as an argument. By nesting this inside an arrow function, I do not need to bind "this" as arrow functions bind context at the time of declaration.

UserTile is a stateless functional component. This means that it is not concerned with any internal "state". Rather, it is purely a "display" component. This is a good example of the modular nature of React: this component doesn't do much but it keeps the structure, hierarchy, and logical organization of the HTML clean and readable. It is quick and easy to see what the UserTile represents and how it fits into the parent component:

```javascript
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
```
### The Flux Pattern: Action > Dispatcher > Store > Component

The Flux architecture pattern was designed to create a singular, structured flow of data through the application. In this way, it is easy to determine where along the loop an error might have occurred. As I was writing my application, I would often put a debugger at each step (Client Action, Dispatcher, Store, etc.) to determine where/how the data flow was being compromised. It is also standard practice to use constants rather than strings when passing actions through the dispatcher to improve error messaging readability.

Both the Dispatcher and the Store must be singleton instances to ensure there are no data collisions between multiple instances. You can see that in both files I define the class and then export a singleton instance of it to be used by other parts of the application. Rather than define a new Store class, I can simply create a basic Flux store and add any necessary custom methods. In the store, the #all method is public and can be used by other React components while the other methods are not exposed and can only be used within userStore.js.

### Mobile Friendly Design

If you play around with the size of the viewing window, you will notice some amount of mobile responsiveness. I accomplished this primarily using flex box, media queries, and some handy margin work. The app re-sizes to keep the tiles centered and a scroll bar allows the user to see all the tiles even when the window size is very small.
