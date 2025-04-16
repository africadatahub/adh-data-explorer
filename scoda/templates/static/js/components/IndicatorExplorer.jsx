import React, { Component } from 'react';

import IndicatorExplorerDataCard from '../components/IndicatorExplorer.Data.Card';

export default class IndicatorExplorer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedYear: props.selectedYear || "2010",
      selectedFilters: props.selectedFilters || [],
      selectedIndicatorId: props.selectedIndicatorId || 1,
    };
  }

  componentDidMount() {
    const { location, navigate } = this.props; // Destructure props to access location and navigate
    const queryParams = new URLSearchParams(location.search);

    const selectedYear = queryParams.get("selectedYear") || "2010";
    const selectedIndicatorId = queryParams.get("selectedIndicatorId") || "1";
    const selectedFilters = queryParams.get("selectedFilters")
      ? queryParams.get("selectedFilters").split(",")
      : [];

    // If some query parameters are missing, update the URL using navigate
    if (!queryParams.get("selectedYear") || !queryParams.get("selectedIndicatorId")) {
      const updatedParams = new URLSearchParams(queryParams);
      if (!queryParams.get("selectedYear")) updatedParams.set("selectedYear", selectedYear);
      if (!queryParams.get("selectedIndicatorId"))
        updatedParams.set("selectedIndicatorId", selectedIndicatorId);

      // Navigate with updated query parameters
      navigate({
        pathname: location.pathname, // Maintain current pathname
        search: `?${updatedParams.toString()}`, // New search parameters
      });
    }

    // Remove spinner
    $(".spinner--container").remove();

    // Handle logo visibility
    if (this.props.logoHide) {
      document.addEventListener("scroll", () => {
        const logo = window.scrollY < 50 ? "none" : "block";
        this.setState({ logo_hide: logo });
      });
    } else {
      this.setState({ logo_hide: "block" });
    }
  }

  render() {
    const queryParams = new URLSearchParams(this.props.location.search);

    const selectedYear = queryParams.get("selectedYear") || "2010";
    const selectedIndicatorId = queryParams.get("selectedIndicatorId") || "1";
    const selectedFilters = queryParams.has("selectedFilters")
      ? queryParams.get("selectedFilters").split(",")
      : [];

    return (
      <div className="container pb-5">
        <div className="row pb-5 ">
          <div className="col-12">
            <IndicatorExplorerDataCard
              selectedYear={selectedYear}
              selectedIndicatorId={selectedIndicatorId}
              selectedFilters={selectedFilters}
              location={this.props.location}
            />
          </div>
        </div>
      </div>
    );
  }
}
