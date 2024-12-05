import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';
  
  // Register the required Chart.js components for the bar chart to work
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
  
  const Visualization = ({ predictions }) => {
    // Define the data object for the bar chart
    const data = {
      // Use the predictions prop for labels
      labels: predictions.map((pred) => pred.courseCode),
      datasets: [
        {
          label: 'Predicted Enrollment', //!!!!!!!!!!!!!!!!!!! Legend label for the dataset
          // Use the predictions prop for data values
          data: predictions.map((pred) => pred.predictedEnrollment),
          // Background colors for each bar (distinct colors)
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)', // Red
            'rgba(54, 162, 235, 0.6)', // Blue
            'rgba(255, 206, 86, 0.6)', // Yellow
            'rgba(75, 192, 192, 0.6)', // Green
            'rgba(153, 102, 255, 0.6)', // Purple
            'rgba(255, 159, 64, 0.6)', // Orange
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)', // Red
            'rgba(54, 162, 235, 1)', // Blue
            'rgba(255, 206, 86, 1)', // Yellow
            'rgba(75, 192, 192, 1)', // Green
            'rgba(153, 102, 255, 1)', // Purple
            'rgba(255, 159, 64, 1)', // Orange
          ],
          borderWidth: 1, // Border width for the bars
        },
      ],
    };
  
    // Define the chart options for better visualization and interactivity
    const options = {
      responsive: true, // Makes the chart responsive to screen size
      plugins: {
        legend: {
          position: 'top', // Position the legend at the top of the chart
        },
        title: {
          display: true, // Enable the title display
          text: 'Predicted Enrollment and Sections by Course for the next year', // !!!!!!!!!!Chart title
        },
      },
    };
  
    return (
      <div>
        {/* Bar chart rendering */}
        <Bar data={data} options={options} />
      </div>
    );
  };
  
  export default Visualization;
  