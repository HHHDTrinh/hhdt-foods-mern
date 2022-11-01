import mongoose from 'mongoose';

const foodSchema = mongoose.Schema({
    title: {
        type: String,
    },
    country: {
        type: String,
    },
    description: {
        type: String,
    },
    tags: {
        type: [String],
    },
    creator: {
        type: String,
    },
    selectedFile: {
        type: String,
    },
    loveCount: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

var FoodWanted = mongoose.model('FoodWanted', foodSchema);
export default FoodWanted;
