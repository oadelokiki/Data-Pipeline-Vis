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

async function getAllSubDomains(){
	//should scrape the sitemap_index.xml for all of the sites.xml(s)
	//each list should then be scraped, fetching each of the domains available on that site.
	//
	const sitemap_index = await fetch(siteList["sites"] + "sitemap.xml");
	const sites_on_map  = await sitemap_index.text();
	const locations = extractUrls(sites_on_map);

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

	
	const subdomains = await getAllSubDomains();
	console.log("Here's a cleaned list of all subdomains that have actual html page content.")
	console.log(subdomains);
	//Array of subdomains from the main site.
	var exampleCounter = 0;
	 const browser = await puppeteer.launch();
	const page = await browser.newPage();
         await page.setDefaultNavigationTimeout(0);

	for(let i = 0; i < subdomains.length; i++){
/*
		const site = await fetch(subdomains[i]);
		const siteHTML = await site.text();
		
		
	

		const htmlDoc = parse(siteHTML);

		//does this refer to the way that I actually see the element in the DOM
		for(let j = 0; j < htmlDoc.length; j++){
			console.log(htmlDoc[j]);
		}
		break;
		//console.log(siteHTML);			
	*/
		try{
		

	
        	  await page.goto(subdomains[i], {waitUntil: "load"});

			  // Set screen size
			await page.setViewport({width: 1080, height: 1024});
			const data = await page.evaluate( () => {
				const siteList = {"AdPlacementTypes":["AdThrive", "google_ads"]}

				const adData = [];
				const imgData = [];
				const adThriveData =[];

		///This for loop searches for all ads	
			for(let ads = 0 ; ads < siteList["AdPlacementTypes"].length; ads++){

				let datum2 = document.querySelectorAll("[id *= " + siteList["AdPlacementTypes"][ads] + "]");	
				//only doing this so tha tI can ensure we're getting unique values
				for(let d = 0 ; d < datum2.length; d++){
					adData.push(datum2[d])

					
					//this next part should start to reveal to me how i'd like to set up my sequelize models
				}
					
			
			}

			let datum = document.querySelectorAll("[class ^= " + "adthrive" + "]");
			for(let one = 0 ; one < datum.length; one ++ ){
				adThriveData.push(Object.keys(datum[one]));
			}

		//This next for loop is going to search for all images
			let images = document.querySelectorAll("img")
			for (let p = 0; p < images.length; p++){
				if (Object.keys(images[p]).length == 0){
					continue;
				}
				else{
					imgData.push(images[p]['llOriginalAttrs']);
				}	
			}
		//I can start to extract this seemingly random data from the sites, but what's the point?
			return {"adData": [... new Set(adData)], "imgData" : [... new Set(imgData)],"adThriveData": adThriveData};
			})
		  	
		 	//usually i'd close the broweser on this lien 
			console.log(data);
	
		
//			if (i == 30){
//				break;
//			}
		}catch(err){
			continue;
		}
	}
	await browser.close();
}


scrapeAdPlacements();
//Okay, so now that ive put some data, together, it's time to store it in a way that's persistent.
module.exports = {
	getAllSubDomains,
	scrapeAdPlacements,

};

