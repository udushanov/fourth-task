import express from 'express'
import mysql from 'mysql2'
import authRoutes from './routes/auth.js'

const app = express()

app.use(express.json())

app.get('/auth', authRoutes)

export const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '5130921a',
  database: ''
})

app.listen(8800, () => {
  console.log('The server is running')
})