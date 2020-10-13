import React, { Component, Fragment } from 'react';
import {
  Card,
  CardBody,
  Col,
  Row,
  CardHeader,
  UncontrolledCollapse
} from "reactstrap";
import { connect } from 'react-redux';
import { Paper } from "@material-ui/core";
import "react-intl-tel-input/dist/main.css";
import PdfViewer from "../../employeerLayout/PdfViewer";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getPdfRecords } from '../../../redux/actions/paperWorkActions';

class PdfRecords extends Component {
    state = {
        pdfs: [],
        loader: true
    }

    componentDidMount() {
        this.props.getPdfRecords(this.props.user.uid);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.getPdfRecordStatus === "done") {
            this.setState({
                pdfs: nextProps.pdfRecords,
                loader: false
            })
        } 

        if(nextProps.getPdfRecordStatus === "error") {
            this.setState({
                loader: false
            })
        } 
    }

    render() {
        let { pdfs, loader } = this.state;
       

        return (
            <div>

                <Paper align="center" elevation={5} style={{ padding: 8, marginBottom: 15 }}>
                  <Typography variant="h6">PDF Documents</Typography>
                </Paper>
        
                <Col
                  md={12}
                  lg={12}
                  xl={12}
                  style={{ backgroundColor: "white", paddingTop: 20, borderRadius: 5 }}
                >
                  <Card>
                    <CardHeader>
                      <Row>
                        <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                          <h5>
                            <strong> Pdf Name </strong>{" "}
                          </h5>
                        </Col>
                        <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                          <h5>
                            <strong> Template ID </strong>{" "}
                          </h5>
                        </Col>
                      </Row>
                    </CardHeader>
        
                  {
                    loader ? (
                      <div style={{ marginTop: "35px", textAlign: "center" }}>
                        <CircularProgress />
                      </div>
                    ) : (
                        <CardBody style={{ padding: "0px" }}>
                            {pdfs.length > 0 ? (
                                pdfs.map((item, index) => {
                                    return (
                                        <Fragment key={index}>
                                            <Row
                                                className="taskRow"
                                                key={index}
                                                id={`toggler${index}`}
                                            >
                                                <Col
                                                    className="taskCol"
                                                    xs={6}
                                                    sm={6}
                                                    md={6}
                                                    lg={6}
                                                    xl={6}
                                                >
                                                <p>{item.doc_name}</p>
                                                </Col>
                                                <Col
                                                className="taskCol"
                                                xs={6}
                                                sm={6}
                                                md={6}
                                                lg={6}
                                                xl={6}
                                                >
                                                <p>
                                                    {" "}
                                                    {item.template_id}
                                                </p>
                                                </Col>

                                              <Col sm={12} md={12} lg={12} xl={12}>
                                                <Divider />
                                                <UncontrolledCollapse
                                                  className="with-shadow"
                                                  toggler={`#toggler${index}`}
                                                >
                                                  <Row>
                                                    <Col
                                                      sm={12}
                                                      md={12}
                                                      lg={12}
                                                      xl={12}
                                                      style={{ textAlign: "center", marginTop: "15px" }}
                                                    >
                                                      <PdfViewer data={item.url} />
                                                    </Col>
                                                  </Row>
                                                </UncontrolledCollapse>
                                              </Col>
                                            </Row>
                                            
                                            <Divider />
                                        </Fragment>
                                    );
                                    }
                                )
                            ) : (
                            <div style={{ textAlign: "center", padding: 30 }}>
                                <h3>Could Not Find any Pdf.</h3>
                            </div>
                            )}
                        </CardBody>
                        )
                    }
                </Card>
                  
              </Col>
                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.userReducer.user,
        loader: state.paperWorkReducer.loader,
        pdfRecords: state.paperWorkReducer.pdfRecords,
        getPdfRecordStatus: state.paperWorkReducer.getPdfRecordStatus
    }
}

export default connect(mapStateToProps, {
    getPdfRecords
})(PdfRecords);