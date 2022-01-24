const mongoose = require('mongoose');

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
module.exports = Users;