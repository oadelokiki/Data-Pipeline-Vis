import React, { useState, useEffect } from 'react';
import apiURL from '../api';

export const App = () => {

		const [data, setData] = useState({});
		const [monitoring, setMonitoring] = useState({
			"raw":0,
			"clean": 0,
			"analysis": 0,

		});

		const fetchRaw = async () =>{
			const response = await fetch(`${apiURL}/pipeline/rawdata`);
			const data = await response.json()
			setData(data);
			//change one k-v pair in the monitoring dict to reflect various points across the pipeline
			const monitoringBuffer = {
				"raw": Object.keys(data).length,
				"clean": monitoring["clean"],
				"analysis" : monitoring["analysis"]
			};

			setMonitoring(monitoringBuffer);

			
		}
		const fetchClean = async () =>{
                        const response = await fetch(`${apiURL}/pipeline/cleandata`);
                        const data = await response.json()
                        setData(data);

			const monitoringBuffer = {
                                "clean": Object.keys(data).length,
                                "raw": monitoring["raw"],
                                "analysis" : monitoring["analysis"]
                        };

                        setMonitoring(monitoringBuffer);

                }

		const fetchAnalysis = async () =>{
                        const response = await fetch(`${apiURL}/pipeline/analysis`);
                        const data = await response.json()
                        setData(data);

			const monitoringBuffer = {
                                "analysis": Object.keys(data).length,
                                "clean": monitoring["clean"],
                                "raw" : monitoring["raw"]
                        };

                        setMonitoring(monitoringBuffer);

                }
		
		const scrapeData = async () =>{
                        const response = await fetch(`${apiURL}/pipeline/scrapedata`);
                        const data = await response.json()
                        setData(data);
                }
		const monitor = async () => {
			//explain why there's bottleneck

			setMonitoring(monitoring);
		}
		return (
		<>
			<main>
			<h2> Domain Crawler and individual Site Scraper </h2>
			<div> Monitoring Results: {
				JSON.stringify(monitoring)
			} </div>

			<div>As a result of cleaning/security, I lost { (1 - ( monitoring["clean"] / monitoring["raw"])) * 100 } percent of the data scraped originally</div>
			<div> AS a result database bottleneck I dont have acces to {(1 -( monitoring["analysis"] / monitoring["clean"])) * 100 } percent of my clean data </div>
			
			<button onClick = {scrapeData}> Scrape Data</button>

			<button onClick = {fetchRaw}> Raw Data </button>
			<button onClick = {fetchClean}> Clean Data</button>
		
			<button onClick = {fetchAnalysis}> Analysis </button>
			<button onClick = {monitor}> Update Monitoring </button>

			<div> { JSON.stringify(data)  } </div>
			</main>
		</>)
}
