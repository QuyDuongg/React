import "./Register.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { postRegister } from "../../services/apiService";

import { Icon } from "react-icons-kit";
import { eye } from "react-icons-kit/feather/eye";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import Language from "../Header/Language";
import { useTranslation } from "react-i18next";
const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [type, setType] = useState("password");
    const [icon, setIcon] = useState(eyeOff);
    const navigate = useNavigate();
    const { t } = useTranslation();

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleSignUp = async () => {
        // validate
        const emailValid = validateEmail(email);
        if (!emailValid) {
            toast.error("Invalid email");
            return;
        }
        if (!password) {
            toast.error("Invalid password");
            return;
        }
        //call api
        let data = await postRegister(email, username, password);
        if (data && data.EC === 0) {
            toast.success(data.EM);
            navigate("/login");
        }
        if (data && +data.EC !== 0) {
            toast.error(data.EM);
        }
        // navigate("/login");
    };

    const handleToggle = () => {
        if (type === "password") {
            setIcon(eye);
            setType("text");
        } else {
            setIcon(eyeOff);
            setType("password");
        }
    };

    return (
        <div className="signup-container">
            <div className="header">
                <span>{t("auth.register.haveAccount")}</span>

                <div>
                    <button onClick={() => navigate("/login")}>
                        {t("auth.register.loginButton")}
                    </button>
                </div>
                <Language></Language>
            </div>
            <div className="title col-4 mx-auto">Hoidan IT</div>
            <div className="welcome col-4 mx-auto">
                {t("auth.register.welcome")}
            </div>
            <div className="content-form col-4 mx-auto">
                <div className="from-group ">
                    <label className="form-label">
                        {t("auth.register.email")}
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        required
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <div className="from-group ">
                    <label className="form-label">
                        {t("auth.register.password")}
                    </label>
                    <input
                        type={type}
                        className="form-control"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    <span onClick={handleToggle}>
                        <Icon className="icon" icon={icon} size={20} />
                    </span>
                </div>
                <div className="from-group ">
                    <label className="form-label">
                        {t("auth.register.username")}
                    </label>
                    <input
                        className="form-control"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </div>
            </div>
            <div className="btn-submit col-4 mx-auto">
                <button
                    onClick={() => {
                        handleSignUp();
                    }}
                >
                    {t("auth.register.registerButton")}
                </button>
            </div>
            <div className="text-center">
                <span
                    className="back"
                    onClick={() => {
                        navigate("/");
                    }}
                >
                    {t("auth.login.goHome")}
                </span>
            </div>
        </div>
    );
};
export default Register;
