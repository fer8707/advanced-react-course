const User          = require ('../models/Usuario')
const Product       =require('../models/Product')
const bcryptjs      = require('bcryptjs')
const jwt           = require('jsonwebtoken')

require('dotenv').config({ path: '.env'})

const createToken = (user, secretkey, expiresIn )=>{
    
    const { id, email, name, lastName } = user
    console.log (user)
    return jwt.sign( { id, email, name, lastName}, secretkey, { expiresIn})

}
  
// Resolvers
const resolvers = {
    Query: {
        obtainUser: async(_,{ token })=>{
            const userId = await jwt.verify(token, process.env.SECRETKEY)
            return userId
        },
        obtainProducts: async()=>{
            try {
                const products = await Product.find({})
                return products
            }
            catch (error) {
                console.log(error)
            }
        },
        obtainProduct: async (_, { id })=>{
            const product = await Product.findById(id)
            if(!product){
                throw new Error('Producto no encontrado')
            }
            return product
        }
        
    },
    Mutation: {
        newUser: async (_,{ input })=> {

            const { email, password} = input
            // Validation User
                const Uservalidator = await User.findOne({email})
                if (Uservalidator) {
                    throw new Error ('El usuario ya existe')
                }
            // Password Hash
                const salt = await bcryptjs.genSalt(10)
                input.password = await bcryptjs.hash(password, salt)
            // Save User
                try {
                    const user = new User(input)
                    user.save()
                    return user
                }
                catch (error) {
                    console.log ("error")
                }
        },
        authUser: async (_,{input})=>{
            const { email, password }= input

            // Verify user
            const userverify = await User.findOne({email}) 
            if (!userverify) {
                throw new Error ('El usuario no existe')
            }

            // Verify password
            const passwordverify = await bcryptjs.compare ( password, userverify.password )
            if (!passwordverify){
                throw new Error ('El password es incorrecto')
            }

            // Create token
            return {
                token: createToken(userverify, process.env.SECRETKEY, '24h')
            }
        },
        newProduct: async (_, { input })=>{
            try {
                const product= new Product(input)
                const result = await product.save()
                return result
            }
            catch (error) {
                console.log (error)
            }
        },
        updateProduct: async (_, { id, input })=>{
            let product= await Product.findById(id)
            if (!product){
                throw new Error ('Producto no encontrado')
            }
            product= await Product.findByIdAndUpdate({ _id: id }, input, { new:true })
            return product
        },
        deleteProduct: async (_, { id })=>{
            const product= await Product.findById(id)
            if (!product){
                throw new Error ('Producto no encontrado')
            }
            await Product.findByIdAndDelete({ _id:id })
            return 'Producto eliminado'
        }
    }

    
}

module.exports = resolvers 