const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/bwa_storegg');
}

const UsersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Nama harus diisi']
  },
  email: {
    type: String,
    required: [true, 'Email harus diisi']
  },
  status: {
    type: String,
    enum: ['true', 'false'],
    default: 'true'
  }
})

const Users = mongoose.model('users', UsersSchema);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async () => {
  try {
    const user = await Users.create({
      name: 'Ares',
      email: 'ares@gmail.com'
    });
    console.log(user);
  } catch (error) {
    console.log(error.message);
  }
});
