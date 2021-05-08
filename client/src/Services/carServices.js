import http from "./httpServices";

const epiEndPoint = "http://localhost:5000/api/cars";

export async function getCars() {
  return http.get(epiEndPoint);
}
export async function getCar(id) {
  return http.get(epiEndPoint + "/" + id);
}

export function deleteCar(id) {
  return http.delete(epiEndPoint + "/" + id);
}

export function postCar(car) {
  return http.post(epiEndPoint, car);
}

export function putCar(car) {
  const body = { ...car };
  delete body._id;
  delete body.action;
  delete body.__v;
  return http.put(epiEndPoint + "/" + car._id, body);
}
