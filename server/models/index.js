const {Sequelize} = require('sequelize')
const {sequelize} = require('../db')

//As far as the actual data itself, I should start by figuring out what i want, and why i want it
//--> I know that I want the ads, although I already know where they're from
//--> Why am i collecting this data? Ideally I just need data flowing from point a to point B with monitoring imbetween, but i'd rathernot leave it at that
//Data Im Collecting:
//Ads, Site title elements, images, and another kind of ad. I think that I actually to focus on makign the scraper a diagnostic tool. It could tell me how a specific site runs different parts of their site. This could give us good insight as to what's going on on their site purely from a design standpoint, as in it can test how well their frontend devs have done as far as implementation of our services. Additionally, it'll help us to solve problems involving ads and diagnosing what's going on just a bit faster.
//At this point in time, it's not really work the investment to create a built out scraping/crawling tool that'll be solely for diagnosis, hence the monitoring coming into play. If a tool like this is intrinsically tied into our backend, we'll be in a very strong spot. --> Ideally, what I'd like to show off in the project is just that the data that we collect on these sites IS important, and the monitoring that we perform against expected values in the DB can be very helpful.
//--> scrape the trail  and store the data
//--> first the data is to be cleaned. The "data",will be nearly every piece of information that we can grab from these sites
//--> next, once the dat is cleaned, it'll be stored elsewhere.
//--> from the clean data warehouse, what will happen it that we'll calculate/ analyze certain qualities of these bits of info. Maybe for the second tranformation, I'll analyze the ad-to-content ratio, and give a score of how well the user might receive the conent.
//--> The two pieces of background tech will be the frontend, and the actually "expected value monitoring"
//
//EVERRY TIME THAT I WORK ON THIS DATABASE/ THESE MODELS, AND I INTEND TO MAKE ANY CHANGE, THESE GOALS MUST BE REVIEWED.

const Item = sequelize.define("sites", {
  title: {
      type:Sequelize.STRING,
      allowNull:false
  },
  description:{
    type:Sequelize.STRING,
    allowNull:false
  },
  google_ads:{
    type:Sequelize.JSON,
    allowNull:false
  },
  quantity:{
    type:Sequelize.INTEGER,
    allowNull:false
  },
  images:{
    type:Sequelize.JSON,
    allowNull:false
  }

});

module.exports = {
	db: sequelize,
	Item
};
