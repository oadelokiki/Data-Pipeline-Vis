//should be requiuring all of the models, nothing raw
const {db, RawSubdomain, CleanSubdomain} = require("./models/index")

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
	const oneinstance = await RawSubdomain.findOne({
		where: {
			id: 1
		}
	})		

	
	//console.log(oneinstance.dataValues);
	const allRawData = await RawSubdomain.count();
	const allCleanedData = await CleanSubdomain.count();	



	//TODO: this is the part where i'd like to create a check against the raw data id fields, and
	//find the newest id shared between the two tables, and CLEAN accordingly
	if(allRawData > allCleanedData){
		const result = {}
		for(let i = 1; i < (allRawData - allCleanedData); i++){

			
			const dataToClean = await RawSubdomain.findOne({
				where: {
					id: i
				}
			})
		//	console.log(dataToClean)			
			//console.log(i)
			for(const property in dataToClean){
//			console.log(dataToClean[property])
				if(property == "dataValues"){
	//				console.log("read")
					for(value in dataToClean[property]){
						if(value  == "adThriveData" || value == "siteTitles" || value == "adData" || value == "imgData"){
							const arr = [];
							for(let m = 0; m < dataToClean[property][value].length; m++){
	//							console.log(dataToClean[property][value][m]);	
								if(Object.keys(dataToClean[property][value][m]).length == 0){
									continue
								}
								else{
									arr.push(dataToClean[property][value][m]);

								}
							}
							result[value] = arr;
		//					console.log(arr);
						}
						else if(value == "subdomain"){

							result[value] = dataToClean[property][value];

						}
					}
				}
			}
		
		console.log(result)
			
		}
	
			
	}
			
                        
//			console.log(cleanedObj);	
	
	return 1;
}

cleanData();
