import http from './httpServices';

const epiEndPoint = "http://localhost:5000/api/owners";


export async function getOwners() {
    return http.get(epiEndPoint);
};

export function deleteOwner(id) {
    return http.delete(epiEndPoint + '/' + id);
};

export function postOwner(owner) {
    return http.post(epiEndPoint, owner);
};

export function putOwner(owner) {
    const body = { ...owner };
    delete body._id;
    delete body.action
    delete body.__v
    return http.put(epiEndPoint + '/' + owner._id, body);
};
