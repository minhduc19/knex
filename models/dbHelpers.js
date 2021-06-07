const knex = require('knex');
const config = require('../knexfile.js');
const db = knex(config.development);

module.exports = {
	add,
	find,
	findById,
	update,
	addLesson
}

async function add(data) {
    //await db('courses').insert(data);
    const id = await db('courses').insert(data);
	return id;
	//db('courses').insert(data);
}

async function find() {
	return await db('courses');
}

async function findById(id) {
	return await db('courses').where({id:id}).first();
} 

async function update(id,data) {
	return await db('courses').where({id:id}).update(data).then(() => {return findById(id)});
	//return id;
	//return "test";
}

async function addLesson(lesson, course_id) {
	//return await db("lessons").where({ course_id }).insert(message, ["id"]);
	const [id] = await db('lessons').where({ course_id }).insert(lesson);
	return id;
	//const id = await db('lesson').insert(lesson);
}