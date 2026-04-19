import { Schema, model } from 'mongoose';

const ReviewSchema = new Schema({
    userId: {type: String, ref: "User", required: true},
    userName: {type: String, required: true},
    rating: {type: Number,required: true},
    comment: {type:String,required:true}
}, {timestamps: true});

export const Review = model('Review', ReviewSchema);