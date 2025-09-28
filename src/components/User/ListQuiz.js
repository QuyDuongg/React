import { useEffect } from "react";
import { useState } from "react";
import { getQuizByUser } from "../../services/apiService";
import "./ListQuiz.scss";
import { useNavigate } from "react-router-dom";
import { startTransition } from "react";
import { useTranslation } from "react-i18next";

const ListQuiz = (props) => {
    const navigate = useNavigate();
    const [arrQuiz, setArrQuiz] = useState([]);
    const { t } = useTranslation();
    useEffect(() => {
        getQuizData();
    }, []);
    const getQuizData = async () => {
        let res = await getQuizByUser();
        // console.log("check quiz by user", res.DT);
        if (res && res.EC === 0) {
            setArrQuiz(res.DT);
        }
    };

    return (
        <div className="list-quiz-container container">
            {arrQuiz.map((quiz, index) => {
                return (
                    <div
                        key={`${index}-quiz`}
                        className="card"
                        style={{ width: "18rem" }}
                    >
                        <img
                            src={`data:image/jpeg;base64,${quiz.image}`}
                            className="card-img-top"
                            alt="img"
                        ></img>
                        <div className="card-body">
                            <h5 className="card-title">{t("quiz.quiz")} {index + 1}</h5>
                            <p className="card-text">{quiz.description}</p>
                            <button
                                className="btn btn-primary"
                                onClick={() => {
                                    startTransition(() => {
                                        navigate(`/quiz/${quiz.id}`, {
                                            state: {
                                                quizTitle: quiz.description,
                                            },
                                        });
                                    });
                                }}
                            >
                                {t("quiz.startNow")}
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
export default ListQuiz;
