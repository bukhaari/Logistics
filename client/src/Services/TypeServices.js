import http from './httpServices';

const epiEndPoint = "http://localhost:5000/api/cartypes";

export async function getTypes() {
    return http.get(epiEndPoint);
};

export function deleteType(id) {
    return http.delete(epiEndPoint + '/' + id);
};

export function postType(type) {
    return http.post(epiEndPoint, type);
};

export function putType(type) {
    const body = { ...type };
    delete body._id;
    delete body.action;
    delete body.__v;
    return http.put(epiEndPoint + '/' + type._id, body);
};
