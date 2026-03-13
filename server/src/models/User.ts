import { Schema, model,models } from 'mongoose';

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    addresses: [
        {
            street: { type: String },
            city: { type: String },
            zip: { type: String },
            country: { type: String }
        }
    ],
    orders: [
    {
      items: Array,
      total: Number,
      createdAt: { type: Date, default: Date.now }
    }
  ]
}, {timestamps: true});

export const User = models.User || model('User', UserSchema);