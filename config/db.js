import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    const url = `${connection.connection.host}:${connection.connection.port}`
    console.log(`MongoDB connection ${url}`);
  } catch (error) {
    console.error(`error: ${error}`);
    process.exit(1);
  }
};
