import mongoose from 'mongoose';

const pacientSchema = mongoose.Schema({
    name: { type: String, required: true },
    birthDate: { type: String, required: true },
    sex: { type: String, required: true },
    skinTone: { type: String, required: true },
    profession: { type: String, required: true },
    levelEducation: { type: String, required: true },
    maritalState: { type: String, required: true },
    naturalness: { type: String, required: true },
    address: { type: String, required: true },
    district: { type: String, required: true },
    county: { type: String, required: true },
    cellPhone: { type: String, required: true },
    uf: { type: String, required: true },
    origin: { type: String, required: true },
    nameResponsible: { type: String },
    namePublicEmploye: { type: String },
    updatedAt: {type: Date, default: Date.now },
    createdAt: {type: Date, default: Date.now }
})

export default mongoose.model("Pacient", pacientSchema);