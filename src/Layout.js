import { Route, Routes } from "react-router-dom";
import App from "./App";
import User from "./components/User/User";
import ListQuiz from "./components/User/ListQuiz";
import Admin from "./components/Admin/Admin";
import Home from "./components/Home/Homepage";
import DashBoard from "./components/Admin/Content/DashBoard.js";
import ManageUser from "./components/Admin/Content/ManageUser";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import DetailQuiz from "./components/User/DetailQuiz.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ManageQuiz from "./components/Admin/Content/Quiz/ManageQuiz.js";
import Questions from "./components/Admin/Content/Question/Questions.js";
import PrivateRoute from "./routes/privateRoute";
import { useTranslation } from "react-i18next";
const NotFound = () => {
    const { t } = useTranslation();
    return (
        <div className="container mt-3 alert alert-danger">
            {t("errors.notFound")}
        </div>
    );
};

const Layout = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<Home />} />
                    <Route
                        path="/users"
                        element={
                            <PrivateRoute>
                                <ListQuiz />
                            </PrivateRoute>
                        }
                    />
                </Route>
                <Route path="/quiz/:id" element={<DetailQuiz />} />
                <Route
                    path="/admins"
                    element={
                        <PrivateRoute>
                            <Admin />
                        </PrivateRoute>
                    }
                >
                    <Route index element={<DashBoard />} />
                    <Route path="manage-users" element={<ManageUser />} />
                    <Route path="manage-quizzes" element={<ManageQuiz />} />
                    <Route path="manage-questions" element={<Questions />} />
                </Route>
                <Route path="/login" element={<Login></Login>} />
                <Route path="/register" element={<Register></Register>} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    );
};
export default Layout;
