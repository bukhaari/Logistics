import http from "./httpServices";

const epiEndPoint = "http://localhost:5000/api/projects";

export async function getProjects() {
  return http.get(epiEndPoint);
}

export function deleteProject(id) {
  return http.delete(epiEndPoint + "/" + id);
}

export function postProject(project) {
  return http.post(epiEndPoint, project);
}

export function putProject(project) {
  const body = { ...project };
  delete body._id;
  delete body.action;
  delete body.position;
  delete body.__v;
  return http.put(epiEndPoint + "/" + project._id, body);
}

export function putSatatus(status) {
  const body = { ...status };
  delete body._id;
  return http.put(epiEndPoint + "/status/" + status._id, body);
}
