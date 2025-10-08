import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useTranslation } from "react-i18next";

const ModalResult = (props) => {
    const { show, setShow, dataModalResult } = props;
    const { t } = useTranslation();

    const handleClose = () => setShow(false);

    return (
        <>
            <Modal show={show} onHide={handleClose} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>{t("quiz.result")}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        {t("quiz.totalQuestions")}:{" "}
                        <b>{dataModalResult.countTotal}</b>
                    </div>
                    <div>
                        {t("quiz.correctAnswers")}:{" "}
                        <b>{dataModalResult.countCorrect}</b>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        {t("common.showAnswers")}
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        {t("common.close")}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalResult;
