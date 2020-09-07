import React, { useState, useEffect } from "react";
import Chart from "react-google-charts";
import axios from 'axios';
import API from "./APIHelper";

function UserPerformance() {
  const [performance, setPerformance] = useState([])

  async function fetchDetails() {

    API.fetchPerfomance().then(function (response) {
      return response.data.data;
    }).then(function (performance) {
      setPerformance(performance);
      console.log(performance)
      
    });
  }
  useEffect(() => {
    fetchDetails();
  }, []);


  return (
    <div>
      <div>
        <p className="profileName">My Perfomance</p>
      </div>
      <Chart
  width={'100%'}
  height={'300px'}
  chartType="BarChart"
  loader={<div>Loading Chart</div>}
    
  
  data={[
    ['JobFairDate', 'Applied', 'Appeared','Selected'],
    ...performance.map((item) => ([
      new Date(item.jobFairDate).toDateString(),
      item.applied,
      item.appeared,
      item.selected
    ]))
  ]}
  options={{
    title: 'Your performance',
    chartArea: { width: '50%' },
    colors: ['#121B74', '#0075f6','#5893d4'],
    hAxis: {
      title: 'Performance',
      minValue: 0,
    },
    vAxis: {
      title: 'Job Fair conducted on',
    },
  }}
  rootProps={{ 'data-testid': '1' }}
/>
      
    </div>

  );
}
export default UserPerformance;