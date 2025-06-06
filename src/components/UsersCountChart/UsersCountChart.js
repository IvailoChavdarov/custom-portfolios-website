import { CDBContainer } from "cdbreact";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(
  CategoryScale, 
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


export default function UsersCountChart({developersCount, recruitersCount}){
    const data = {
        labels: ['Developers', 'Recruiters'],
        datasets: [
            {
                label: 'Total',
                data: [developersCount, recruitersCount],
                backgroundColor: ['rgba(54, 162, 235, 0.8)', 'rgba(239, 109, 0, 0.8)'],
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            title: {
                display: false,
                text: 'Registered users by type',
            },
            legend: {
                display: false,
            },
        },
    }
    return (
        <CDBContainer className="p-4 shadow-sm analytic">
            <h4>Registered Users by Type</h4>
            <Bar data={data} options={options} />
        </CDBContainer>

    )
}