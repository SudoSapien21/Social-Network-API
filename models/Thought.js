const { Schema, model } = require('mongoose');

const reactionSchema = new Schema(
    {
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: timestamp => new Date(timestamp).toISOString(),
    }
},
    {
        toJSON: {        
            timestamps: true,
            getters: true
        },
        
    }
);

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema]
},

    {
        toJSON: {
            virtuals: true,
            
        },
        id: false
    }
);

ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

// create the Thought model using the ThoughtSchema
const Thought = model('thought', ThoughtSchema);

// export the Thought model
module.exports = Thought;