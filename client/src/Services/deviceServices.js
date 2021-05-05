import http from './httpServices';

const epiEndPoint = "http://localhost:5000/api/devices";

export async function getDevices() {
    return http.get(epiEndPoint);
};

export function deleteDevice(id) {
    return http.delete(epiEndPoint + '/' + id);
};

export function postDevice(device) {
    return http.post(epiEndPoint, device);
};

export function putDevice(device) {
    const body = { ...device };
    delete body._id;
    delete body.action;
    delete body.__v;
    return http.put(epiEndPoint + '/' + device._id, body);
};
