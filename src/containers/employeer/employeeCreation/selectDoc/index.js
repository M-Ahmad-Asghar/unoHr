import React, { Component } from "react";
import ContactCell from "./docTable";
import { Card, CardBody, Col, Button, ButtonToolbar } from "reactstrap";
import { connect } from "react-redux";

class SelectDocs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      documentList: [],
      selectedDocs: [],
    };
  }

  componentDidMount() {
    if (this.props.getSysDocStatus === "done") {
      let data = this.props.sysDocs.map(doc => {
        return {
          ...doc,
          selected: false
        };
      });

      this.setState({
        documentList: data,
        loader: false
      });
    } else if (this.props.getSysDocStatus === "error") {
      this.setState({
        loader: false
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.getSysDocStatus === "done") {
      let data = nextProps.sysDocs.map(doc => {
        return {
          ...doc,
          selected: false
        };
      });

      this.setState({
        documentList: data,
        loader: false
      });
    } else if (nextProps.getSysDocStatus === "error") {
      this.setState({
        loader: false
      });
    }
  }

  onContactSelect = data => {
    console.log("====================================");
    console.log(data);
    console.log("====================================");
    data.selected = !data.selected;
    let selectedContacts = 0;
    const contactList = this.state.documentList.map(contact => {
      if (contact.selected) {
        selectedContacts++;
      }
      if (contact.id === data.id) {
        if (contact.selected) {
          selectedContacts++;
        }
        return data;
      } else {
        return contact;
      }
    });
    this.setState({
      selectedContacts: selectedContacts,
      documentList: contactList
    });
    this.props.getDocs(contactList)
  };
  render() {
    const { documentList } = this.state;
    return (
      <Col md={12} lg={12}>
        <Card>
          <CardBody>
            {" "}
            {documentList.map((contact, index) => (
              <ContactCell
                key={index}
                contact={contact}
                onContactSelect={this.onContactSelect}
                // onDeleteContact={onDeleteContact}
                // onSaveContact={onSaveContact}
                // addFavourite={addFavourite}
                // onContactSelect={onContactSelect}
              />
            ))}
          </CardBody>
        </Card>
      </Col>
    );
  }
}
const mapStateToProps = state => {
  return {
    sysDocs: state.employerReducer.sysDocs,
    loader: state.employerReducer.loader,
    getSysDocStatus: state.employerReducer.getSysDocStatus
  };
};

export default connect(mapStateToProps)(SelectDocs);
