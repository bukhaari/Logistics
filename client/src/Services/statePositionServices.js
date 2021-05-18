import http from "./httpServices";

const ApiEndPoint = "http://localhost:5000/api/state";

export async function getStates() {
  return http.get(ApiEndPoint);
}

export function deleteState(id) {
  return http.delete(ApiEndPoint + "/" + id);
}

export function postState(state) {
  return http.post(ApiEndPoint, state);
}

export function putState(state) {
  const body = { ...state };
  delete body._id;
  delete body.action;
  delete body.__v;
  return http.put(ApiEndPoint + "/" + state._id, body);
}
