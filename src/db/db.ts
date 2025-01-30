import mongoose from 'mongoose';

class Database {
    static async connect() {
        await mongoose.connect(process.env.URI as string);
        console.log('Connected to database')
    }
}
export default Database;