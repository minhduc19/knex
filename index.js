const express = require('express')
const app = express()
const Courses = require ('./models/dbHelpers')
 
app.use(express.json())

app.get('/', function (req, res) {
  res.send('Hello World')
})
 
app.post('/api/courses', (req,res)=>{
	Courses.add(req.body)
	.then(lesson => {res.status(200).json(lesson)})
	.catch(err => {
		res.status(500).json({message: "some error"})
	})

})

app.get('/api/courses',(req,res)=>{
	Courses.find()
	.then(lessons => {res.status(200).json(lessons)})
	.catch(err => {
		res.status(500).json({message: 'cannot retrieve lessons'})
	})
})

app.get('/api/courses/:id',(req,res)=>{
	const {id} = req.params;
	Courses
	.findById(id)
	.then(course => {
		if(course){
			res.status(200).json({course:"data"})
			//console.log(res);
			//return res
		} else {
			res.status(404).json({message: 'cannot find the course'})
		}
	})
	.catch(error => {
		res.status(500).json({message: "cannot retrieve the course"})
	})
})

app.listen(3000)