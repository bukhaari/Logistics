import http from "./httpServices";

const epiEndPoint = "http://localhost:5000/api/contracts";

export async function getContracts() {
  return http.get(epiEndPoint);
}
export async function getContract(id) {
  return http.get(epiEndPoint + "/" + id);
}

export function deleteContract(id) {
  return http.delete(epiEndPoint + "/" + id);
}

export function postContract(contract) {
  return http.post(epiEndPoint, contract);
}

export function putContract(contract) {
  const body = { ...contract };
  delete body._id;
  delete body.action;
  delete body.__v;
  return http.put(epiEndPoint + "/" + contract._id, body);
}

export function putSatatus(status) {
  const body = { ...status };
  delete body._id;
  return http.put(epiEndPoint + "/status/" + status._id, body);
}
