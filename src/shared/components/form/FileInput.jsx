/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FileInputField extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.shape({
        name: PropTypes.string,
      }),
      PropTypes.string,
    ]),
  };

  static defaultProps = {
    value: null,
  };

  render() {
    const { onChange, name, value } = this.props;

    return (
      <div className="form__form-group-file">
        <label htmlFor={name}>Choose the file</label>
        <span>{value.name}</span>
        <input
          type="file"
          name={name}
          id={name}
          onChange={
            (e) => {
              e.preventDefault();
              // convert files to an array
              const files = [...e.target.files];
              onChange({ file: files[0], name: files[0].name });
            }
          }
        />
      </div>
    );
  }
}

const renderFileInputField = props => (
  <div className="form__form-group-input-wrap">
    <FileInputField
      {...props.input}
    />
    {props.meta.touched && props.meta.error && <span className="form__form-group-error">{props.meta.error}</span>}
  </div>
);

renderFileInputField.propTypes = {
  input: PropTypes.shape({
    onChange: PropTypes.func,
    name: PropTypes.string,
  }).isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }),
};

renderFileInputField.defaultProps = {
  meta: null,
};

export default renderFileInputField;
