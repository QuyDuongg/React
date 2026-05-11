import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { FcPlus } from "react-icons/fc";
import { putUpdateUser, getQuizByUser } from "../../services/apiService";
import { doLogin } from "../../redux/action/userAction";

const ModalViewUser = (props) => {
    const { show, setShow } = props;
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const account = useSelector((state) => state.user.account);
    const navigate = useNavigate();

    const [activeKey, setActiveKey] = useState("home");
    const [imageFile, setImageFile] = useState(null);
    const [preview, setPreview] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [history, setHistory] = useState([]);
    const [loadingHistory, setLoadingHistory] = useState(false);
    const [saving, setSaving] = useState(false);

    const defaultImagePreview = useMemo(() => {
        if (!account?.image) return "";
        return account.image.startsWith("data:")
            ? account.image
            : `data:image/jpeg;base64,${account.image}`;
    }, [account?.image]);

    useEffect(() => {
        if (!show) return;
        setImageFile(null);
        setPreview(defaultImagePreview);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setActiveKey("home");
        fetchHistory();
    }, [show, defaultImagePreview]);

    const fetchHistory = async () => {
        setLoadingHistory(true);
        try {
            const res = await getQuizByUser();
            if (res && res.EC === 0) {
                setHistory(res.DT || []);
            } else {
                setHistory([]);
            }
        } catch (error) {
            setHistory([]);
        } finally {
            setLoadingHistory(false);
        }
    };

    const handleClose = () => {
        setShow(false);
    };

    const handleUploadImage = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImageFile(event.target.files[0]);
            setPreview(URL.createObjectURL(event.target.files[0]));
        }
    };

    const validateForm = () => {
        if (newPassword || confirmPassword || currentPassword) {
            if (!newPassword) {
                toast.error(
                    t("auth.validation.passwordRequired") ||
                        "New password is required",
                );
                return false;
            }
            if (newPassword !== confirmPassword) {
                toast.error(
                    t("auth.validation.passwordMismatch") ||
                        "Passwords do not match",
                );
                return false;
            }
        }
        return true;
    };

    const handleSave = async () => {
        if (!validateForm()) {
            return;
        }
        setSaving(true);
        try {
            const payload = {
                Id: account?.id,
                Username: account?.username,
                Role: account?.role,
                Image: imageFile,
            };
            if (newPassword) {
                payload.Password = newPassword;
            }
            const res = await putUpdateUser(payload);
            if (res && res.EC === 0) {
                toast.success(
                    res.EM ||
                        t("messages.updateSuccess") ||
                        "Profile updated successfully",
                );
                const updatedAccount = {
                    access_token: account?.access_token,
                    refresh_token: account?.refresh_token,
                    username: account?.username,
                    image: res?.DT?.image || account?.image,
                    role: account?.role,
                    email: account?.email,
                };
                dispatch(doLogin({ DT: updatedAccount }));
                setPreview(
                    res?.DT?.image
                        ? res.DT.image.startsWith("data:")
                            ? res.DT.image
                            : `data:image/jpeg;base64,${res.DT.image}`
                        : preview,
                );
                setCurrentPassword("");
                setNewPassword("");
                setConfirmPassword("");
            } else {
                toast.error(res?.EM || t("common.error") || "Update failed");
            }
        } catch (error) {
            toast.error(t("common.error") || "Update failed");
        } finally {
            setSaving(false);
        }
    };

    const handleReviewQuiz = (quiz) => {
        if (!quiz?.id) return;
        navigate(`/quiz/${quiz.id}`, {
            state: {
                quizTitle: quiz.description || quiz.name,
                fromHistory: true,
            },
        });
    };

    const displayedImage = preview || defaultImagePreview;

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                size="xl"
                backdrop="static"
                className="modal-add-user"
            >
                <Modal.Header closeButton>
                    <Modal.Title>{t("header.profile")}</Modal.Title>
                </Modal.Header>
                <Tabs
                    activeKey={activeKey}
                    onSelect={(k) => setActiveKey(k)}
                    id="uncontrolled-tab-example"
                    className="mb-3"
                >
                    <Tab
                        eventKey="home"
                        title={t("user.profile") || t("header.profile")}
                    >
                        <Modal.Body>
                            <form className="row g-3">
                                <div className="col-md-6">
                                    <label className="form-label">
                                        {t("admin.username")}
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={account?.username || ""}
                                        disabled
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">
                                        {t("admin.email")}
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        value={account?.email || ""}
                                        disabled
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">
                                        {t("admin.role")}
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={account?.role || ""}
                                        disabled
                                    />
                                </div>
                                <div className="col-md-12">
                                    <label
                                        className="form-label label-upload"
                                        htmlFor="profileImageUpload"
                                    >
                                        <FcPlus /> {t("admin.uploadImage")}
                                    </label>
                                    <input
                                        type="file"
                                        id="profileImageUpload"
                                        hidden
                                        accept="image/*"
                                        onChange={handleUploadImage}
                                    />
                                </div>
                                <div className="col-md-12 img-preview text-center">
                                    {displayedImage ? (
                                        <img
                                            src={displayedImage}
                                            alt="User avatar"
                                            className="img-fluid rounded"
                                            style={{ maxHeight: 220 }}
                                        />
                                    ) : (
                                        <div className="border rounded d-flex align-items-center justify-content-center p-4">
                                            {t("admin.uploadImage")}
                                        </div>
                                    )}
                                </div>
                            </form>
                        </Modal.Body>
                    </Tab>
                    <Tab
                        eventKey="profile"
                        title={t("admin.password") || "Change Password"}
                    >
                        <Modal.Body>
                            <form className="row g-3">
                                <div className="col-md-4">
                                    <label className="form-label">
                                        {t("auth.login.password")}
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={currentPassword}
                                        onChange={(e) =>
                                            setCurrentPassword(e.target.value)
                                        }
                                        placeholder={t(
                                            "auth.validation.passwordRequired",
                                        )}
                                    />
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label">
                                        {t("auth.register.password")}
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={newPassword}
                                        onChange={(e) =>
                                            setNewPassword(e.target.value)
                                        }
                                        placeholder={t(
                                            "auth.validation.invalidPassword",
                                        )}
                                    />
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label">
                                        {t("auth.register.confirmPassword")}
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={confirmPassword}
                                        onChange={(e) =>
                                            setConfirmPassword(e.target.value)
                                        }
                                        placeholder={t(
                                            "auth.validation.passwordMismatch",
                                        )}
                                    />
                                </div>
                                <div className="col-md-12">
                                    <div className="text-muted">
                                        {t("admin.password")}{" "}
                                        {t("common.update") || "update"}.
                                    </div>
                                </div>
                            </form>
                        </Modal.Body>
                    </Tab>
                    <Tab
                        eventKey="contact"
                        title={t("user.quizHistory") || "History"}
                    >
                        <Modal.Body>
                            {loadingHistory ? (
                                <div>{t("common.loading") || "Loading..."}</div>
                            ) : history.length === 0 ? (
                                <div className="p-3 text-muted">
                                    {t("user.quizHistory") || "History"}{" "}
                                    {t("common.no") || "No data"}.
                                </div>
                            ) : (
                                <div className="row gy-3">
                                    {history.map((quiz, index) => {
                                        const scoreLabel = quiz.score
                                            ? `${quiz.score}${quiz.total ? ` / ${quiz.total}` : ""}`
                                            : quiz.countCorrect ||
                                                quiz.countTotal
                                              ? `${quiz.countCorrect || 0} / ${quiz.countTotal || "?"}`
                                              : t("admin.noData") || "No score";
                                        const statusLabel =
                                            quiz.status ||
                                            (quiz.score || quiz.countCorrect
                                                ? "Completed"
                                                : "Assigned");
                                        return (
                                            <div
                                                className="col-md-6"
                                                key={quiz.id || index}
                                            >
                                                <div className="card h-100">
                                                    {quiz.image ? (
                                                        <img
                                                            src={
                                                                quiz.image.startsWith(
                                                                    "data:",
                                                                )
                                                                    ? quiz.image
                                                                    : `data:image/jpeg;base64,${quiz.image}`
                                                            }
                                                            className="card-img-top"
                                                            alt={
                                                                quiz.description ||
                                                                quiz.name ||
                                                                `Quiz ${index + 1}`
                                                            }
                                                        />
                                                    ) : null}
                                                    <div className="card-body d-flex flex-column">
                                                        <h5 className="card-title">
                                                            {quiz.name ||
                                                                quiz.description ||
                                                                `${t("quiz.quiz")} ${index + 1}`}
                                                        </h5>
                                                        <p className="card-text text-truncate mb-2">
                                                            {quiz.description ||
                                                                quiz.name}
                                                        </p>
                                                        <div className="mb-2">
                                                            <strong>
                                                                {t(
                                                                    "quiz.score",
                                                                ) || "Score:"}
                                                            </strong>{" "}
                                                            {scoreLabel}
                                                        </div>
                                                        <div className="mb-3">
                                                            <span className="badge bg-info text-dark">
                                                                {statusLabel}
                                                            </span>
                                                        </div>
                                                        <div className="mt-auto d-flex gap-2">
                                                            <Button
                                                                variant="outline-primary"
                                                                size="sm"
                                                                onClick={() =>
                                                                    handleReviewQuiz(
                                                                        quiz,
                                                                    )
                                                                }
                                                            >
                                                                {t(
                                                                    "admin.view",
                                                                ) || "View"}
                                                            </Button>
                                                            {quiz.score ||
                                                            quiz.countCorrect ? (
                                                                <Button
                                                                    variant="outline-secondary"
                                                                    size="sm"
                                                                    onClick={() =>
                                                                        handleReviewQuiz(
                                                                            quiz,
                                                                        )
                                                                    }
                                                                >
                                                                    {t(
                                                                        "common.showAnswers",
                                                                    ) ||
                                                                        "Review"}
                                                                </Button>
                                                            ) : null}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </Modal.Body>
                    </Tab>
                </Tabs>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        {t("common.close")}
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleSave}
                        disabled={saving}
                    >
                        {saving
                            ? t("common.loading") || "Saving..."
                            : t("common.save")}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
export default ModalViewUser;
