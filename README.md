
# Blog Web Site Example

This is a NodeJS web site using Express, EJS and MongoDB.
 
## Installation
To use this you must have:

- xcode command line utils
- mongodb
- nodejs

install xcode command line utils:
```
xcode-select --install
```

install mongodb on mac osx:
```
brew tap mongodb/brew
brew update
brew install mongodb-community@6.0
```

run mongodb service:
```
brew services start mongodb-community@6.0
```

(to stop mongodb, which you shouldn't have to, but w/e... `brew services stop mongodb-community@6.0`)

to test mongodb:
```
mongod --version
```

which should output:
```
db version v6.0.6
Build Info: {
    "version": "6.0.6",
    "gitVersion": "26b4851a412cc8b9b4a18cdb6cd0f9f642e06aa7",
    "modules": [],
    "allocator": "system",
    "environment": {
        "distarch": "x86_64",
        "target_arch": "x86_64"
    }
}
```

to install node dependencies:
```
npm install
```
or `npm i`

## Running

to run web server:
```
npm start
```

to quit web server:
```
ctrl-cps
```


and finally,

open browser to http://localhost:3000

if you make changes to the server code, you'll need to stop and restart the server.

## Design Notes

### Resources
- User
- PhotoAlbum
- Photo

This web service follows the Model-View-Controller pattern using:
- Mongoose (ORM for Mongodb) for Models
- EJS/HTML/Bootstrap for Views
- NodeJS/Express as its Controller.

For more about MVC (Model-View-Controller) see https://developer.mozilla.org/en-US/docs/Glossary/MVC

Users create content pages using Markdown. (See below.)

## Resources
- NodeJS: https://nodejs.org/dist/latest-v18.x/docs/api/
- MongoDB: https://www.mongodb.com/
- Express: https://expressjs.com/
- EJS: https://ejs.co/
- Markdown: https://www.markdownguide.org/
- Marked (markdown parser for nodejs): https://marked.js.org/

## DOCS
[API Documentation](./docs/API.md)
[Data Model Doctumentation](./docs/DataModel.md)
[Todos](./docs/TODOS.md)



### USERS ROUTES

### ARTICLES ROUTES

GET /articles => returns a list of all articles