// import axios from 'axios';
import mockData from './mock-data.json';
// const url = 'url',

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
        return new Promise( (resolve, reject) => { //retirei o ASYNC
            try {
                const res = mockData.fabricantes;
                console.log(res);
                resolve (res);
            } catch(err) {
                reject(err)
            }
        })
    }

    static setFabricante() {
        return new Promise((resolve, reject) => {
            try {
                const res = "Cadastrado!";
                resolve (res);
            } catch(err) {
                reject(err)
            }
        })
    }

    static updateFabricante() {
        return new Promise((resolve, reject) => {
            try {
                const res = "Atualizado!";
                resolve (res);
            } catch(err) {
                reject(err)
            }
        })
    }

    static deleteFabricante() {
        return new Promise((resolve, reject) => {
            try {
                const res = "Deletado!";
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