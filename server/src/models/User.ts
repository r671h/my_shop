import { Schema, model,models } from 'mongoose';
import { Cart } from './Cart';
import { CartSchema } from './Cart';
import { OrdersSchema } from './Order';

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
    orders: [OrdersSchema],
  cart: [CartSchema]
}, {timestamps: true});

export const User = models.User || model('User', UserSchema);