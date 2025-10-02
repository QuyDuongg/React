import "./DashBoard.scss";
import { getDashboardData } from "../../../services/apiService";
import { useEffect, useState } from "react";

import {
    ResponsiveContainer,
    BarChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Legend,
    Tooltip,
    Bar,
} from "recharts";
const DashBoard = () => {
    const [dataUsers, setDataUsers] = useState([]);
    const [dataDashboard, setDataDashboard] = useState([]);

    useEffect(() => {
        getData();
    }, []);
    const getData = async () => {
        let res = await getDashboardData();
        if (res && res.DT && res.DT.users) {
            setDataUsers(res.DT.users);
        }
        if (res && res.DT && res.DT.others) {
            setDataDashboard(res.DT.others);
        }
    };
    console.log("....", dataUsers);

    const data = [
        {
            name: "Quizzes",
            Qz: dataDashboard.countQuiz,
        },
        {
            name: "Questions",
            Qs: dataDashboard.countQuestions,
        },
        {
            name: "Answers",
            As: dataDashboard.countAnswers,
        },
    ];
    return (
        <div className="dashboard-container">
            <div className="header">Analytics DashBoard</div>
            <div className="content">
                <div className="c-left">
                    <div>
                        <span>Total Users</span>
                        <span> {dataUsers.total}</span>
                    </div>
                    <div>
                        <span>Total Quizzes</span>
                        <span>{dataDashboard.countQuiz}</span>
                    </div>
                    <div>
                        <span>Total Questions</span>
                        <span>{dataDashboard.countQuestions}</span>
                    </div>
                    <div>
                        <span>Total Answers</span>
                        <span>{dataDashboard.countAnswers}</span>
                    </div>
                </div>
                <div className="c-right">
                    <ResponsiveContainer width="95%" height="100%">
                        <BarChart data={data}>
                            <XAxis dataKey="name" />

                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Qz" fill="#8884d8" />
                            <Bar dataKey="Qs" fill="#82ca9d" />
                            <Bar dataKey="As" fill="#" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};
export default DashBoard;
