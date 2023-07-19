const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const userRouter = require('./routes/user')
const indexRouter = require('./routes/index')

app.use(express.json())
app.use('/user',userRouter)
app.use('/',indexRouter)


const PORT = process.env.PORT || 8000


app.listen(PORT,()=>console.log(`App is running in port ${PORT}`))