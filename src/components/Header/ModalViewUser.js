import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useSelector } from "react-redux";
import { FcPlus } from "react-icons/fc";
import { useTranslation } from "react-i18next";

import _ from "lodash";
const ModalViewUser = (props) => {
    const { show, setShow } = props;
    const { t } = useTranslation();

    const email = useSelector((state) => state.user.account.email);
    const password = useSelector((state) => state.user.account.password);
    const username = useSelector((state) => state.user.account.username);
    const role = useSelector((state) => state.user.account.role);
    const imageI = useSelector((state) => state.user.account.image);
    // const previewImage = useSelector((state) => state.user.account.image);

    const handleClose = () => {
        setShow(false);
    };

    const [image, setImage] = useState(imageI);
    const [preview, setPreview] = useState(null);

    // useEffect(() => {
    //     if (!image) return;
    //     const objectUrl = URL.createObjectURL(image);
    //     setPreview(objectUrl);
    //     // return () => URL.revokeObjectURL(objectUrl);
    // }, [image]);
    // useEffect(() => {
    //     if (!_.isEmpty(dataView)) {
    //         //update state
    //         setEmail(dataView.email);
    //         setUsername(dataView.username);
    //         setRole(dataView.role);
    //         setImage("");
    //         if (dataView.image) {
    //             setPreviewImage(`data:image/jpeg;base64,${dataView.image}`);
    //         }
    //     }
    // }, [props.dataView]);

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
                    <Modal.Title>View a user</Modal.Title>
                </Modal.Header>
                <Tabs
                    defaultActiveKey="profile"
                    id="uncontrolled-tab-example"
                    className="mb-3"
                >
                    <Tab eventKey="home" title="User Information">
                        <Modal.Body>
                            <form className="row g-3">
                                {/* username */}
                                <div className="col-md-4">
                                    <label className="form-label">
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={username}
                                    />
                                </div>
                                {/* email */}
                                <div className="col-md-4">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        value={email}
                                        disabled
                                    />
                                </div>
                                {/* role */}
                                <div className="col-md-3">
                                    <label className="form-label">Role</label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        value={role}
                                        disabled
                                    />
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
                                        // onChange={(e) => handleUploadImage(e)}
                                    />
                                </div>
                                {/* preview image */}
                                {/* <div className="col-md-12 img-preview">
                                    {preview ? (
                                        <img src={preview} />
                                    ) : (
                                        <span>preview image</span>
                                    )}
                                </div> */}
                                {console.log("pre", image)}
                            </form>
                        </Modal.Body>
                    </Tab>
                    <Tab eventKey="profile" title="Change Password">
                        Tab content for Profile
                    </Tab>
                    <Tab eventKey="contact" title="History" disabled>
                        Tab content for Contact
                    </Tab>
                </Tabs>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
export default ModalViewUser;
