import { NavDropdown } from "react-bootstrap";
const Language = () => {
    return (
        <>
            <NavDropdown title="Vietnam" id="basic-nav-dropdown">
                <NavDropdown.Item>Profile</NavDropdown.Item>
                <NavDropdown.Item>Vietnam</NavDropdown.Item>
            </NavDropdown>
        </>
    );
};
export default Language;
