import mongoose from 'mongoose';

const scheduleSchema = mongoose.Schema({
    userId: {type: String, required: true},
    pacientId: {type: String, required: true},
    scheduleDate: {type: String, required: true},
    time: {type: String, required: true},
    present: {type: Boolean, default: false},
    updatedAt: {type: Date, default: Date.now },
    createdAt: {type: Date, default: Date.now }
})

export default mongoose.model("Schedule", scheduleSchema);