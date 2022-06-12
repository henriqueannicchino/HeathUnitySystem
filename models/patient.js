import mongoose from 'mongoose';

const patientSchema = mongoose.Schema({
    name: { type: String, required: true },
    birthDate: { type: Date, required: true },
    sex: { type: String, required: true },
    skinTone: { type: String, required: true },
    profession: { type: String, required: true },
    levelEducation: { type: String, required: true },
    maritalState: { type: String, required: true },
    nationality: { type: String, required: true },
    address: { type: String, required: true },
    district: { type: String, required: true },
    county: { type: String, required: true },
    zipCode: { type: String },
    cellPhone: { type: String, required: true },
    referencePoint: { type: String, required: true },
    origin: { type: String, required: true },
    nameResponsible: { type: String, required: true },
    namePublicEmploye: { type: String, required: true },
    updatedAt: {type: Date, default: Date.now },
    createdAt: {type: Date, default: Date.now }
})

export default mongoose.model("Patient", patientSchema);