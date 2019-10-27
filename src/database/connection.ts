import { CONFIG } from 'config';
import mongoose   from 'mongoose';
mongoose.Promise = global.Promise;

export const connectDb = () => {
    return mongoose.connect(CONFIG.DB_URL);
};
