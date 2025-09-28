import { NavDropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const Language = () => {
    const { t, i18n } = useTranslation();

    const handleLanguageChange = (languageCode) => {
        i18n.changeLanguage(languageCode);
    };
    return (
        <>
            <NavDropdown
                title={t("header.language")}
                id="basic-nav-dropdown"
                className="language"
            >
                <NavDropdown.Item onClick={() => handleLanguageChange("vi")}>
                    {t("header.vietnam")}
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleLanguageChange("en")}>
                    {t("header.english")}
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleLanguageChange("ja")}>
                    {t("header.japanese")}
                </NavDropdown.Item>
            </NavDropdown>
        </>
    );
};
export default Language;
