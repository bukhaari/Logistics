import http from './httpServices';

const epiEndPoint = "http://localhost:5000/api/drivers";


export async function getDrivers() {
    return http.get(epiEndPoint);
};

export function deleteDriver(id) {
    return http.delete(epiEndPoint + '/' + id);
};

export function postDriver(driver) {
    return http.post(epiEndPoint, driver);
};

export function putDriver(driver) {
    const body = { ...driver };
    delete body._id;
    delete body.action
    delete body.__v
    return http.put(epiEndPoint + '/' + driver._id, body);
};
