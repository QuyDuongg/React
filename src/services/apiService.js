import { delay } from "lodash";
import axios from "../utils/axiosCustomize";
import FormData from "form-data";

const postCreateNewUser = async (data) => {
    const form = new FormData();
    form.append("email", data.Email);
    form.append("password", data.Password);
    form.append("username", data.Username);
    form.append("role", data.Role);
    form.append("userImage", data.Image);
    return await axios.post("/api/v1/participant", form);
};

const getAllUsers = async () => {
    return await axios.get("/api/v1/participant/all");
};
const putUpdateUser = async (data) => {
    const form = new FormData();
    form.append("id", data.Id);
    form.append("username", data.Username);
    form.append("role", data.Role);
    form.append("userImage", data.Image);
    return await axios.put("/api/v1/participant", form);
};

const deleteUser = async (userid) => {
    return await axios.delete("/api/v1/participant", { data: { id: userid } });
};
const getUserWithPaginate = async (page, limit) => {
    return await axios.get(
        `http://localhost:8081/api/v1/participant?page=${page}&limit=${limit}`
    );
};
const postLogin = async (userEmail, userPassword) => {
    return await axios.post("/api/v1/login", {
        email: userEmail,
        password: userPassword,
        delay: 1000,
    });

    // const postLogin = async (userEmail, userPassword) => {
    // return await axios.post("/api/v1/login", { userEmail, userPassword });
    // };
};
const postLogout = async (email,refresh_token) => {
    return await axios.post("/api/v1/logout",{email,refresh_token});
};

const postRegister = async (userEmail, userName, userPassword) => {
    return await axios.post("/api/v1/register", {
        email: userEmail,
        username: userName,
        password: userPassword,
    });
};

const getQuizByUser = async () => {
    return await axios.get("/api/v1/quiz-by-participant");
};

const getDataQuiz = async (id) => {
    return await axios.get(`/api/v1/questions-by-quiz?quizId=${id}`);
};

const postSubmitQuiz = async (data) => {
    return await axios.post("/api/v1/quiz-submit", { ...data });
};

const postCreateNewQuiz = async (description, name, difficulty, image) => {
    const data = new FormData();
    data.append("description", description);
    data.append("name", name);
    data.append("difficulty", difficulty);
    data.append("quizImage", image);
    return await axios.post("/api/v1/quiz", data);
};
const getAllQuizForAdmin = async () => {
    return await axios.get(`/api/v1/quiz/all`);
};
const putUpdateQuizForAdmin = (id, name, description, difficulty, image) => {
    const data = new FormData();
    data.append("id", id);
    data.append("description", description);
    data.append("name", name);
    data.append("difficulty", difficulty);
    data.append("quizImage", image);
    return axios.put("api/v1/quiz", data);
};

const deleteQuizForAdmin = (id) => {
    return axios.delete(`/api/v1/quiz/${id}`);
};

const postCreateNewQuestionForQuiz = (quiz_id, description, image) => {
    const data = new FormData();
    data.append("quiz_id", quiz_id);
    data.append("description", description);
    data.append("questionImage", image);

    return axios.post("api/v1/question", data);
};

const postCreateNewAnswerForQuestion = (
    description,
    correct_answer,
    question_id
) => {
    return axios.post("api/v1/answer", {
        description,
        correct_answer,
        question_id,
    });
};

const postAssignQuiz = (quizId, userId) => {
    return axios.post("api/v1/quiz-assign-to-user", { quizId, userId });
};

const getQuizWithQA = (quizId) => {
    return axios.get(`api/v1/quiz-with-qa/ ${quizId}`);
};

const postUpsertQA = (data) => {
    return axios.post(`api/v1/quiz-upsert-qa`,{...data})
}

export {
    postCreateNewUser,
    getAllUsers,
    putUpdateUser,
    deleteUser,
    getUserWithPaginate,
    postLogin,
    postRegister,
    getQuizByUser,
    getDataQuiz,
    postSubmitQuiz,
    postCreateNewQuiz,
    getAllQuizForAdmin,
    putUpdateQuizForAdmin,
    deleteQuizForAdmin,
    postCreateNewAnswerForQuestion,
    postCreateNewQuestionForQuiz,
    postAssignQuiz,
    getQuizWithQA, postUpsertQA,postLogout,
};
