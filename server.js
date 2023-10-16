const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');
const app = express();
app.use(express.json());
const userController = require('./controllers/user-controller');
const thoughtController = require('./controllers/thought-controller');
app.get('/api/users', userController.getAllUsers);
app.get('/api/users/:userId', userController.getUserById);
app.get('/api/thoughts', thoughtController.getAllThoughts);
app.get('/api/thoughts/:thoughtId', thoughtController.getThoughtById);
app.post('/api/users', userController.createUser);
app.post('/api/thoughts', thoughtController.createThought);
app.post('/api/thoughts/:thoughtId/reactions', thoughtController.createReaction);
app.put('/api/users/:userId', userController.updateUser);
app.delete('/api/users/:userId/friends/:friendId', userController.removeFriend);
app.delete('/api/users/:userId', userController.deleteUser);
app.delete('/api/thoughts/:thoughtId/reactions/:reactionId', thoughtController.deleteReaction);





const PORT = process.env.PORT || 3001;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);
// Listen for open event
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});