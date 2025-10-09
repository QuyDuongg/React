import { useState, useEffect } from "react";
import Select from "react-select";
import "./QuizQA.scss";
import { BsFillPatchPlusFill } from "react-icons/bs";
import { BsPatchMinusFill } from "react-icons/bs";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { AiFillPlusSquare } from "react-icons/ai";
import { RiImageAddFill } from "react-icons/ri";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import Lightbox from "react-awesome-lightbox";
import {
    getAllQuizForAdmin,
    getQuizWithQA,
    postUpsertQA,
} from "../../../../services/apiService";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const QuizQA = (props) => {
    const { t } = useTranslation();
    const initQuestions = [
        {
            id: uuidv4(),
            description: "",
            imageFile: "",
            imageName: "",
            answers: [
                {
                    id: uuidv4(),
                    description: "",
                    isCorrect: false,
                },
            ],
        },
    ];
    const [questions, setQuestions] = useState(initQuestions);
    const [isPreviewImage, setIsPreviewImage] = useState(false);
    const [dataImagePreview, setDataImagePreview] = useState({
        title: "",
        url: "",
    });

    useEffect(() => {
        fetchQuiz();
    }, []);

    const [listQuiz, setListQuiz] = useState([]);
    const [selectedQuiz, setSelectedQuiz] = useState({});

    useEffect(() => {
        if (selectedQuiz && selectedQuiz.value) {
            fetchQuestion(selectedQuiz.value);
        }
    }, [selectedQuiz]);

    const fetchQuestion = async (quizId) => {
        let res = await getQuizWithQA(quizId);
        let newQuestion = [];

        for (let i = 0; i < res.DT.qa.length; i++) {
            let qa = res.DT.qa[i];
            // console.log("check newquestion", res.DT.qa[i]);
            if (qa.imageFile) {
                qa.imageFile = await urltoFile(
                    `data:img/png;base64,${qa.imageFile}`,
                    `Question-${i}`,
                    "text/plain"
                );
                qa.imageName = qa.imageFile.name;
            }
            newQuestion.push(qa);
        }
        // console.log("check newquestion", newQuestion);
        setQuestions(newQuestion);
    };

    // return a promise that resolves with a File instance
    function urltoFile(url, filename, mimeType) {
        if (url.startsWith("data:")) {
            var arr = url.split(","),
                mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[arr.length - 1]),
                n = bstr.length,
                u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            var file = new File([u8arr], filename, { type: mime || mimeType });
            return Promise.resolve(file);
        }
        return fetch(url)
            .then((res) => res.arrayBuffer())
            .then((buf) => new File([buf], filename, { type: mimeType }));
    }

    const fetchQuiz = async () => {
        let res = await getAllQuizForAdmin();
        if (res && res.EC === 0) {
            let newQuiz = res.DT.map((item) => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.description}`,
                };
            });
            setListQuiz(newQuiz);
        }
    };

    const handleAddRemoveQuestion = (type, id) => {
        if (type === "ADD") {
            const newQuestion = {
                id: uuidv4(),
                description: "",
                imageFile: "",
                imageName: "",
                answers: [
                    {
                        id: uuidv4(),
                        description: "",
                        isCorrect: false,
                    },
                ],
            };

            setQuestions([...questions, newQuestion]);
        }
        if (type === "REMOVE") {
            let questionsClone = _.cloneDeep(questions);
            questionsClone = questionsClone.filter((item) => item.id !== id);
            setQuestions(questionsClone);
        }
    };

    const handleAddRemoveAnswer = (type, questionId, anwserId) => {
        let questionsClone = _.cloneDeep(questions);
        if (type === "ADD") {
            const newAnswer = {
                id: uuidv4(),
                description: "",
                isCorrect: false,
            };

            let index = questionsClone.findIndex(
                (item) => item.id === questionId
            );
            questionsClone[index].answers.push(newAnswer);
            setQuestions(questionsClone);
        }
        if (type === "REMOVE") {
            let index = questionsClone.findIndex(
                (item) => item.id === questionId
            );
            questionsClone[index].answers = questionsClone[
                index
            ].answers.filter((item) => item.id !== anwserId);
            setQuestions(questionsClone);
        }
    };

    const handleOnChange = (type, questionId, value) => {
        if (type === "QUESTION") {
            let questionsClone = _.cloneDeep(questions);
            let index = questionsClone.findIndex(
                (item) => item.id === questionId
            );
            if (index > -1) {
                questionsClone[index].description = value;
                setQuestions(questionsClone);
            }
        }
    };
    const handleOnChangeFileQuestion = (questionId, event) => {
        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex((item) => item.id === questionId);
        if (index > -1 && event.target.files && event.target.files[0]) {
            questionsClone[index].imageFile = event.target.files[0];
            questionsClone[index].imageName = event.target.files[0].name;
            setQuestions(questionsClone);
        }
    };
    const handleAnswerQuestion = (type, answerId, questionId, value) => {
        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex((item) => item.id === questionId);
        if (index > -1) {
            questionsClone[index].answers = questionsClone[index].answers.map(
                (anwser) => {
                    if (anwser.id === answerId) {
                        if (type === "CHECKBOX") {
                            anwser.isCorrect = value;
                        }
                        if (type === "ANSWER") {
                            anwser.description = value;
                        }
                    }
                    return anwser;
                }
            );
            setQuestions(questionsClone);
        }
    };

    const handlePreviewImage = (questionId) => {
        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex((item) => item.id === questionId);
        if (index > -1) {
            setIsPreviewImage(true);
            setDataImagePreview({
                url: URL.createObjectURL(questionsClone[index].imageFile),
                title: questionsClone[index].imageName,
            });
        }
    };

    const handleSubmitQuestionForQuiz = async () => {
        //todo
        if (_.isEmpty(selectedQuiz)) {
            toast.error(t("admin.pleaseChooseQuiz"));
            return;
        }
        // validate data
        // validate answer
        let isValidAnswer = true;
        let indexQ = 0,
            indexA = 0;
        for (let i = 0; i < questions.length; i++) {
            for (let j = 0; j < questions[i].answers.length; j++) {
                if (!questions[i].answers[j].description) {
                    isValidAnswer = false;
                    indexA = j;
                    break;
                }
            }
            indexQ = i;
            if (isValidAnswer === false) {
                break;
            }
        }
        if (isValidAnswer === false) {
            toast.error(
                `${t("admin.notEmptyAnswer")} ${indexA + 1} ${t(
                    "admin.atQuestion"
                )} ${indexQ + 1}`
            );
            return;
        }
        // validate question
        let isValidQ = true;
        let indexQ1 = 0;
        for (let i = 0; i < questions.length; i++) {
            if (!questions[i].description) {
                isValidQ = false;
                indexQ = i;
                break;
            }
        }
        if (isValidQ === false) {
            toast.error(`${t("admin.notEmptyDescription")} ${indexQ + 1}`);
            return;
        }

        //convert file to base64
        const toBase64 = (file) =>
            new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = reject;
            });

        let cloneQuestions = _.cloneDeep(questions);
        for (let i = 0; i < cloneQuestions.length; i++) {
            if (cloneQuestions[i].imageFile) {
                cloneQuestions[i].imageFile = await toBase64(
                    cloneQuestions[i].imageFile
                );
            }
        }
        //submit question
        let res = await postUpsertQA({
            quizId: selectedQuiz.value,
            questions: cloneQuestions,
        });

        // console.log("check res", res);

        if (res && res.EC === 0) {
            toast.success(res.EM);
            // fetchQuestion();
        }

        setQuestions(initQuestions);
    };

    return (
        <div className="questions-container">
            <div className="add-new-question">
                <div className="col-6 form-group">
                    <label className="mb-2">{t("admin.selectQuiz")}</label>
                    <Select
                        defaultValue={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={listQuiz}
                    />
                </div>
                <div className="mt-3 mb-2 ">{t("admin.addQuestions")}</div>
                {questions &&
                    questions.length > 0 &&
                    questions.map((question, index) => {
                        return (
                            <div key={question.id} className="q-main mb-4">
                                <div className="questions-content">
                                    <div className="form-floating description">
                                        <input
                                            type="type"
                                            className="form-control"
                                            placeholder="name@example.com"
                                            value={question.description}
                                            onChange={(event) =>
                                                handleOnChange(
                                                    "QUESTION",
                                                    question.id,
                                                    event.target.value
                                                )
                                            }
                                        />
                                        <label>
                                            {t("admin.questionDescription")}{" "}
                                            {index + 1}
                                        </label>
                                    </div>
                                    <div className="group-upload">
                                        <label htmlFor={`${question.id}`}>
                                            <RiImageAddFill className="label-up" />
                                        </label>
                                        <input
                                            id={`${question.id}`}
                                            onChange={(event) =>
                                                handleOnChangeFileQuestion(
                                                    question.id,
                                                    event
                                                )
                                            }
                                            type={"file"}
                                            hidden
                                        />
                                        <span>
                                            {question.imageName ? (
                                                <span
                                                    style={{
                                                        cursor: "pointer",
                                                    }}
                                                    onClick={() =>
                                                        handlePreviewImage(
                                                            question.id
                                                        )
                                                    }
                                                >
                                                    {question.imageName}
                                                </span>
                                            ) : (
                                                `0 ${t("admin.fileUploaded")}`
                                            )}
                                        </span>
                                    </div>
                                    <div className="btn-add">
                                        <span
                                            onClick={() =>
                                                handleAddRemoveQuestion(
                                                    "ADD",
                                                    ""
                                                )
                                            }
                                        >
                                            <BsFillPatchPlusFill className="icon-add" />
                                        </span>
                                        {questions.length > 1 && (
                                            <span
                                                onClick={() =>
                                                    handleAddRemoveQuestion(
                                                        "REMOVE",
                                                        question.id
                                                    )
                                                }
                                            >
                                                <BsPatchMinusFill className="icon-remove" />
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {question.answers &&
                                    question.answers.length > 0 &&
                                    question.answers.map((answer, index) => {
                                        return (
                                            <div
                                                key={answer.id}
                                                className="answers-content"
                                            >
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    checked={answer.isCorrect}
                                                    onChange={(event) =>
                                                        handleAnswerQuestion(
                                                            "CHECKBOX",
                                                            answer.id,
                                                            question.id,
                                                            event.target.checked
                                                        )
                                                    }
                                                />
                                                <div className="form-floating ">
                                                    <input
                                                        value={`${answer.description}`}
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="name@example.com"
                                                        onChange={
                                                            (event) => {
                                                                handleAnswerQuestion(
                                                                    "ANSWER",
                                                                    answer.id,
                                                                    question.id,
                                                                    event.target
                                                                        .value
                                                                );
                                                            }
                                                            // console.log(
                                                            //     event.target
                                                            //         .value
                                                            // )
                                                        }
                                                    />
                                                    <label>
                                                        {t("admin.answers")}{" "}
                                                        {index + 1}{" "}
                                                    </label>
                                                </div>
                                                <div className="btn-group">
                                                    <span
                                                        onClick={() =>
                                                            handleAddRemoveAnswer(
                                                                "ADD",
                                                                question.id
                                                            )
                                                        }
                                                    >
                                                        <AiFillPlusSquare className="icon-add" />
                                                    </span>
                                                    {question.answers.length >
                                                        1 && (
                                                        <span
                                                            onClick={() =>
                                                                handleAddRemoveAnswer(
                                                                    "REMOVE",
                                                                    question.id,
                                                                    answer.id
                                                                )
                                                            }
                                                        >
                                                            <AiOutlineMinusCircle className="icon-remove" />
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>
                        );
                    })}
                {questions && questions.length > 0 && (
                    <div>
                        <button
                            className="btn btn-warning"
                            onClick={() => handleSubmitQuestionForQuiz()}
                        >
                            {t("admin.submitQuestions")}
                        </button>
                    </div>
                )}
            </div>
            {isPreviewImage === true && (
                <Lightbox
                    image={dataImagePreview.url}
                    title={dataImagePreview.title}
                    onClose={() => setIsPreviewImage(false)}
                />
            )}
        </div>
    );
};

export default QuizQA;
