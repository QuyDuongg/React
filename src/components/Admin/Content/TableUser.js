import { useTranslation } from "react-i18next";

const TableUser = (props) => {
    let { listUser } = props;
    const { t } = useTranslation();

    return (
        <div>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">{t("admin.no")}</th>
                        <th scope="col">{t("admin.email")}</th>
                        <th scope="col">{t("admin.username")}</th>
                        <th scope="col">{t("admin.role")}</th>
                        <th scope="col">{t("admin.action")}</th>
                    </tr>
                </thead>
                <tbody>
                    {listUser &&
                        listUser.length > 0 &&
                        listUser.map((item, index) => {
                            return (
                                <tr key={"table-users-" + index}>
                                    <td>{item.id}</td>
                                    <td>{item.email}</td>
                                    <td>{item.username}</td>
                                    <td>{item.role}</td>
                                    <td>
                                        <button className="btn btn-secondary">
                                            {t("admin.view")}
                                        </button>
                                        <button
                                            className="btn btn-warning mx-3"
                                            onClick={() => {
                                                props.handleClickBtnUpdate(
                                                    item
                                                );
                                            }}
                                        >
                                            {t("admin.update")}
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => {
                                                props.handleClickBtnDelete(
                                                    item
                                                );
                                            }}
                                        >
                                            {t("admin.delete")}
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    {listUser && listUser.length === 0 && (
                        <tr>
                            <td colSpan="4">{t("admin.noData")}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default TableUser;
