import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./style.css";
import CircularProgress from "@material-ui/core/CircularProgress";

class PdfViewer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      url: "https://www.cpp.edu/~jcmcgarvey/513_2016/ASmarterWaytoLearnJavaScript.pdf",
      loader: false
    };
  }

  
  componentWillMount() {
    this.setState({url:this.props.data})
  }
  

  render() {
    const { url, loader } = this.state;
    return (
      <div class="embed-container">
        {loader ? (
          <div style={{ marginTop: "35px", textAlign: "center" }}>
            <CircularProgress />
          </div>
        ) : (
          <iframe
            src={url}
            frameborder="0"
            webkitAllowFullScreen
            mozallowfullscreen
            allowFullScreen
          />
        )}
      </div>
    );
  }
}

PdfViewer.propTypes = {};

function mapStateToProps(state, ownProps) {
  return {};
}

export default connect(mapStateToProps)(PdfViewer);
