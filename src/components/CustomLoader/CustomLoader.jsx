import React from "react";
import { Dna } from "react-loader-spinner";

export const CustomLoader = () => {
  return (
    <div
      style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "75vh" }}
    >
      <Dna
        visible={true}
        height="100"
        width="100"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
    </div>
  );
};
