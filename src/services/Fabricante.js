import axios from 'axios';
// import mockData from './mock-data.json';
const url = 'http://almoxarifado-tg.sa-east-1.elasticbeanstalk.com/fabricante';

// class TaskService {
//     static getAllTickets() {
//         return new Promise(async (resolve, reject) => {
//             try {
//                 // const res = await axios.get(`${url}system-management/ticket/`);
//                 const res = mockData.fabricantes;
//                 console.log(res);
//                 resolve (res.data);
//             } catch(err) {
//                 reject(err)
//             }
//         })
//     }
// }

class DataService {
    static getFabricantes() {
        return new Promise((resolve, reject) => { //retirei o ASYNC
            try {
                const res = axios.get(url);
                console.log(res);
                resolve (res);
            } catch(err) {
                reject(err)
            }
        })
    }

    static setFabricante(data) {
        console.log(data);
        return new Promise((resolve, reject) => {
            try {
                const res = axios.post(url, data);
                resolve (res);
            } catch(err) {
                reject(err)
            }
        })
    }

    static updateFabricante(data) {
        console.log(data);
        return new Promise((resolve, reject) => {
            try {
                const res = axios.patch(url, data);
                resolve (res);
            } catch(err) {
                reject(err)
            }
        })
    }

    static deleteFabricante(item) {
        return new Promise((resolve, reject) => {
            try {
                const res = axios.delete(url + '/'+ item.id_fabricante);
                resolve (res);
            } catch(err) {
                reject(err)
            }
        })
    }
}

export default {
    DataService,
}