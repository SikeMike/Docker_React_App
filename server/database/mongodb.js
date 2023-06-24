const mongoose = require('mongoose');

mongoose.connection.on('open', () => console.log('Db connected!'));
mongoose.connection.on('error', (error) => console.error('Db connection error:', error));

async function connectDb() {
  try {
    await mongoose.connect('mongodb://mongo:27017/mydb',
    { useNewUrlParser: true,
      useUnifiedTopology: true });
    console.log('Connected to MongoDB!');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
  }
}

module.exports = connectDb;
