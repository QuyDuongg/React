import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import { toast, Toast } from "react-toastify";
import { postCreateNewUser } from "../../../services/apiService";
import { useTranslation } from "react-i18next";

const ModalCreateUser = (props) => {
    const { show, setShow } = props;
    const { t } = useTranslation();

    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [Username, setUsername] = useState("");
    const [Role, setRole] = useState("USER");
    const [Image, setImage] = useState("");
    const [PreviewImage, setPreviewImage] = useState("");

    const UpdateEmail = (event) => {
        setEmail(event.target.value);
    };
    const UpdatePassword = (event) => {
        setPassword(event.target.value);
    };
    const UpdateUsername = (event) => {
        setUsername(event.target.value);
    };

    const handleClose = () => {
        setShow(false);
        setEmail("");
        setPassword("");
        setUsername("");
        setRole("USER");
        setImage("");
        setPreviewImage("");
    };

    const handleUploadImage = (e) => {
        if (e.target && e.target.files && e.target.files[0]) {
            setPreviewImage(URL.createObjectURL(e.target.files[0]));
            setImage(e.target.files[0]);
        } else {
            setPreviewImage("");
        }
    };

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleSubmitCreateUser = async () => {
        //validate

        const emailValid = validateEmail(Email);
        if (!emailValid) {
            toast.error(t("auth.validation.invalidEmail"));
            return;
        }
        if (!Password) {
            toast.error(t("auth.validation.invalidPassword"));
            return;
        }

        //call api

        let data = await postCreateNewUser({
            Email: Email,
            Password: Password,
            Username: Username,
            Role: Role,
            Image: Image,
        });
        if (data && data.EC == 0) {
            toast.success(data.EM);
            handleClose();
            props.setCurrentPage(1);
            await props.fetchListUserWithPaginate(1);
        }
        if (data && data.EC == -1) {
            toast.error(data.EM);
            handleClose();
        }
    };

    return (
        <>
            {/* <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button> */}

            <Modal
                show={show}
                onHide={handleClose}
                size="xl"
                backdrop="static"
                className="modal-add-user"
            >
                <Modal.Header closeButton>
                    <Modal.Title>{t("admin.addNewUsers")}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        {/* email */}
                        <div className="col-md-6">
                            <label className="form-label">
                                {t("admin.email")}
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                value={Email}
                                onChange={(event) => UpdateEmail(event)}
                            />
                        </div>
                        {/* password */}
                        <div className="col-md-6">
                            <label className="form-label">
                                {t("admin.password")}
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                value={Password}
                                onChange={(event) => UpdatePassword(event)}
                            />
                        </div>
                        {/* username */}
                        <div className="col-md-6">
                            <label className="form-label">
                                {t("admin.username")}
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                value={Username}
                                onChange={(event) => UpdateUsername(event)}
                            />
                        </div>
                        {/* role */}
                        <div className="col-md-4">
                            <label className="form-label">
                                {t("admin.role")}
                            </label>
                            <select
                                className="form-select"
                                onChange={(event) =>
                                    setRole(event.target.value)
                                }
                                // value={Role}
                            >
                                <option value="USER">USER</option>
                                <option value="ADMIN">ADMIN</option>
                            </select>
                        </div>
                        {/* upload image */}
                        <div className="col-md-12">
                            <label
                                className="form-label label-upload"
                                htmlFor="labelUpload"
                            >
                                <FcPlus />
                                {t("admin.uploadImage")}
                            </label>
                            <input
                                type="file"
                                id="labelUpload"
                                hidden
                                onChange={(e) => handleUploadImage(e)}
                            />
                        </div>
                        {/* preview image */}
                        <div className="col-md-12 img-preview">
                            {PreviewImage ? (
                                <img src={PreviewImage} />
                            ) : (
                                <span>{t("admin.uploadImage")}</span>
                            )}
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        {t("common.close")}
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => handleSubmitCreateUser()}
                    >
                        {t("common.save")}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
export default ModalCreateUser;
