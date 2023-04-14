/* The purpose of this sccraper is to
 *
 * 	--> make use of our sitesList json
 *	
 *	--> Make use of the fetch api, and grab html from the target
 *	
 *	--> Search the html for specific element as specfied per the JSON
 *	
 *	--> Quantify / qualify / extract whatever data I need from the element, 
 *
 *	--> use sequelize  to make the DB queries that I need.
 * *	
 *	Funny enough,the models will only be usable on a site by site basis.
 *	
 *
 *	-->MAKE SURE TO LEAVE THE DATA DIRTY FOR NOW
 * */
const siteList = require("../siteList.json");
const fetch = require("node-fetch")
const extractUrls = require("extract-urls")
const parse = require ('html-dom-parser')
const {JSDOM}  = require("jsdom");
//web crawler
const puppeteer = require("puppeteer")
const {storeRawData} = require("./dbWriter")
const {syncDatabaseModels, RawSubdomain} = require("./models/index");



async function getAllSubDomains(){
	//should scrape the sitemap_index.xml for all of the sites.xml(s)
	//each list should then be scraped, fetching each of the domains available on that site.
	
	

	const sitemap_index = await fetch(siteList["sites"] + "sitemap.xml");
	const sites_on_map  = await sitemap_index.text();
	const locations = extractUrls(sites_on_map);

//	await syncDatabaseModels();
	//at this points, locations is a nice array filled with the sitemaps of each subdomain
	//
	const masterURList = [];

	for(let i  = 0; i < locations.length; i++){
		const response = await fetch(locations[i]);
		
		const bunchOfUrls = await response.text();

		const allUrls = extractUrls(bunchOfUrls);
		
		if(allUrls == undefined){
			continue;	
		}
		
		for(let g = 0; g < allUrls.length; g++){
			//Now what needs to happen, is that i need to sort through the pages, only accepting urls that end in "/"

			if(allUrls[g][allUrls[g].length - 1] == "/"){
				masterURList.push(allUrls[g]);	
			}
		};

		

	}
	//by the time that this for loop has completed, we have a complete linear mapping of the entire domain.
	return masterURList;	

}

//web scraper (scrapes from crawler results)
async function scrapeAdPlacements(){
	const scrapeResults = [];
	const range = await RawSubdomain.count();

	const subdomains = await getAllSubDomains();
	console.log("Here's to collecting all of the subdomains")
	//Array of subdomains from the main site.
	var exampleCounter = 0;
	 const browser = await puppeteer.launch();
	const page = await browser.newPage();
         await page.setDefaultNavigationTimeout(0);


	for(let i = range + 1; i < subdomains.length; i++){

		try{
		

	
        	  await page.goto(subdomains[i], {waitUntil: "load"});

			  // Set screen size
			await page.setViewport({width: 1080, height: 1024});
			const data = await page.evaluate( () => {
				const siteList = {"AdPlacementTypes":["AdThrive", "google_ads"]}
				//All of the data i'm gonna be yanking from the sites
				const adData = []; // how many ads are they showing, how large are these placements? What are their tags, if any, what's the metadata on these like. The more that I can answer these questions, the better purpose the webscraper will serve.
				const imgData = []; // what are they displaying to their users? We can't see it, but we can analyze it for sure.
				const adThriveData = []; // one type of ad they make use of 
				const siteTitles = []; // what kind of site is this supposed to be 
				const siteFormNames = []; //what kind of info do they collect from users


		///This for loop searches for all ads	
			for(let ads = 0 ; ads < siteList["AdPlacementTypes"].length; ads++){
				const datum2 = document.querySelectorAll("[id *= " + siteList["AdPlacementTypes"][ads] + "]");	
				//only doing this so that I can ensure we're getting unique values
				for(let d = 0 ; d < datum2.length; d++){
			adData.push(datum2[d])

					
					//this next part should start to reveal to me how i'd like to set up my sequelize models
				}
					
			
			}

			const datum = document.querySelectorAll("[class *= ad]");
			const otherAds = document.querySelectorAll("[id *= Ad]");

		//just wider coverage on the ads
			for(let x = 0 ; x < otherAds.length ; x++){
				adThriveData.push( otherAds[x] );		
			} 

			for(let one = 0 ; one < datum.length; one ++ ){
				adThriveData.push(Object.keys(datum[one]));
			}

		//This next for loop is going to search for all images
			const images = document.querySelectorAll("img")
			for (let p = 0; p < images.length; p++){
				if (Object.keys(images[p]).length == 0){
					continue;
				}
				else{
					imgData.push(images[p]['llOriginalAttrs']);
				}	
			}
		//I can start to extract this seemingly random data from the sites, but what's the point?
				siteTitles.push(document.querySelector("title").innerHTML);
			const formdata = document.querySelectorAll("form")
			for(let f = 0; f < formdata.length; f++){
				siteFormNames.push(formdata[f]);
			}

				return {"adData": [... new Set(adData)], "imgData" : [... new Set(imgData)],"adThriveData": adThriveData, "siteTitles": [... new Set(adData)]};
			})
		  	
 
			data["subdomain"] = subdomains[i];
//			data["id"] = i + 1;					

			scrapeResults.push(data);
			console.log(i + "subdomains scraped" );		
			const stored = await storeRawData(data);
			console.log(stored);

	}catch(err){
			throw(err)
			continue;
		}
	}
	await browser.close();
	return scrapeResults;

}


//Okay, so now that ive put some data, together, it's time to store it in a way that's a bit more permanent
//--> what's left for me to do now is connect the db by simply requiring the db. however, I still need to create the models for the data
//
//
//
//scrapeAdPlacements();

module.exports = {
	getAllSubDomains,
	scrapeAdPlacements,

};

