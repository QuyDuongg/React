import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDataQuiz, postSubmitQuiz } from "../../services/apiService";
import _, { set } from "lodash";
import "./DetailQuiz.scss";
import Question from "./Question";
import ModalResult from "./ModalResult";
import RightContent from "./Content/RightContent";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { NavLink } from "react-router-dom";

const DetailQuiz = () => {
    const params = useParams();
    const quizId = params.id;
    const location = useLocation();

    const [dataQuiz, setDataQuiz] = useState([]);
    const [index, setIndex] = useState(0);

    const [isShowModalResult, setIsShowModalResult] = useState(false);
    const [dataModalResult, setDataModalResult] = useState({});

    useEffect(() => {
        fetchQuestion();
    }, [quizId]);

    const fetchQuestion = async () => {
        let res = await getDataQuiz(quizId);

        if (res && res.EC === 0) {
            let raw = res.DT;
            let data = _.chain(raw)
                //Group the elements of array based on 'id' property
                .groupBy("id")
                //'key' is group'name (color),"value " is the array of objects
                .map((value, key) => {
                    let answers = [];
                    let questionDescription,
                        image = "";
                    value.forEach((item, index) => {
                        if (index === 0) {
                            questionDescription = item.description;
                            image = item.image;
                        }
                        item.answers.issSelected = false;
                        answers.push(item.answers);
                    });
                    answers = _.orderBy(answers, ["id"], ["asc"]);
                    return {
                        questionId: key,
                        answers,
                        questionDescription,
                        image,
                    };
                })
                .value();
            setDataQuiz(data);
        }
    };

    const handlePrev = () => {
        if (index - 1 < 0) return;
        setIndex(index - 1);
    };
    const handleNext = () => {
        if (index < dataQuiz.length - 1) {
            setIndex(index + 1);
        }
    };

    const handleCheckbox = (answerId, questionId) => {
        let dataQuizClone = _.cloneDeep(dataQuiz); // react hook doesn't merge state
        let question = dataQuizClone.find(
            (item) => +item.questionId === +questionId
        );
        if (question && question.answers) {
            question.answers = question.answers.map((item) => {
                if (+item.id === +answerId) {
                    item.issSelected = !item.issSelected;
                }
                return item;
            });
        }
        let index = dataQuizClone.findIndex(
            (item) => +item.questionId === +questionId
        );
        if (index > -1) {
            dataQuizClone[index] = question;
            setDataQuiz(dataQuizClone);
        }
    };
    const handleFinishQuiz = async () => {
        let payload = {
            quizId: +quizId,
            answers: [],
        };
        let answers = [];
        if (dataQuiz && dataQuiz.length > 0) {
            dataQuiz.forEach((question) => {
                let questionId = question.questionId;
                let userAnswerId = [];

                question.answers.forEach((a) => {
                    if (a.issSelected === true) {
                        userAnswerId.push(a.id);
                    }
                });
                answers.push({
                    questionId: +questionId,
                    userAnswerId: userAnswerId,
                });
            });
            payload.answers = answers;
            console.log("payload", payload);
            //sumit api
            let res = await postSubmitQuiz(payload);
            console.log("res", res);
            if (res && res.EC === 0) {
                setDataModalResult({
                    countCorrect: res.DT.countCorrect,
                    countTotal: res.DT.countTotal,
                    quizData: res.DT.quizData,
                });
                setIsShowModalResult(true);
            } else {
                alert("something wrong with api");
            }
            console.log("dataModalResult", dataModalResult);
        }
    };

    return (
        <>
            <Breadcrumb className="breadcrumb">
                <NavLink to="/" className="breadcrumb-item">
                    Home
                </NavLink>

                <NavLink to="/users" className="breadcrumb-item">
                    Users
                </NavLink>

                <Breadcrumb.Item active>Quiz {quizId}</Breadcrumb.Item>
            </Breadcrumb>

            <div className="detail-quiz-container">
                <div className="left-content">
                    <div className="title">
                        Quiz: {quizId} : {location?.state?.quizTitle}
                    </div>
                    <hr></hr>
                    <div className="q-content">
                        <Question
                            index={index}
                            handleCheckbox={handleCheckbox}
                            data={
                                dataQuiz && dataQuiz.length > 0
                                    ? dataQuiz[index]
                                    : []
                            }
                        />
                    </div>
                    <div className="footer">
                        <button
                            className="btn btn-secondary"
                            onClick={() => {
                                handlePrev();
                            }}
                        >
                            Prev
                        </button>
                        <button
                            className="btn btn-primary"
                            onClick={() => {
                                handleNext();
                            }}
                        >
                            Next
                        </button>
                        <button
                            className="btn btn-warning"
                            onClick={() => handleFinishQuiz()}
                        >
                            Finish
                        </button>
                    </div>
                </div>
                <div className="right-content">
                    <RightContent
                        dataQuiz={dataQuiz}
                        handleFinishQuiz={handleFinishQuiz}
                        setIndex={setIndex}
                        index={index}
                    ></RightContent>
                </div>
                <ModalResult
                    show={isShowModalResult}
                    setShow={setIsShowModalResult}
                    dataModalResult={dataModalResult}
                ></ModalResult>
            </div>
        </>
    );
};
export default DetailQuiz;
