import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CustomizerProps } from '../../../shared/prop-types/ReducerProps';

class ToggleSquared extends Component {
  static propTypes = {
    customizer: CustomizerProps.isRequired,
    changeBorderRadius: PropTypes.func.isRequired,
  };

  render() {
    const { changeBorderRadius, customizer } = this.props;

    return (
      <div className="toggle-btn customizer__toggle">
        <input
          className="toggle-btn__input"
          type="checkbox"
          name="square_toggle"
          checked={customizer.squaredCorners}
          onChange={() => { }}
        />
        <button
          style={{ position: "absolute", left: "50px" }}
          className="toggle-btn__input-label"
          onClick={changeBorderRadius}
        >Toggle
        </button>
        <span>Squared borders</span>
      </div>
    );
  }
}

export default ToggleSquared;
