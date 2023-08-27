const Person = require('../model/Person')

const findPerson = async(req,res)=>{
    const {firstName,lastName} = req.body

    const person = await Person.findOne({"firstName":firstName,"lastName":lastName}).lean().exec()
    // const person = await Person.findOne().lean().exec()

    if(!person){
        // console.log(person)
        // return res.status(201).json({ message: 'New Person created' })
        return res.status(400).json({ message: 'Person not found' }) 
    
        
    }
           res.json(person)
        
   
}

module.exports ={findPerson}
