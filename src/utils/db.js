import mongoose, { ConnectOptions, Mongoose } from "mongoose";

const MONGODB_URL = process.env.MONGODB_URI;

if (!MONGODB_URL) {
    throw new Error(
        "Please define the MONGODB_URL environment variable inside .env.local"
    );
}

let cached = {
    conn: null,
    promise: null,
};

const dbConnect = async () => {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };

        cached.promise = mongoose.connect(MONGODB_URL, opts).then((mongoose) => {
            return mongoose;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
};

export default dbConnect;
