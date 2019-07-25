import { put, takeLatest, all } from "redux-saga/effects";
import { fetchGraphData as fetchData } from "../mockApi";

function* fetchGraphData() {
  const json = yield fetchData();
  yield put({ type: "GET_GRAPH_DATA_SUCCESS", json });
}
function* actionWatcher() {
  yield takeLatest("REQUEST_GET_GRAPH_DATA", fetchGraphData);
}
export default function* rootSaga() {
  yield all([actionWatcher()]);
}
