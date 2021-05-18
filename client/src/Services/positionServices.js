import http from "./httpServices";

const epiEndPoint = "http://localhost:5000/api/positions";

export async function getPositions() {
  return http.get(epiEndPoint);
}

export function deletePosition(id) {
  return http.delete(epiEndPoint + "/" + id);
}

export function getPosition(id) {
  return http.get(epiEndPoint + "/" + id);
}

export function postPosition(position) {
  return http.post(epiEndPoint, position);
}

export function putPosition(position) {
  const body = { ...position };
  delete body._id;
  delete body.__v;
  delete body.action;
  return http.put(epiEndPoint + "/" + position._id, body);
}
