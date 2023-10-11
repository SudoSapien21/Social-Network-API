const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,   
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: function (v) {
                    return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
                },
                message: props => `${props.value} is not a valid email!`
            }
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

// Virtual property that gets the length of the user's 'friends' array field
userSchema
    .virtual('friendCount').get(function () {
        return this.friends.length;
    });

const User = model('User', userSchema);

module.exports = User;