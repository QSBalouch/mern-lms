import React from "react";
import { Spinner } from "react-bootstrap";

function Loader() {

  return (
    <div style={styles.container}>
      <Spinner animation="border" style={{ width: "3rem", height: "3rem" }} />
    </div>
  );
  
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
};

export default Loader;