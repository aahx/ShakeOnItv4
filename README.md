<a name="readme-top"></a>

[![LinkedIn][linkedin-shield]][linkedin-url]

<br />
<div align="center">
  <img src="/images/handshake.png" alt="Logo" height="150">

  <h3 align="center"> Shake On It!</h3>

  <p align="center">
    "Shake On It" is a dynamic web app that allows you to easily create and track challenges with connected friends!
    <br />
    <a href="#demo">See Demo Below »</a>
    <br />
    <br />
    <a href="https://shakeonit.herokuapp.com/" target="_blank" rel="noopener noreferrer" >Live Link</a>
    ·
    <a href="https://github.com/sparklingwaterlemon/ShakeOnItv4/issues">Report Bug</a>
    ·
    <a href="https://github.com/sparklingwaterlemon/ShakeOnItv4/issues">Request Feature</a>
  </p>
</div>


<br />
<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#demo">
        Demo
      </a>
      <ul>
        <li>
          <a href="#built-with">
            Built With
          </a>
        </li>
      </ul>
    </li>
    <li>
      <a href="#schema-overview">
        Schema Overview
      </a>
    </li>
    <li>
      <a href="#error-handling-and-user-experience">
        Error Handling and User Experience
      </a>
    </li>
    <li>
      <a href="#route-map">
        Route Map
      </a>
    </li>
    <li>
      <a href="#contact">
        Contact
      </a>
    </li>
  </ol>
</details>




<!-- DEMO -->
## Demo

https://user-images.githubusercontent.com/105463926/229617420-98b02f59-0a6a-458f-aea5-8b33665db3d2.mp4

<p align="right">(<a href="#readme-top">back to top</a>)</p>


#### Built With

* MongoDB
* Express.js
* Node.js
* Mongoose
* Method-Override
* Passport Google OAuth
* Express-Sessions

<p align="right">(<a href="#readme-top">back to top</a>)</p>




<!-- Schema Overview -->
## Schema Overview

#### Users Schema

The Users schema represents a user in the system, and contains the following fields:

< insert user schema code >
< Code for Users schema can be found in models/users.js >

The Users schema also contains a pre-save hook that generates a unique gamertag for the user and checks for any existing gamertags. Here's a truncated version of the code:

< insert pre-save hook >
< Code for Users pre-save hook can be found in models/users.js >

<p align="right">(<a href="#readme-top">back to top</a>)</p>


#### FriendsList Schema

The FriendsList schema represents a list of friends for a user, and contains the following fields:

< insert friendsList >
< Code for FriendsList schema can be found in models/friends.js >

The gamertag field was previously included in the friendsSchema object, but was causing issues when a user changed their gamertag. In some cases, a friend's old gamertag would still appear in the FriendsList for other users. To avoid this, the gamertag field was removed from the friendsSchema object.

To display a friend's gamertag, the Users schema is queried by the friend's _id, and the gamertag is retrieved from the resulting User object.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


#### Games Schema

The Games schema represents a game between two users and includes fields for the name of the game, a description, a wager, an expiration date, references to the players as User objects, the status of the game, and the username of the winner. This schema provides a flexible structure for tracking user-defined games and their outcomes.

< insert games schema >
< Code for Games schema can be found in models/games.js >

<p align="right">(<a href="#readme-top">back to top</a>)</p>




<!-- Error Handling and User Experience -->
## Error Handling and User Experience

One of the key focuses of this project is to provide a smooth and hassle-free experience for its users by gracefully handling edge cases and errors. The friend list feature is a good example of this, as the index and validate functions provided by this project are specifically designed to add, display, and validate a user's friend list.

The validate function checks whether the user is trying to add themselves to their friend list, whether the friend they are trying to add already exists in their friend list, and whether the gamertag they are trying to add is valid. By ensuring that the friend list remains accurate and free of errors, this function offers a reliable and user-friendly experience for adding friends.

Additionally, the index function is designed to gracefully handle situations where a user's friend list is empty. In such cases, the friendsGamertags parameter is set to null to provide a seamless user experience, even in cases where a user has not yet added any friends.

Another example of the project's commitment to user experience is the use of gamertags. When a user updates their gamertag, this information is consistently updated across all pending and accepted games, as well as in other friend lists and game forms. This ensures that the user's gamertag remains up-to-date and accurate across all aspects of the application.

< insert >
< Code for the Friends controller can be found in controllers/friends.js >

<p align="right">(<a href="#readme-top">back to top</a>)</p>




<!-- Route Map -->
## Route Map

1. Home Page
    - URL: localhost:3000 (GET)
    - Controller: controllers/index.js

<br />

2. Authentication
    - URL: localhost:3000/auth
    - Controller: routes/passport.js
    - Routes:
      - 3000/auth/google (GET)
      - 3000/auth/google/oauth2callback (GET)
      - 3000/auth/logout (GET)

<br />

3. Users' Landing Page
    - URL: localhost:3000/landing (GET)
    - Controller: controllers/landing.js

<br />

4. Users' Profile Page
    - URL: localhost:3000/profile (GET)
    - Controller: controllers/profile.js
    - Routes:
      - 3000/profile/checkgamertag (GET)
      - 3000/profile/updategamertag (PUT)

<br />

5. Users' Friends Page
    - URL: localhost:3000/friends (GET)
    - Controller: controllers/friends.js
    - Routes:
      - 3000/friends/addfriend (POST)

<br />

6. Users' Create Game Page
    - URL: localhsot:3000/creategame (GET)
    - Controller: controllers/createGame.js
    - Routes:
      - 3000/creategame/newgame (POST)

<br />

7. Users' Pending Game Page
    - URL: localhost:3000/pending (GET)
    - Controller: controllers/pendingGame.js
    - Routes:
      - 3000/pending/accept/:id (GET)
      - 3000/pending/decline/:id (GET)


<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTACT -->
## Contact

Michael Kim: michael.dev.kim@gmail.com

LinkedIn: <a href="https://www.linkedin.com/in/michaelkim3/" target="_blank"> https://www.linkedin.com/in/michaelkim3/ </a>

Project Link: [https://github.com/sparklingwaterlemon/ShakeOnItv4](https://github.com/sparklingwaterlemon/ShakeOnItv4)

Live Link: <a href="https://shakeonit.herokuapp.com/" target="_blank"> https://shakeonit.herokuapp.com/</a>

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/michaelkim3/
