'use strict';


var { DateTime } = require('luxon');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AuthorSchema = new Schema({
	
	first_name : {
		type : String,
		require : true, 
		maxLength : 100
	},

	family_name : {
		type : String,
		require : true, 
		maxLength : 100
	},

	date_of_birth : {type: Date},

	date_of_death : {type: Date}

});


AuthorSchema.virtual('name').get(function () {
	return this.family_name+', '+this.first_name;
});

AuthorSchema.virtual('url').get(function () {
	return '/catalog/author/' + this._id;
});

AuthorSchema.virtual('date_of_birth_formatted').get(function () {
	return this.date_of_birth ? DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED) : '';
});

AuthorSchema.virtual('date_of_death_formatted').get(function () {
	return this.date_of_death ? DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED) : '';
});

AuthorSchema.virtual('lifespan').get(function () {
	var date = '';
	date = this.date_of_birth_formatted;
	if (this.date_of_death_formatted) date += ' - '+this.date_of_death_formatted;
	return date;
});


module.exports = mongoose.model('Author', AuthorSchema);






