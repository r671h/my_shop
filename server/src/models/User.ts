import { Schema, model,models } from 'mongoose';
import { Cart } from './Cart';
import { CartSchema } from './Cart';

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: [
        {
        street: String,
        city: String,
        zip: String,
        country: String,
        }
    ],
    orders: [
    {
      items: Array,
      total: Number,
      createdAt: { type: Date, default: Date.now }
    }
  ],
  cart: [CartSchema]
}, {timestamps: true});

export const User = models.User || model('User', UserSchema);