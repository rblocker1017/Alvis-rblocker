### Project Design manual
This project was bootstraped using `yarn create react-app my-app`. There is alot of good documentation on React. I will provide some links. 
* https://create-react-app.dev/docs/getting-started/ 
* https://reactjs.org/tutorial/tutorial.html
* https://expressjs.com/ Express is used for the routing for the application. 

# CPU scheduling: 
- Dependencies: Uses react-google-charts gannt chart. https://react-google-charts.com/gantt-chart. 

CPU scheduling.js is the component that displays the Disk Scheduling page.
This component is a functional component. All variables the user defines are stored using React useState hook. Each algorithm has it's own function that passes and a different data to the GANTT chart. 

# Disk scheduling: 
- Dependencies: Uses react-google-charts gannt chart. https://react-google-charts.com/gantt-chart. 

DiskScheduling.js is the component that displays the Disk Scheduling page.
This component is a functional component. All variables the user defines are stored using React useState hook. Each algorithm has it's own function that passes and a different data to the Chart.
For this algorithm page it uses a separate component which takes the data in as a prop to draw the chart. This component is under the file DiskGraph.js. 

# Page replacement: 
This algorithm page is the same as the others but it doesn't use an outside library for the visualization. The visualization is created using a HTML table. This components structure is the same as the others. 

