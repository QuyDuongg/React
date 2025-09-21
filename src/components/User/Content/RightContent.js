import { get } from "lodash";
import CountDown from "./CountDown";

const RightContent = (props) => {
    const { dataQuiz, index } = props;
    const onTimeUp = () => {
        props.handleFinishQuiz();
    };
    const getClassQuestion = (questionIndex, dataQuiz) => {
        // console.log("dataQuiz", dataQuiz);
        let isSelected = dataQuiz[questionIndex].answers.some(
            (a) => a.issSelected === true
        );
        let isActive = questionIndex === props.index;

        if (isActive && isSelected) {
            return "question selected active";
        } else if (isActive) {
            return "question active";
        } else if (isSelected) {
            return "question selected";
        }
        return "question";
    };
    return (
        <>
            <div className="main-timer">
                <CountDown onTimeUp={onTimeUp}></CountDown>
            </div>
            <div className="main-question">
                {dataQuiz &&
                    dataQuiz.length > 0 &&
                    dataQuiz.map((item, index) => {
                        return (
                            <div
                                key={`question-abc-${index}`}
                                className={getClassQuestion(index, dataQuiz)}
                                onClick={() => {
                                    props.setIndex(index);
                                }}
                            >
                                {index + 1}
                            </div>
                        );
                    })}
            </div>
        </>
    );
};
export default RightContent;
