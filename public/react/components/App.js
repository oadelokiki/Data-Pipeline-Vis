import React, { useState, useEffect } from 'react';
import apiURL from '../api';

export const App = () => {

		const [data, setData] = useState({});
		const [monitoring, setMonitoring] = useState({});

		const fetchRaw = async () =>{
			const response = await fetch(`${apiURL}/pipeline/rawdata`);
			const data = await response.json()
			setData(data);
			//change one k-v pair in the monitoring dict to reflect various points across the pipeline
		}
		const fetchClean = async () =>{
                        const response = await fetch(`${apiURL}/pipeline/cleandata`);
                        const data = await response.json()
                        setData(data);
                }

		const fetchAnalysis = async () =>{
                        const response = await fetch(`${apiURL}/pipeline/analysis`);
                        const data = await response.json()
                        setData(data);
                }
		
		const scrapeData = async () =>{
                        const response = await fetch(`${apiURL}/pipeline/scrapedata`);
                        const data = await response.json()
                        setData(data);
                }
		const monitor = async () => {
			//explain why there's bottleneck

			setData(monitoringResults);
		}
		return (
		<>
			<main>
			<h2> Domain Crawler and individual Site Scraper </h2>
			
			<button onClick = {scrapeData}> Scrape Data</button>

			<button onClick = {fetchRaw}> Raw Data </button>
			<button onClick = {fetchClean}> Clean Data</button>
		
			<button onClick = {fetchAnalysis}> Analysis </button>
			<button onClick = {monitor}> Monitoring </button>

			<div> { JSON.stringify(data)  } </div>
			</main>
		</>)
}
