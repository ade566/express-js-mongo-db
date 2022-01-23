const express = require('express')
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

module.exports = router