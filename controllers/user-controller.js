const { User, Thought, Reaction } = require('../models');

const userController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();

     
      const usersWithFriendCount = await Promise.all(
        users.map(async (user) => {
          const friendCount = user.friends.length;
          return {
            ...user.toObject(), 
            friendCount,
          };
        })
      );

      res.json(usersWithFriendCount);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  getUserById: async (req, res) => { 
    try {
      const user = await User.findOne({ _id: req.params.userId }).select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'TRY AGAIN FAT FINGER' });
      }

      res.json({
        user,
        thoughts: await Thought.find({ username: user.username }),
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  createUser: async (req, res) => {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      return res.status(404).json(err);
    }
  },

  updateUser: async (req, res) => {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { new: true, runValidators: true }
      );
      if (!user) {
        return res.status(404).json({ message: 'TRY AGAIN FAT FINGER' });
      }
      res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  deleteUser: async (req, res) => {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });
  
      if (!user) {
        return res.status(404).json({ message: 'TRY AGAIN FAT FINGER' });
      }
  
     
      const userThoughts = user.thoughts;
      const userReactions = await Reaction.find({ username: user.username });
  
 
      await Thought.deleteMany({ _id: { $in: userThoughts } });
  
      
      await Reaction.deleteMany({ _id: { $in: userReactions.map((reaction) => reaction._id) } });
  
      res.json({ message: 'DELETED....GOOD BYE!!!!!' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  

  addFriend: async (req, res) => {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );
      if (!user) {
        return res.status(404).json({ message: 'TRY AGAIN FAT FINGER' });
      }
      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  removeFriend: async (req, res) => {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );
      if (!user) {
        return res.status(404).json({ message: 'TRY AGAIN FAT FINGER' });
      }
      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
 
};

module.exports = userController;










  // async getAllUsers(req, res) {
  //   try {
  //     const users = await User.find();
  //     res.json(users);
  //   } catch (err) {
  //     res.status(500).json(err);
  //   }
  // },
  
  // async  getUserById(req, res) {
  //   try {
  //     const user = await User.findOne({ _id: req.params.userId }).select(
  //       "-__v"
  //     );

  //     if (!user) {
  //       return res.status(404).json({ message: "No user with that ID" });
  //     }

  //     res.json(user);
  //   } catch (err) {
  //     res.status(500).json(err);
  //   }
  // },
 
  // async createUser(req, res) {
  //   try {
  //     const user = await User.create(req.body);
  //     res.json(user);
  //   } catch (err) {
  //     res.status(500).json(err);
  //   }
  // },

  
 
  // async updateUser(req, res) {
  //   try {
  //     const user = await User.findOneAndUpdate(
  //       { _id: req.params.userId },
  //       { $set: req.body },
  //       { runValidators: true, new: true }
  //     );
  //     if (!user) {
  //       return res.status(404).json({ message: "No user with that ID" });
  //     }

  //     res.json({ message: "User has been updated" });
  //   } catch (err) {
  //     res.status(500).json(err);
  //   }
  
 
  // async addFriend(req, res) {
  //   console.log("You are adding a friend");
  //   console.log(req.body);
  //   try {
  //     const user = await User.findOneAndUpdate(
  //       { _id: req.params.userId },
  //       { $addToSet: { friends: req.body } },
  //       { runValidators: true, new: true }
  //     );

  //     if (!user) {
  //       return res.status(404).json({ message: "No user with that ID" });
  //     }
  //     res.json(user);
  //   } catch (err) {
  //     res.status(500).json(err);
  //   }

 
//   async removeFriend(req, res) {
//     try {
//       const user = await User.findOneAndUpdate(
//         { _id: req.params.userId },
//         { $pull: { friends: { friendId: req.params.friendId } } },
//         { runValidators: true, new: true }
//       );

//       if (!user) {
//         return res.status(404).json({ message: "No user with that ID" });
//       }
//       res.json(user);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   },
// };