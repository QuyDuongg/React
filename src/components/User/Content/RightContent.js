import { get } from "lodash";
import CountDown from "./CountDown";

const RightContent = (props) => {
    const { dataQuiz } = props;
    const onTimeUp = () => {
        props.handleFinishQuiz();
    };
    const getClassQuestion = (index, dataQuiz) => {
        // console.log("dataQuiz", dataQuiz);
        let isSelected = dataQuiz[index].answers.some(
            (a) => a.issSelected === true
        );
        if (isSelected) {
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
