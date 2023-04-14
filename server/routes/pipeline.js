const express = require("express");
const router = express.Router();
//const { Item } = require("../models");
const {scrapeAdPlacements} = require("../scraper")
const {db, RawSubdomain, CleanSubdomain, subDomainAnalysisResult} = require("../models")
const {cleanData} = require("../cleanData")

// GET /items
router.get("/scrapedata", async (req, res, next) => {
  try {
	  console.log("received")
	  const scrapeResults = await scrapeAdPlacements();

	 res.json({"Subdomains Scraped" : await RawSubdomain.count()});

  } catch (error) {
    next(error);
  }
});

router.get("/rawdata", async (req, res, next) => {
  try {
	  var allRawData = []
          const rsdCount = await RawSubdomain.count();
	  for(let m = 0; m <  rsdCount; m++){
			const dataPoint = await RawSubdomain.findOne({
				where:{
					id: m
				}
			})
		  	allRawData.push(dataPoint);
	  }
         res.json(allRawData);
  } catch (error) {
    next(error);
  }
});

router.get("/cleandata", async (req, res, next) => {
  try {
          var allCleanData = []
          const csdCount = await CleanSubdomain.count();
          for(let m = 0; m <  csdCount; m++){
                        const dataPoint = await CleanSubdomain.findOne({
                                where:{
                                        id: m
                                }
                        })
                        allCleanData.push(dataPoint);
          }
         res.json(allCleanData);
  } catch (error) {
    next(error);
  }
});

router.get("/analysis", async (req, res, next) => {
		try{
			var allAnalyzedData= []
        		  const adCount = await subDomainAnalysisResult.count();
		          for(let m = 0; m <  adCount; m++){
                        const dataPoint = await subDomainAnalysisResult.findOne({
                                where:{
                                        id: m
                                }
                        })
                        allAnalyzedData.push(dataPoint);
			}
		 	res.json(allAnalyzedData);
		}catch(error){
			next(error);
		}
})

//create route with react states for cleaned data, 
//create route with react states for analyzed data,

module.exports = router;
