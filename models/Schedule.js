import mongoose from 'mongoose';

const scheduleSchema = mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    pacientId: {type: mongoose.Schema.Types.ObjectId, ref: "Pacient", required: true},
    scheduleDate: {type: String, required: true},
    time: {type: String, required: true},
    present: {type: Boolean, default: false},
    updatedAt: {type: Date, default: Date.now },
    createdAt: {type: Date, default: Date.now }
})

export default mongoose.model("Schedule", scheduleSchema);