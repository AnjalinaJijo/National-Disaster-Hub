
const Person = require('../model/Person')
require('express-async-errors')

const axios = require('axios')

// @desc Get a Person 
// @route GET /findsomeone
// @access Private
const getLocation = async(req,res)=>{

    axios.get(`https://ipinfo.io/100.12.27.156/json?token=${process.env.ipinfoToken}`)
    .then((response) =>{
        res.json(response.data)
    })
    .catch(function(error){
        console.log(error);
    });  
   
}

// @desc Create new note
// @route POST /notes
// @access Private
const createNewPerson = async(req,res)=>{
    const {firstName,lastName,providedLocation,familyMember,country,region,city,loc} = req.body
    if (!firstName || !lastName || !providedLocation || !familyMember) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    const duplicate = await Person.findOne({firstName,lastName,providedLocation}).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate Entry' })
    }

    
//   Create and store the new person 
 const person = await Person.create({firstName,lastName,providedLocation,familyMember,country,region,city,loc})
 if (person) { // Created 
    return res.status(201).json(person)
} else {
    return res.status(400).json({ message: 'Invalid note data received' })
}
}


// @desc Delete a Person
// @route DELETE /person
// @access Private
// const deletePerson = async((req,res)=>{
//     const {firstName,lastName} = req.body
// })


module.exports = {
    getLocation,
    createNewPerson
}