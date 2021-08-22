const mongoose          = require('mongoose')

require('dotenv').config({ path: '.env'})

const contectarDB = async()=>{
    try {
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })
        console.log ('DB conect 🎉')
    }
    catch (error) {
        console.log('Hubo un error ☠', error)
        process.exit(1)
    }
}
module.exports= contectarDB