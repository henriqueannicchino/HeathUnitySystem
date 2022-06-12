import mongoose from 'mongoose';

const medicalReportSchema = mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    patientId: mongoose.Schema.Types.ObjectId,
    report: { type: String, required: true },
    createdAt: {type: Date, default: Date.now }
})

export default mongoose.model("MedicalReport", medicalReportSchema);