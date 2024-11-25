import mongoose from 'mongoose';

const ideaSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title'],
        trim: true,
    },
    content: {
        type: String,
        required: [true, 'Please provide content'],
        trim: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    timestamps: true,
});

const Idea = mongoose.model('Idea', ideaSchema);

export default Idea;
