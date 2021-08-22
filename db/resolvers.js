const User          = require ('../models/Usuario')
const bcryptjs      = require('bcryptjs')
  
// Resolvers
const resolvers = {
    Query: {
        obtenerCurso: ()=> "algo"
        
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

            // Veryfy password
        }
    }

    
}

module.exports = resolvers 