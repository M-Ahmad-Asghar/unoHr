import React, { useState, useEffect } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Col, Container, Row } from "reactstrap";
import { useDispatch } from "react-redux";
function ContactCell({ contact, onContactSelect }) {
  const [anchorEl, setAnchorEl] = useState(undefined);
  const [menuState, setMenuState] = useState(false);
  const [addContactState, setAddContactState] = useState(false);

  const onContactOptionSelect = (event) => {
    setMenuState(true);
    setAnchorEl(event.currentTarget);
  };
  const handleRequestClose = () => {
    setMenuState(false);
  };
  const onContactClose = () => {
    setAddContactState(false);
  };
  const onDeleteContact = (contact) => {
    setAddContactState(false);

    //this.props.onDeleteContact(contact);
  };
  const onEditContact = () => {
    setMenuState(false);
    setAddContactState(true);
  };

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

export default ContactCell;
