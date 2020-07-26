import React from "react";
import { LocationOn } from "@material-ui/icons";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";

export default class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: "" };
  }

  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = address => {
    this.props.getAddress(address);
    this.setState({ address: address });
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log("Success", latLng))
      .catch(error => console.error("Error", error));
  };

  render() {
    console.log("========this.state.address============================");
    console.log(this.state.address);
    console.log("====================================");
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            {console.log(
              "getInputProps",
              getInputProps({
                placeholder: "Location ...",
                className: "location-search-input"
              })
            )}
            <TextField
              InputProps={{
                disableUnderline: true
                // startAdornment: (
                //   <InputAdornment position="start" >

                //    <LocationOn className="iconFixfield"/>

                //   </InputAdornment>
                // ),
              }}
              fullWidth
              {...getInputProps({
                placeholder: "Location ...",
                className: "location-search-input"
              })}
            />
            <div
              style={{
                position: "absolute",
                left: "0",
                zIndex: 1100,
                marginTop: 10,
                width: "100%"
              }}
            >
              {loading && (
                <div
                  style={{
                    backgroundColor: "#ffffff",
                    cursor: "pointer",
                    padding: 15,
                    paddingBottom: 15,
                    borderBottom: "1px solid #fafafa",
                    paddingRight: 20
                  }}
                >
                  Loading...
                </div>
              )}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? "suggestion-item--active"
                  : "suggestion-item";
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? {
                      backgroundColor: "#dbdbdb",
                      cursor: "pointer",
                      paddingTop: 15,
                      paddingBottom: 15,
                      border: "1px solid #dbdbdb",
                      paddingRight: 20
                    }
                  : {
                      backgroundColor: "#ffffff",
                      cursor: "pointer",
                      paddingTop: 15,
                      paddingBottom: 15,
                      border: "1px solid #dbdbdb",
                      paddingRight: 20
                    };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style
                    })}
                  >
                    <LocationOn className="iconFix" />
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}
