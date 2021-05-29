import http from "./httpServices";

const epiEndPoint = "http://localhost:5000/api/auth";

export function login(email, password) {
  return http.post(epiEndPoint, { email, password });
}
