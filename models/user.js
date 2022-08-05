import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    userName: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    type: { type: String, required: true },
    intern: { type: Boolean, required: true},
    status: { type: String, default: 'pending'},
    profileImage: { type: String, default: ''},
    createdAt: {type: Date, default: Date.now }
});

export default mongoose.model("User", userSchema);