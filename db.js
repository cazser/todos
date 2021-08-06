const fs = require('fs')
const { promisify} = require('util')
const readFile = promisify(fs.readFile);
const path = require('path')

const dbPath = path.join(__dirname, './db.json')
exports.getDb = async ()=>{
	const data = await readFile(dbPath, 'utf8');
	return JSON.parse(data);
}