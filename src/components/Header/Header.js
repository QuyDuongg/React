import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { doLogout } from "../../redux/action/userAction";
import { useDispatch } from "react-redux";
import { postLogout } from "../../services/apiService";
import { toast } from "react-toastify";
import i18n from "../../utils/i18n";
import Language from "./Language";

const Header = () => {
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const account = useSelector((state) => state.user.account);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogin = () => {
        navigate("/login");
    };
    const handleLogout = async () => {
        console.log("data", account.email, account.refresh_token);
        let data = await postLogout(account.email, account.refresh_token);
        if (data && data.EC === 0) {
            toast.success(data.EM);
            dispatch(doLogout());
            navigate("/login");
        } else {
            toast.error(data.EM);
        }
    };
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                {/* <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand> */}
                <NavLink to="/" className="navbar-brand">
                    Hoidan IT
                </NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to="/" className="nav-link">
                            Home
                        </NavLink>
                        <NavLink to="/users" className="nav-link">
                            User
                        </NavLink>
                        <NavLink to="/admins" className="nav-link">
                            Admin
                        </NavLink>
                    </Nav>
                    <Nav>
                        {isAuthenticated === false ? (
                            <>
                                <button
                                    className="btn-login"
                                    onClick={() => {
                                        handleLogin();
                                    }}
                                >
                                    Log in
                                </button>
                                <button className="btn-signup">Sige up</button>
                            </>
                        ) : (
                            <NavDropdown
                                title="Settings"
                                id="basic-nav-dropdown"
                            >
                                <NavDropdown.Item>Profile</NavDropdown.Item>
                                <NavDropdown.Item
                                    onClick={() => {
                                        handleLogout();
                                    }}
                                >
                                    Log out
                                </NavDropdown.Item>
                            </NavDropdown>
                        )}
                    </Nav>
                    <Language></Language>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
