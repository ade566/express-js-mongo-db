const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router()
const connection = require('./connection')

require('./mongoose')
const User = require('./Users');

router.get('/', (req, res) => {
  res.send('Hello world!')
});

router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.send({users: users})
  } catch (err) {
    res.send({message: err.message || 'server error'})
  }
})

router.get('/users/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const user = await User.findOne({_id: id});
    if(user){
      res.send({user: user})
    }else{
      res.send({message: 'user tidak ditemukan'})
    }
  } catch (err) {
    res.send({message: err.message || 'server error'})
  }
})

router.post('/users', async (req, res) => {
  try {
    const {name, email, status} = req.body
    const users = await User.create({
      name, 
      email, 
      status
    })
    if(users._id){
      res.send({code: 200, data: users})
    }else{
      res.send({code:500, message: 'gagal menambahkan data'})
    }
  } catch (err) {
    res.send({message: err.message || 'server error'})
  }
})

router.put('/users/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const {name, email, status} = req.body
    const users = await User.updateOne({_id: id}, {
      name, 
      email, 
      status
    }, {runValidators: true})

    if(users){
      res.send({code: 200, message: 'berhasil update data', data: users})
    }else{
      res.send({code:500, message: 'gagal update data'})
    }
  } catch (err) {
    res.send({message: err.message || 'server error'})
  }
})

router.delete('/users/:id', async (req, res) => {
  try {
    const {id} = req.params
    const users = await User.deleteOne({_id: id})
    if(users.deletedCount){
      res.send({code: 200, data: users})
    }else{
      res.send({code: 500, message: 'gagal delete data'})
    }
  } catch (err) {
    res.send({message: err.message || 'server error'})
  }
})

module.exports = router