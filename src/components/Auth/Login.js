import "./Login.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { postLogin } from "../../services/apiService";
import { useDispatch } from "react-redux";
import { doLogin } from "../../redux/action/userAction";
import { startTransition } from "react";
import { useTranslation } from "react-i18next";
import { Icon } from "react-icons-kit";
import { eye } from "react-icons-kit/feather/eye";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { ImSpinner10 } from "react-icons/im";
import Language from "../Header/Language";

const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [type, setType] = useState("password");
    const [icon, setIcon] = useState(eyeOff);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleLogin = async () => {
        // validate
        const emailValid = validateEmail(email);
        if (!emailValid) {
            toast.error(t("auth.validation.invalidEmail"));
            return;
        }
        if (!password) {
            toast.error(t("auth.validation.invalidPassword"));
            return;
        }
        setIsLoading(true);
        // submit apis
        let data = await postLogin(email, password);
        if (data && data.EC === 0) {
            dispatch(doLogin(data));
            toast.success(data.EM);
            setIsLoading(false);
            startTransition(() => {
                navigate("/");
            });
        }
        if (data && +data.EC !== 0) {
            toast.error(data.EM);
            setIsLoading(false);
        }
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
    const handleEnter = (event) => {
        if (event && event.key === "Enter") {
            handleLogin();
        }
    };
    return (
        <div
            className="login-container"
            onKeyDown={(event) => handleEnter(event)}
        >
            <div className="header">
                <span>{t("auth.login.noAccount")} </span>

                <div>
                    <button onClick={() => navigate("/register")}>
                        {" "}
                        {t("auth.login.signupButton")}{" "}
                    </button>
                </div>
                <Language></Language>
            </div>
            <div className="title col-4 mx-auto">{t("auth.login.title")}</div>
            <div className="welcome col-4 mx-auto">
                {t("auth.login.welcome")}
            </div>
            <div className="content-form col-4 mx-auto">
                <div className="from-group ">
                    <label className="form-label">
                        {t("auth.login.email")}
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            console.log("e", e.target.value);
                        }}
                    />
                </div>
                <div className="from-group ">
                    <label className="form-label">
                        {t("auth.login.password")}
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
            </div>
            <div className="forgot-password">
                {" "}
                {t("auth.login.forgotPassword")}
            </div>
            <div className="btn-submit col-4 mx-auto">
                <button
                    onClick={() => {
                        handleLogin();
                    }}
                    disabled={isLoading}
                >
                    {isLoading === true && (
                        <ImSpinner10 className="loader-icon" />
                    )}
                    <span>{t("auth.login.loginButton")}</span>
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

export default Login;
