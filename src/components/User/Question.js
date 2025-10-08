import _ from "lodash";
import { useState } from "react";
import Lightbox from "react-awesome-lightbox";
import { useTranslation } from "react-i18next";
const Question = (props) => {
    const { data, index } = props;
    const [isPreviewImage, setIsPreviewImage] = useState(false);
    const { t } = useTranslation();
    if (_.isEmpty(data)) return <></>;

    const handleHandleCheckbox = (event, aId, qId) => {
        props.handleCheckbox(aId, qId);
    };
    return (
        <>
            {data.image ? (
                <div className="q-image">
                    <img
                        style={{ cursor: "pointer" }}
                        onClick={() => setIsPreviewImage(true)}
                        src={`data:image/jpeg;base64,${data.image}`}
                    ></img>
                </div>
            ) : (
                <div className="q-image"></div>
            )}
            {isPreviewImage && (
                <Lightbox
                    image={`data:image/jpeg;base64,${data.image}`}
                    title={t("quiz.questionImage")}
                    onClose={() => setIsPreviewImage(false)}
                />
            )}

            <div className="question">
                {t("quiz.question")} {index + 1} : {data.questionDescription}
            </div>
            {/* {console.log("data", data)} */}
            <div className="answer">
                {data.answers &&
                    data.answers.length &&
                    data.answers.map((a, index) => {
                        return (
                            <div className="a-child" key={`answer-${index}`}>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={a.issSelected}
                                        onChange={(event) => {
                                            handleHandleCheckbox(
                                                event,
                                                a.id,
                                                data.questionId
                                            );
                                        }}
                                    />
                                    <label className="form-check-label">
                                        {a.description}
                                    </label>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </>
    );
};

export default Question;
