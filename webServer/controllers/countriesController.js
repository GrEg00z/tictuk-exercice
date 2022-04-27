const countriesCollection = require('../data.json')
const {Country} = require('../models/Country.js')

const listByName = (req, res) => {
	
	let input = req.params.input.toLowerCase();
	
	let countries = countriesCollection.map((c) => {
		return new Country(c.name, c.code);
	})
	
	res.send(countries.filter(country => country.name.toLowerCase().includes(input)));
}

module.exports.listByName = listByName;