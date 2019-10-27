import bcrypt from 'bcryptjs';
import mongoose   from 'mongoose';

const UserSchema = mongoose.Schema({
    password: {
        type: String,
        required: true
    },
    username: {type: String, default: '', required: false},
    firstName: {type: String, default: '', required: false},
    lastName: {type: String, default: '', required: false},
    role: {type: String, default: '', required: false}
});

UserSchema.methods.serialize = function () {
    return {
        _id: this._id || '',
        username: this.username || '',
        firstName: this.firstName || '',
        lastName: this.lastName || '',
        role: this.role || ''
    };
};

UserSchema.methods.validatePassword = function (password) {
    return bcrypt.compare(password, this.password);
};

UserSchema.statics.hashPassword = async function (password) {
    return bcrypt.hash(password, 10);
};

export const User = mongoose.model('User', UserSchema);


