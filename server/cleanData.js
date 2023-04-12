//should be requiuring all of the models, nothing raaw
const {db, RawSubdomain, CleanSubdomain} = require("../models/index")

//what do I actually hope to accomplish by "cleaning the data"
//well, i want to clean it in the sense that there will only be certain parts of it that are useful to me//for example: here's a list of what we don't want: 
//null 
//NaN
//undefined
//{}
//[]
//There could be a lot of different values that we receive when scraping this many sites, which can be picked up by the much beefier monitoring program, but for now, we can just take care of the simple stuff. 
//1. copy the raw data object from the database,
//2. clean/lint them 
//3. store the cleaned/linted stuff in the next table
//4. the data is now for transformation/calculation into the final table

async function cleanData(rawsubdomains){
	for(let i = 0 ; i < data.length; i++){
		
	}
}
