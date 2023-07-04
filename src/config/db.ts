import mongoose, { ConnectOptions } from "mongoose";

export default async function connectDB() {
  await mongoose
    .connect(process.env.MONGO_URL!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: true,
    } as ConnectOptions)
    .then(() => {
      console.log("Database Connected Successfully.");
    })
    .catch((err) => {
      console.error(`Error Connections to the Database -`, err);
    });
}
