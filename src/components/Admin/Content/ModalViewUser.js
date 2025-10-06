import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import _ from "lodash";
const ModalViewUser = (props) => {
    const { show, setShow, dataView } = props;
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [Username, setUsername] = useState("");
    const [Role, setRole] = useState("USER");
    const [Image, setImage] = useState("");
    const [PreviewImage, setPreviewImage] = useState("");

    const handleClose = () => {
        setShow(false);
    };

    useEffect(() => {
        if (!_.isEmpty(dataView)) {
            //update state
            setEmail(dataView.email);
            setUsername(dataView.username);
            setRole(dataView.role);
            setImage("");
            if (dataView.image) {
                setPreviewImage(`data:image/jpeg;base64,${dataView.image}`);
            }
        }
    }, [props.dataView]);

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
                <Modal.Body>
                    <form className="row g-3">
                        {/* email */}
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                value={Email}
                                disabled
                            />
                        </div>
                        {/* password */}
                        <div className="col-md-6">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                value={Password}
                                disabled
                            />
                        </div>
                        {/* username */}
                        <div className="col-md-6">
                            <label className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                value={Username}
                                disabled
                            />
                        </div>
                        {/* role */}
                        <div className="col-md-4">
                            <label className="form-label">Role</label>

                            <input
                                type="text"
                                className="form-control"
                                value={Role}
                                disabled
                            />
                        </div>
                        {/* upload image */}

                        {/* preview image */}
                        <div className="col-md-12 img-preview">
                            {PreviewImage ? (
                                <img src={PreviewImage} />
                            ) : (
                                <span>preview image</span>
                            )}
                        </div>
                    </form>
                </Modal.Body>
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
