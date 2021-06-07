const express = require('express')
const app = express()
const Courses = require ('./models/dbHelpers')
 
app.use(express.json())

app.listen(3001)


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
			res.status(200).json(course)
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

app.patch('/api/courses/:id',(req,res) => {
	const id = req.params.id;
	//const {id} = req.params;
	const data = req.body;
	Courses
	.update(id,data)
	.then(course => {
		if (course){
			res.status(200).json(course)
		}else{
			res.status(404).json({message: "fail to update the record"})
		}
	})
	.catch(err => {
		res.status(500).json({message: `cannot update column ${id}`})
		//res.status(500).json(data)
	})
})

app.get('/api/now',(req,res)=>{
	Courses.find()
	.then(lessons => {res.status(200).json(lessons)})
	.catch(err => {
		res.status(500).json({message: 'cannot retrieve lessons'})
	})
})

app.post('/api/courses/:id/addlesson',(req,res) => {
	//res.status.json({data:"test"});
	const id = req.params.id;
	const data = req.body;

	//res.status(200).json(data);

	if (!data.course_id) {
    	data["course_id"] = parseInt(id, 10);
  	}

  	Courses.findById(id)
    .then((lesson) => {
      if (!lesson) {
        res.status(404).json({ message: "Invalid id" });
      }
      // Check for all required fields
      if (!data.description || !data.content ) {
        res
          .status(400)
          .json({ message: "Must provide both Sender and Text values" });
      }

      Courses.addLesson(data, id)
        .then((message) => {
          if (message) {
            res.status(200).json(message);
          }
        })
        .catch((error) => {
          //res.status(500).json({ message: "Failed to add message" });
          res.status(500).json(data);
        });
	    })
	    .catch((error) => {
	      res.status(500).json({ message: "Error finding lesson" });
	    });

})
