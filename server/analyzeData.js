const {db, RawSubdomain, CleanSubdomain, subDomainAnalysisResult} = require("./models/index")

async function analyzeData(){
	subDomainAnalysisResult.sync({force: true});
	const allRawData = await RawSubdomain.count();
        const allCleanedData = await CleanSubdomain.count();
	
	//pull from raw and clean, record numraw and numclean, take a ratio, and store the subdomain

	var stopNum = 0;
	
	if(allRawData < allCleanedData){
		stopNum = allRawData;
	}else{
		stopNum = allCleanedData;
	}

	for(let i = 1; i < ( stopNum ); i++){
			var result = {}

                        const rawData = await RawSubdomain.findOne({
                                where: {
                                        id: i
                                }
                        })

			const cleanData = await CleanSubdomain.findOne({
                                where: {
                                        id: i
                                }
                        })
			
//			console.log(rawData.dataValues);
//			console.log(cleanData.id);
				
			result["id"] = i;
			result["subdomain"] = rawData.subdomain;
			

			var rawDataCount = 0;
			var cleanDataCount = 0;

			


			for(const property in rawData.dataValues){
				for(let m = 0 ; m < rawData.dataValues[property].length; m++){
					rawDataCount += 1;
				}

				for(let m = 0 ; m < cleanData.dataValues[property].length; m++){
					cleanDataCount += 1;
                                }

			}
			result["dataScraped"] = rawDataCount; 
                        result["dataRelevant"]  = cleanDataCount;
			
			
			console.log(rawDataCount);
			console.log(cleanDataCount);
			
			result["dataRatio"] =  cleanDataCount / rawDataCount;
			console.log(result["dataRatio"]);
			
			result = await subDomainAnalysisResult.create(result);
			console.log(result);
	}
}		
	
analyzeData();

module.exports = [
	
];
