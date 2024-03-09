import mongoose from 'mongoose';

const contactSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    name: {
        type: String,
        required: [true, 'Please add the name']
    },
    email: {
        type: String,
        required: [true, 'Please add ht email address']
    },
    phone: {
        type: String,
        required: [true, 'Please add the Mobile Number']
    }
},
    {
        timestamps: true,
    }
);
const contactModel = mongoose.model('contacts', contactSchema);
export default contactModel;