import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./style.css";
import { getCheckPayStubPDF } from "../../../redux/actions/paystubsActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import { Document, Page } from "react-pdf";

function PdfViewer(props) {
  const dispatch = useDispatch();
  const [url, setUrl] = useState(
    "https://www.cpp.edu/~jcmcgarvey/513_2016/ASmarterWaytoLearnJavaScript.pdf"
  );
  const [loader, setLoader] = useState(true);
  const checkPayStubPDF = useSelector(
    (state) => state.payStubsReducer.checkPayStubPDF
  );
  console.log("checkPayStubPDF", checkPayStubPDF);

  useEffect(() => {
    setLoader(true);
    dispatch(getCheckPayStubPDF(props.employeeId, props.payrollId));
    setUrl(props.data);
  }, []);
  useEffect(() => {
    setLoader(false);
  }, [checkPayStubPDF]);
  return (
    <div class="embed-container">
      {loader ? (
        <div style={{ marginTop: "35px", textAlign: "center" }}>
          <CircularProgress />
        </div>
      ) : (
        <iframe
          src={checkPayStubPDF}
          frameborder="0"
          webkitAllowFullScreen
          mozallowfullscreen
          allowFullScreen
        />
      )}
    </div>
  );
}

PdfViewer.propTypes = {};

function mapStateToProps(state, ownProps) {
  return {};
}

export default connect(mapStateToProps)(PdfViewer);
