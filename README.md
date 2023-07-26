## Dev Post
App created with react native + expo. main purpose is to manage user gains and losses. for this using firebase tools: authentication and real time database

## FUNCTIONALITIES
- User can create account
- Login user
- User can register an expense
- User can register a recipe
- User can show all income and expenses for a specific day

## TECHNOLOGIES USED
- React native (Expo)
- Async storage
- Datetimepicker
- React navigation(Drawer and Stack)
- Styled components


## How do start
- create new project in firebase.
- create new realtime database.
- enable authentication with email and password.



## How do configure firebase
- navigate to src/services
- open firebase Connection.js and put the your project configuration.

Example:

`let firebaseConfig = {
    apiKey: "xxxxxxxx",
    authDomain: "xxxxxxx",
    projectId: "xxxxx"
    storageBucket: "xxxxx",
    messagingSenderId: "xxxxxx",
    appId: "xxxxxxxx"
};
`


## How do runing (Expo users)
- clone the repository
- no diretório deste repositório execute estes comandos:
- a)yarn  install
- b) yarn starrt





