import React from "react";
import LocationSearchInput from "./locationSearch"
function SearchJobs() {
  return (
    <div>
      <div>
        <p className="profileName">Search Jobs Near you</p>
      </div>
      <div className="inner">
          <LocationSearchInput />
      </div>
    </div>
  );
}
export default SearchJobs;
