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
 * */
const siteList = require("../siteList.json");
const fetch = require("node-fetch")
const extractUrls = require("extract-urls")

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

async function scrapeAdPlacements(){
	
	const subdomains = await getAllSubDomains();
	//Array of subdomains from the main site.
	//
	for(let i = 0; i < subdomains.length; i++){
		const site = await fetch(subdomains[i]);
		const siteHTML = await site.text();

		//this is the part where I SHOULD put the data into a sequelize model, but I'll fully load in memory, and realease the long list of subdomains once it's all loaded.

		console.log(siteHTML);


	}
}

scrapeAdPlacements();

module.exports = {
	getAllSubDomains,
	scrapeAdPlacements,

};

