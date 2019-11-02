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
import RentalSearchInput from "../rentals/RentalSearchInput";

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
  renderUserMenu = () => {
    return (
      <UncontrolledDropdown nav inNavbar className="nav-item dropdown">
        <DropdownToggle nav caret className="nav-link nav-item dropdown-toggle">
          {this.props.auth.username}
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem
            tag={RRNavLink}
            exact
            to="/rentals/create"
            className="dropdown-item"
          >
            انشاء مكان
          </DropdownItem>
          <DropdownItem tag={RRNavLink} exact to="/" className="dropdown-item">
            إدارة الأمكنة
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem tag={RRNavLink} exact to="/" className="dropdown-item">
            إدارة الحجوزات
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  };
  renderAuthButtons = () => {
    const { isAuth } = this.props.auth;
    if (isAuth) {
      return (
        <React.Fragment>
          {this.renderUserMenu()}
          <NavItem>
            <NavLink onClick={this.handleLogout} className="clickable">
              خروج
            </NavLink>
          </NavItem>
        </React.Fragment>
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
            <RentalSearchInput />
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                {this.renderAuthButtons()}
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
