
const Person = require('../model/Person')
require('express-async-errors')
// @desc Get a Person 
// @route GET /findsomeone
// @access Private
const getPerson = async(req,res)=>{
    const {firstName,lastName} = req.body

    const person = await Person.findOne({"firstName":firstName,"lastName":lastName}).lean().exec()
    // const person = await Person.findOne().lean().exec()

    if(person){
        // console.log(person)
        // return res.status(201).json({ message: 'New Person created' })
        res.json(person)
        
    }
        //    res.json(person)
        return res.status(400).json({ message: 'Person not found' }) 
   
}

// @desc Create new note
// @route POST /notes
// @access Private
const createNewPerson = async(req,res)=>{
    const {firstName,lastName,providedLocation,familyMember,country,region,city,lat,long} = req.body
    if (!firstName || !lastName || !providedLocation || !familyMember) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    const duplicate = await Person.findOne({firstName,lastName}).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate note title' })
    }

//   Create and store the new person 
 const person = await Person.create({firstName,lastName,providedLocation,familyMember,country,region,city,lat,long})
 if (person) { // Created 
    return res.status(201).json({ message: 'New Person created' })
} else {
    return res.status(400).json({ message: 'Invalid note data received' })
}
console.log(person)
}


// @desc Delete a Person
// @route DELETE /person
// @access Private
// const deletePerson = async((req,res)=>{
//     const {firstName,lastName} = req.body
// })


module.exports = {
    getPerson,
    createNewPerson
}