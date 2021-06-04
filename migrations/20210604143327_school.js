
exports.up = function(knex) {
    return knex.schema
    .createTable('courses', function (table) {
       table.increments('id');
       table.text('description', 255).notNullable();
       table.string('author', 255).notNullable();
    }).createTable('lessons', function (table) {
       table.increments('id');
       table.text('description', 255).notNullable();
       table.text('content', 255).notNullable();
       table.integer('course_id')
       .unsigned()
       .references('id')
       .inTable('courses')
       .onDelete('CASCADE')
       .onUpdate('CASCADE');
    })
};

exports.down = function(knex) {
	return knex.schema
      .dropTable("courses")
      .dropTable("lessons");
  
};
