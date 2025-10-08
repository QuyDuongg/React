import "./ManageQuiz.scss";
import Select from "react-select";
import { useState } from "react";
import { postCreateNewQuiz } from "../../../../services/apiService";
import { toast, Toast } from "react-toastify";
import TableQuiz from "./TableQuiz";
import Accordion from "react-bootstrap/Accordion";
import AssignQuiz from "./AssignQuiz";
import QuizQA from "./QuizQA";
import { useTranslation } from "react-i18next";

const options = [
    { value: "EASY", label: "EASY" },
    { value: "MEDIUM", label: "MEDIUM" },
    { value: "HARD", label: "HARD" },
];
const ManageQuiz = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("EASY");
    const [image, setImage] = useState("");
    const { t } = useTranslation();

    const handleChangeFile = (e) => {
        if (e.target && e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleSubmitQuiz = async () => {
        if (!name || !description) {
            toast.error(t("messages.nameDescriptionRequired"));
            return;
        }
        let res = await postCreateNewQuiz(
            description,
            name,
            type?.value,
            image
        );
        if (res && res.EC === 0) {
            toast.success(t("messages.quizCreateSuccess"));
            setName("");
            setDescription("");
            setType("EASY");
            setImage(null);
        } else {
            toast.error(t("messages.quizCreateFailed"));
        }
    };
    return (
        <div className="quiz-container">
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>{t("admin.manageQuiz")}</Accordion.Header>
                    <Accordion.Body>
                        <div className="add-new">
                            <fieldset className="border rounded-3 p-3">
                                <legend className="float-none w-auto px-3">
                                    {t("admin.addNewQuiz")}
                                </legend>
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="your quiz name"
                                        value={name}
                                        onChange={(event) =>
                                            setName(event.target.value)
                                        }
                                    />
                                    <label>{t("admin.name")}</label>
                                </div>
                                <div className="form-floating">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="description"
                                        value={description}
                                        onChange={(event) =>
                                            setDescription(event.target.value)
                                        }
                                    />
                                    <label>{t("admin.description")}</label>
                                </div>
                                <div className="my-3">
                                    <Select
                                        defaultValue={type}
                                        onChange={setType}
                                        options={options}
                                        placeholder="Quiz type..."
                                    />
                                </div>
                                <div className="more-actions form-group">
                                    <label className="mb-1">
                                        {t("admin.uploadImage")}
                                    </label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        onChange={(event) =>
                                            handleChangeFile(event)
                                        }
                                    />
                                </div>
                                <div className="mt-3">
                                    <button
                                        className="btn btn-warning"
                                        onClick={() => {
                                            handleSubmitQuiz();
                                        }}
                                    >
                                        {" "}
                                        {t("admin.save")}
                                    </button>
                                </div>
                            </fieldset>
                        </div>
                        <div className="list-detail">
                            <TableQuiz></TableQuiz>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>{t("admin.updateQA")}</Accordion.Header>
                    <Accordion.Body>
                        <QuizQA></QuizQA>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>
                        {t("admin.assignToUsers")}
                    </Accordion.Header>
                    <Accordion.Body>
                        <AssignQuiz></AssignQuiz>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    );
};

export default ManageQuiz;
