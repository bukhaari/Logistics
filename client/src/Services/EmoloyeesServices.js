import http from './httpServices';

const epiEndPoint = "http://localhost:5000/api/employees";

export async function getEmployees(){
   return http.get(epiEndPoint);
}

export function deleteEmployee(id){
    return http.delete(epiEndPoint + '/'+ id );
}

export function postEmployee(employee){
    return http.post(epiEndPoint, employee);
}

export function putEmployee(employee){
    const body = {...employee};
    delete body._id;
    delete body.__v;
    delete body.action;
    return http.put(epiEndPoint + '/' + employee._id, body  );
}