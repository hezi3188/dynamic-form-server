import mongoose from 'mongoose';

const formSubmittionSchema = new mongoose.Schema({
    fields: {
        type: Map,
        of: mongoose.Schema.Types.Mixed,
    },
    createdAt: { type: Date, default: Date.now },
});

const FormSubmittion = (formId: string) => mongoose.model(formId, formSubmittionSchema);

export default FormSubmittion;
