import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Col, Container, Row } from "reactstrap";

class ContactCell extends React.Component {
  onContactOptionSelect = (event) => {
    this.setState({ menuState: true, anchorEl: event.currentTarget });
  };
  handleRequestClose = () => {
    this.setState({ menuState: false });
  };
  onContactClose = () => {
    this.setState({ addContactState: false });
  };
  onDeleteContact = (contact) => {
    this.setState({ addContactState: false });
    this.props.onDeleteContact(contact);
  };
  onEditContact = () => {
    this.setState({ menuState: false, addContactState: true });
  };

  constructor() {
    super();
    this.state = {
      anchorEl: undefined,
      menuState: false,
      addContactState: false,
    };
  }

  render() {
    const { contact, onContactSelect } = this.props;
    const { title } = contact;

    return (
      <Row className="contact-item">
        <Col xs={1}>
          <Checkbox
            color="primary"
            checked={contact.selected}
            value="checkedF"
            onClick={() => {
              contact.already !== true && onContactSelect(contact);
            }}
          />
        </Col>
        <Col xs={10}>
          <p className="mb-0" style={{ marginTop: "11px" }}>
            {title}
          </p>
        </Col>
      </Row>
    );
  }
}

export default ContactCell;
