import mongoose from 'mongoose';

const dbConnect = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log('Connected to MONGO_DB'))
    .catch(() => console.Console.log('Error connecting to MONGO_DB'));
};
const OnErrordbConnect = () => {
  mongoose.connection.on('error', (err) => {
    console.error(err);
  });
};
const OnDisconnectdbConnect = () => {
  mongoose.connection.on('disconnected', (err) => {
    console.log('disconnected from MONGO_DB');
  });
};

export { dbConnect, OnErrordbConnect, OnDisconnectdbConnect };
