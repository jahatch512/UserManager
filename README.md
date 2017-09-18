# User Manager

[User Manager][pages]

[pages]: https://jahatch512.github.io/UserManager/

## Design & Implementation

Below are some of the implementation details and code snippets from some of the more challenging, creative, and unique aspects of the application. This ReadMe is designed specifically as an explanation to my thought process during this coding challenge. A readme created to explain the features of the site would look more like this:
[OkCoFounder by J. Hatch][okcofounder]
[okcofounder]: https://github.com/jahatch512/OkCoFounder

### React, Webpack, other tools

I decided to use the front end framework that I am most comfortable with and truly excited about. Writing vanilla React can be tedious so I made use of auxiliary packages such as Webpack and Babel. I wrote code as JSX, a JavaScript/XML hybrid which is transpiled into JS by Babel. Webpack manages and flattens dependencies, creating a single minified file with all the code necessary to display the page. I wanted to write code in ES6 but not all browser implementations are ready for the new standard. Thus, there are some Babel plugins I used to help with this. babel-preset-es2015 converts ES6 code into ES5, while babel-plugin-transform-class-properties allows me to export a class (or instance of a class) which contains arrow functions. An example of this would be my Actions class:

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

Inside the UserTile component, I make

### Hard Coding of Input Data

I had some difficulty trying to determine the user interaction with the application. I made the rateParser and generateHex functions to parse the JSON input data. However, it was not clear to me if I should assume this JSON string would be provided from the server or from some kind of user interaction. In the end, I settled on the idea that the JSON input string would be internal company data about rate periods, and my goal would be to effectively display this to a visiting user.

In order to provide a better user experience, I created a tiled calendar layout with each rate period being a tile. The user can hover over a tile to see the rate associated with the date range. I also included the hex color value in order to quickly demonstrate the random variation of hex colors between rates.

### Mobile Friendly Design

If you play around with the size of the viewing window, you will notice some amount of mobile responsiveness. I accomplished this primarily using flex box and some handy margin work. The app re-sizes to keep the tiles centered and a scroll bar allows the user to see all the tiles even when the window size is very small.

### Previous Notes on Backend Algorithms

when it came to generating the hex color, some initial obstacles were apparent right away:
1. Ensure that the most minor change in price will create a visible change in color
 -- First, I completely reversed the initial rate for any even rates. That way, a rate of 123.45 would produce a VERY different result than a rate of 123.46 and I had a baseline of randomness.
 -- I then cubed each individual number before converting it to hex. This way, I further separated numbers that would normally be close, i.e a rate change from 2 to 3 became 8 to 27 in the hex generator.
2. Ensure that each rate produces a 6-digit hex code
 -- Smallest possible hex number (rate: 000.00) is only 5 numbers so add #0 to start of all final answers. To make this function more random and varied, I would also systematically randomize the first digit.
 -- My current method does an ok job of randomization/variation. However, it has not been thoroughly tested and there are certainly edge cases that most likely do not fit the criteria of the function.
    In order to improve the randomness I could add in more layers of manipulation (reverse the array once for every odd digit in the rate) but I would need to consider any increase in time complexity that this might add.

As for the calendar parsing, there were again some clear spots that presented a challenge:
1. As with many functions that involve iterating through an array of information, there was some weird behavior on the ends of the array.
 -- Without being able to know when a new rate “period” would start/end, the function must keep track of data from previous objects in the array (previousDate). In this way, each time a new rate was established, I had to complete the information for the old rate period and begin the information for the new rate period.
 -- After writing the code to deal with the last object in the input array, I realized I could re-factor. If the last date has a different rate, then the function will create a new rate period with all of the info except period-end. If the last date does not have a different rate, then the current rate period object would only need the period-end as well. Because of this, the only thing the function does differently for the final date/rate input object is to add the final period-end date to the rate period output object.
2. An important consideration of mine is always code efficiency, most directly measured by time and space complexity. I did analyze this code and tried to find areas to improve efficiency.
 -- I did some reading on the JS Array methods slice() and splice(). It seems that slice() is always O(n) while splice() can sometimes be more efficient depending on the memory allocation and caching techniques of the runtime engine being used. One improvement I would make in my code would be to change all slice() methods to splice() methods to take advantage of the potential increased efficiency.
 -- It appears that the time complexity of the rateParser() function is O(n^2) because the slice() method is nested within the outer array loop. My instinct is that because the slice value is constant (-2), there is a way I could eliminate the method altogether and get this application down to an O(n) runtime.
