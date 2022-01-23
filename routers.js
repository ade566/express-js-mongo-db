const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router()
const connection = require('./connection')

router.get('/', (req, res) => {
  res.send('Hello world!')
});

router.get('/users', async (req, res) => {
  try {
    if(connection.connect()){
      const db = connection.db('bwa_storegg')
      const users = await db.collection('users').find().toArray()
      res.send({data: users})
    }else{
      res.send({message: 'gagal load database'})
    }
  } catch (err) {
    res.send({message: err.message || 'server error'})
  }
})

router.post('/users', async (req, res) => {
  try {
    if(connection.connect()){
      const {name, email, status} = req.body
      const db = connection.db('bwa_storegg')
      const users = await db.collection('users').insertOne({
        name, 
        email, 
        status
      })
      if(users.insertedId){
        res.send({code: 200, data: users})
      }else{
        res.send({code:500, message: 'gagal menambahkan data'})
      }
    }else{
      res.send({message: 'gagal load database'})
    }
  } catch (err) {
    res.send({message: err.message || 'server error'})
  }
})

router.put('/users/:id', async (req, res) => {
  try {
    if(connection.connect()){
      const {id} = req.params
      const {name, email, status} = req.body
      const db = connection.db('bwa_storegg')
      const users = await db.collection('users').updateOne({_id: ObjectId(id)}, {$set : {
        name, 
        email, 
        status
      }})
      if(users.matchedCount){
        res.send({code: 200, data: users})
      }else{
        res.send({code: 500, message: 'gagal mengupdate data'})
      }
    }else{
      res.send({message: 'gagal load database'})
    }
  } catch (err) {
    res.send({message: err.message || 'server error'})
  }
})

router.delete('/users/:id', async (req, res) => {
  try {
    if(connection.connect()){
      const {id} = req.params
      const {name, email, status} = req.body
      const db = connection.db('bwa_storegg')
      const users = await db.collection('users').deleteOne({_id: ObjectId(id)})
      if(users.deletedCount){
        res.send({code: 200, data: users})
      }else{
        res.send({code: 500, message: 'gagal delete data'})
      }
    }else{
      res.send({message: 'gagal load database'})
    }
  } catch (err) {
    res.send({message: err.message || 'server error'})
  }
})

module.exports = router