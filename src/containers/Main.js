import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getGraphData } from "../actions";
import Graph from "../components/Graph";
import { maxValueSelector } from "../selectors/graphSelector";
import loading from "../media/loading.svg";

function Main(props) {
  useEffect(() => {
    props.getGraphData();
  }, []);
  return (
    <>
      <div style={{ position: "relative" }}>
        {props.graphReducer.loading && (
          <div
            style={{
              position: "absolute",
              left: "44%",
              top: "38%",
              zIndex: "100",
              display: "flex",
              flexDirection: "row",
              alignItems: "center"
            }}
          >
            <img
              src={loading}
              style={{ marginRight: "10px", width: "40px", height: "40px" }}
            />
            Loading
          </div>
        )}
        <Graph
          data={props.graphReducer.data}
          maxValue={maxValueSelector(props.graphReducer)}
        />
      </div>
      <h2>Data</h2>
      <code>{JSON.stringify(props.graphReducer.data)}</code>
    </>
  );
}

export default connect(
  state => state,
  {
    getGraphData
  }
)(Main);
