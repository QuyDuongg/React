import "./DashBoard.scss";
import {
    BarChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Legend,
    Tooltip,
    Bar,
} from "recharts";
const DashBoard = () => {
    const data = [
        {
            quiz: 50,
        },
        {
            question: 100,
        },
        {
            users: 30,
        },
    ];
    return (
        <div className="dashboard-container">
            <div className="header">Analytics DashBoard</div>
            <div className="content">
                <div className="c-left">
                    <div>Total Users</div>
                    <div>Total Quizzes</div>
                    <div>Total Questions</div>
                    <div>Total Answers</div>
                </div>
                <div className="c-right">
                    <BarChart width={580} height={400} data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="pv" fill="#8884d8" />
                        <Bar dataKey="uv" fill="#82ca9d" />
                    </BarChart>
                </div>
            </div>
        </div>
    );
};
export default DashBoard;
