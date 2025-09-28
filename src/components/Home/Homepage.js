import videoHomepage from "../../assets/videoHomepage.mp4";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { startTransition } from "react";
import { useTranslation } from "react-i18next";

const Home = () => {
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const account = useSelector((state) => state.user.account);
    const navigate = useNavigate();
    const { t } = useTranslation();
    return (
        <div className="homepage-container">
            <video controls autoPlay loop muted>
                <source src={videoHomepage} type="video/mp4" />
            </video>
            <div className="homepage-content">
                <div className="title-1">{t("home.title1")}</div>
                <div className="title-2">
                    {t("home.title2")}
                </div>

                <div className="title-3">
                    {isAuthenticated === true ? (
                        <button
                            onClick={() => {
                                startTransition(() => {
                                    navigate("/users");
                                });
                            }}
                        >
                            {t("home.startQuiz")}
                        </button>
                    ) : (
                        <button
                            onClick={() => {
                                startTransition(() => {
                                    navigate("/login");
                                });
                            }}
                        >
                            {t("home.getStarted")}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
