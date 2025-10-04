import ReactPaginate from "react-paginate";
import { useState, useEffect } from "react";
import {useTranslation} from "react-i18next";
import ModalViewuser from "./ModalViewUser";

const TableUserPaginate = (props) => {
    let { listUser, pageCount } = props;
    const { t } = useTranslation();
    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        props.fetchListUserWithPaginate(event.selected + 1);
        props.setCurrentPage(event.selected + 1);
        
    };
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
                            <td colSpan="4">No data</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <ReactPaginate
                nextLabel={t("admin.next")}
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={pageCount}
                previousLabel={t("admin.previous")}
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
                forcePage={props.currentPage - 1}
            />
        </div>
    );
};

export default TableUserPaginate;
