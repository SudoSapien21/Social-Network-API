const { Thought, User, Reaction } = require('../models');

const thoughtController = {

  async getAllThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
  async getThoughtById(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId }).select('-__v');

      if (!thought) {
        return res.status(404).json({ message: 'TRY AGAIN FAT FINGER' });
      }

      res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);

    
      const user = await User.findOneAndUpdate(
        { username: thought.username },
        { $push: { thoughts: thought._id } },
        { new: true }
      );

      res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },


  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

      if (!thought) {
        res.status(404).json({ message: 'TRY AGAIN FAT FINGER' });
      }

     
      await Reaction.deleteMany({ thoughtId: thought._id });

      res.json({ message: 'DELETED....GOOD BYE!!!' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },


  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        res.status(404).json({ message: 'TRY AGAIN FAT FINGER' });
      }

      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },


  async createReaction(req, res) {
    console.log('adding a reaction');
    console.log(req.body);
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $push: { reactions: req.body } },
        { new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'TRY AGAIN FAT FINGER' });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

 
  async deleteReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'TRY AGAIN FAT FINGER' });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = thoughtController;
