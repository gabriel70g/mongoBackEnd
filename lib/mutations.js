'use strict'

const connectDb = require('./db')
const { ObjectID } = require('mongodb')
const errorHandler = require('./errorHandler')

module.exports = {

  createCourse : async (root, { input  } ) =>{
    const defaults = {
      teacher:'',
      topic:''
    }
    const newCourse = Object.assign(defaults, input)
    let db
    let course

    try{

      db = await connectDb()
      course = await db.collection('courses').insertOne(newCourse)
      newCourse._id = course.insertedId

    } catch(err) {
      errorHandler(err);
    }
  
    return newCourse
  },
  createPerson : async (root, { input  } ) =>{
    let db
    let student

    try{

      db = await connectDb()
      student = await db.collection('students').insertOne(input)
      input._id = student.insertedId

    } catch(err) {
      errorHandler(err);
    }
  
    return input
  },
  editCourse: async (root, {_id, input}) =>{
    let db
    let course

    try{

      db = await connectDb()
      await db.collection('courses').updateOne(
         { _id: ObjectID(_id) }, 
         { $set: input }
        )
      course = await db.collection('courses').findOne(
        { _id: ObjectID(_id) }
      )

    } catch(err) {
      errorHandler(err);
    }
  
    return course
  },
  editPerson: async (root, {_id, input}) =>{
    let db
    let student

    try{

      db = await connectDb()
      await db.collection('students').updateOne(
         { _id: ObjectID(_id)}, 
         { $set: input }
        )
        student = await db.collection('students').findOne(
        {_id: ObjectID(_id)}
      )

    } catch(err) {
      errorHandler(err);
    }
  
    return student
  },  
  deleteCourse: async (root, {_id}) =>{
    let db
    let student

    try{

      db = await connectDb()

      await db.collection('courses').deleteOne(
         { _id: ObjectID(_id)} 
        )
        student = await db.collection('courses').findOne(
        {_id: ObjectID(_id)}
      )
    } catch(err) {
      errorHandler(err);
    }
  
    return student?false: true
  },
  deleteStudent: async (root, {_id}) =>{
    let db
    let student
    try{
      db = await connectDb()
      await db.collection('students').deleteOne(
         { _id: ObjectID(_id)} 
        )
        student = await db.collection('students').findOne(
        {_id: ObjectID(_id)}
      )
    } catch(err) {
      errorHandler(err);
    }
    return student?false: true
  },
  addPeople: async (root, { courseID, personID }) => {
    let db
    let person
    let course

    try {
      db = await connectDb()
      course = await db.collection('courses').findOne({
        _id: ObjectID(courseID)
      })
      person = await db.collection('students').findOne({
        _id: ObjectID(personID)
      })

      if (!person) throw new Error('La Persona no existe')
      if (!course) throw new Error('El curso no existe')

      console.log(person)
      console.log(course)

      await db.collection('courses').updateOne(
        { _id: ObjectID(course._id) },
        { $addToSet: { people: ObjectID(person._id) } }
      )
    } catch (error) {
      console.error(error)
    }

    return course
  }
}