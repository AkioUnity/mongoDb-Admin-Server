const AuthenticationController = require('./controllers/authentication');

const UserController = require('./controllers/user');
// const ChatController = require('./controllers/chat');

//DB Browser
const FriendsController = require('./controllers/friends');
const ConsolesController = require('./controllers/console');
const MessagesController = require('./controllers/messages');
const FriendRequestsController = require('./controllers/friendrequests');
const ChatsController = require('./controllers/chats');
const UsersController = require('./controllers/users');
const GamesController = require('./controllers/games');


const express = require('express');
const passport = require('passport');
const ROLE_MEMBER = require('./constants').ROLE_MEMBER;
const ROLE_CLIENT = require('./constants').ROLE_CLIENT;
const ROLE_OWNER = require('./constants').ROLE_OWNER;
const ROLE_ADMIN = require('./constants').ROLE_ADMIN;


const passportService = require('./config/passport');

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', {session: false});
const requireLogin = passport.authenticate('local', {session: false});

module.exports = function (app) {
    // Initializing route groups
    const apiRoutes = express.Router(),
        authRoutes = express.Router(),
        userRoutes = express.Router(),
        chatRoutes = express.Router(),
        payRoutes = express.Router(),
        communicationRoutes = express.Router();

    //= ========================
    // Auth Routes
    //= ========================

    // Set auth routes as subgroup/middleware to apiRoutes
    apiRoutes.use('/auth', authRoutes);


    // Registration route
    authRoutes.post('/register', AuthenticationController.register);


    // Login route
    authRoutes.post('/login', requireLogin, AuthenticationController.login);

    // Password reset request route (generate/send token)
    authRoutes.post('/forgot-password', AuthenticationController.forgotPassword);

    // Password reset route (change password using token)
    authRoutes.post('/reset-password/:token', AuthenticationController.verifyToken);

    //= ========================
    // User Routes
    //= ========================

    // Set user routes as a subgroup/middleware to apiRoutes
    apiRoutes.use('/user', userRoutes);

    // View user profile route
    userRoutes.get('/:userId', requireAuth, UserController.viewProfile);

    // Test protected route
    apiRoutes.get('/protected', requireAuth, (req, res) => {
        res.send({content: 'The protected test route is functional!'});
    });

    apiRoutes.get('/admins-only', requireAuth, AuthenticationController.roleAuthorization(ROLE_ADMIN), (req, res) => {
        res.send({content: 'Admin dashboard is working.'});
    });

    //= ========================
    // Chat Routes
    //= ========================

    // Profile update
    apiRoutes.post('/update_profile', UserController.update_profile);


    // Set url for API group routes
    app.use('/api', apiRoutes);

    //DB Browser========
    //Friends Table
    apiRoutes.get('/friends', FriendsController.getFriends);
    apiRoutes.post('/friends', FriendsController.getFriends);
    apiRoutes.delete('/friends/delete/:id', FriendsController.delete);
    apiRoutes.put('/friends/update/:id', FriendsController.update);
    apiRoutes.post('/friends/create', FriendsController.create);

    //Consoles Table
    apiRoutes.get('/consoles', ConsolesController.getConsoles);
    apiRoutes.post('/consoles', ConsolesController.getConsoles);
    apiRoutes.delete('/consoles/delete/:id', ConsolesController.delete);
    apiRoutes.put('/consoles/update/:id', ConsolesController.update);
    apiRoutes.post('/consoles/create', ConsolesController.create);

    //Messages Table
    apiRoutes.get('/messages', MessagesController.getMessages);
    apiRoutes.post('/messages', MessagesController.getMessages);
    apiRoutes.delete('/messages/delete/:id', MessagesController.delete);
    apiRoutes.put('/messages/update/:id', MessagesController.update);
    apiRoutes.post('/messages/create', MessagesController.create);

     //FriendRequests Table
     apiRoutes.get('/friendrequests', FriendRequestsController.getFriendRequests);
     apiRoutes.post('/friendrequests', FriendRequestsController.getFriendRequests);
     apiRoutes.delete('/friendrequests/delete/:id', FriendRequestsController.delete);
     apiRoutes.put('/friendrequests/update/:id', FriendRequestsController.update);
     apiRoutes.post('/friendrequests/create', FriendRequestsController.create);

    //Chats Table
     apiRoutes.get('/chats', ChatsController.getChats);
     apiRoutes.post('/chats', ChatsController.getChats);
     apiRoutes.delete('/chats/delete/:id', ChatsController.delete);
     apiRoutes.put('/chats/update/:id', ChatsController.update);
     apiRoutes.post('/chats/create', ChatsController.create);
     //UsersTable
     apiRoutes.get('/users', UsersController.getUsers);
     apiRoutes.post('/users', UsersController.getUsers);
     apiRoutes.delete('/users/delete/:id', UsersController.delete);
     apiRoutes.put('/users/update/:id', UsersController.update);
     apiRoutes.post('/users/create', UsersController.create);

     apiRoutes.get('/games', GamesController.getGames);
     apiRoutes.post('/games', GamesController.getGames);
     apiRoutes.delete('/games/delete/:id', GamesController.delete);
     apiRoutes.put('/games/update/:id', GamesController.update);
     apiRoutes.post('/games/create', GamesController.create);

};
