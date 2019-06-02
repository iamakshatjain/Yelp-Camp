# YelpCamp 🏕

![Logo](https://github.com/iamakshatjain/Yelp-Camp/blob/master/public/icons/ms-icon-310x310.png?raw=true)
>This is a campground and picnic spots finding site. 🏕
>The website if deployed to use aims at providing full-fledged information about any campground near you. 
>You would not need to spend hours to look for a place to go for a small picnic or a long drive with your friends.🕑
>
> A Node.js web application project from the Udemy course - [The Web Developer Bootcamp by Colt Steele](https://www.udemy.com/the-web-developer-bootcamp/)

## Live Demo

To see the app in action, go to [https://yelpcamp-wk.herokuapp.com](https://yelpcamp-wk.herokuapp.com/)

## Features

* Authentication:
  
  * User login with username and password

* Authorization:

  * One cannot edit or delete posts and comments created by other users
  * Only owner can edit and delete his posts

* Manage campground posts with basic functionalities:

  * Create, edit and delete posts and comments

  * Upload campground photos

* UI/UX:
  * Flash messages responding to users' interaction with the app
  * Material UI
  * Responsive web design
 
## Getting Started

> This app contains database passwords that have been hidden deliberately, so the app cannot be run on your local machine with all the features. However, feel free to clone this repository and contribute ✌.

### Clone or download this repository

```sh
git clone https://github.com/iamakshatjain/Yelp-Camp.git
```

### Install dependencies

```sh
npm install
```

### Comments in code

Some comments in the source code are course notes and are included just for personal reference.

## Built with

### Front-end

* [ejs](http://ejs.co/)
* [Bootstrap](https://getbootstrap.com/docs/3.3/)

### Back-end

* [express](https://expressjs.com/)
* [mongoDB](https://www.mongodb.com/)
* [mongoose](http://mongoosejs.com/)
* [passport](http://www.passportjs.org/)
* [passport-local](https://github.com/jaredhanson/passport-local#passport-local)
* [express-session](https://github.com/expressjs/session#express-session)
* [method-override](https://github.com/expressjs/method-override#method-override)
* [connect-flash](https://github.com/jaredhanson/connect-flash#connect-flash)
* [body-parser](https://www.npmjs.com/package/body-parser)
* [nodemon](https://github.com/remy/nodemon)
* [dotenv](https://www.npmjs.com/package/dotenv)

### Platforms
* [Heroku](https://www.heroku.com/)

## License

#### [MIT](./LICENSE)
