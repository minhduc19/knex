const knex = require('knex');
const config = require('../knexfile.js');
const db = knex(config.development);

module.exports = {
	add,
	find,
	findById
}

async function add(data) {
    //await db('courses').insert(data);
    const id = await db('courses').insert(data);
	return id;
	//db('courses').insert(data);
}

async function find() {
	return await db('courses')
}

async function findById(id) {
	return await db('courses').where({id:id}).first();
} 