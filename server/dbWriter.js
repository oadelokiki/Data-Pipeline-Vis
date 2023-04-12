// a reference to the format in which the raw data is scraped
/*
 *{
  adData: [ {}, {} ],
  imgData: [
    {
      src: "data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20412%20600'%3E%3C/svg%3E",
      srcset: null,
      sizes: null
    },
    {
      src: "data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20412%20600'%3E%3C/svg%3E",
      srcset: null,
      sizes: null
    },
    {
      src: "data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20412%20600'%3E%3C/svg%3E",
      srcset: null,
      sizes: null
    },
    {
      src: "data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20100%20100'%3E%3C/svg%3E",
      srcset: null,
      sizes: null
    }
  ],
  adThriveData: [
    {},                    {},
    [],                    [],
    [],                    [],
    [],                    [],
    [ 'llOriginalAttrs' ], [ 'llOriginalAttrs' ],
    [ 'llOriginalAttrs' ], [],
    [],                    [],
    [ 'llOriginalAttrs' ], [],
    [],                    []
  ],
  siteTitles: [ {}, {} ],
  subdomain: 'https://www.gimmesomeoven.com/and-so-it-begins/'
}

 * */





const {db, RawSubdomain, syncDatabaseModels} = require("./models/index");



async function storeRawData(rsd){
	console.log("************************Now writing to the DB**********************");
	


		const dbSubdomain = await RawSubdomain.create(rsd);
		
		(dbSubdomain.subdomain + "written");		

	console.log("*************************Raw data written to the DB *********************");
	
	return dbSubdomain;
}


module.exports = {
	storeRawData, 

}

	


