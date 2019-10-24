import React from "react";
import { NavLink as RRNavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  handleLogout = () => {
    this.props.logout();
    this.props.history.push("/login");
  };
  renderAuthButtons = () => {
    const { isAuth } = this.props.auth;
    if (isAuth) {
      return (
        <NavItem>
          <NavLink onClick={this.handleLogout}>خروج</NavLink>
        </NavItem>
      );
    }
    return (
      <React.Fragment>
        <NavItem>
          <NavLink tag={RRNavLink} exact to="/login">
            تسجيل الدخول
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={RRNavLink} exact to="/register">
            تسجيل
          </NavLink>
        </NavItem>
      </React.Fragment>
    );
  };
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="md">
          <div className="container">
            <NavbarBrand tag={RRNavLink} exact to="/">
              ياحراجاه
            </NavbarBrand>
            <form className="form-inline my-2 my-lg-0">
              <input
                className="form-control mr-sm-2 btn-bwm-search bwm-search"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                className="btn bg-primary text-white my-2 my-sm-0"
                type="submit"
              >
                Search
              </button>
            </form>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink tag={RRNavLink} exact to="/" active>
                    رئيسية
                  </NavLink>
                </NavItem>

                {this.renderAuthButtons()}
                {/* <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Options
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>Option 1</DropdownItem>
                    <DropdownItem>Option 2</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>Reset</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>*/}
              </Nav>
            </Collapse>
          </div>
        </Navbar>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};
export default withRouter(connect(mapStateToProps)(Header));
