// import axios from 'axios';
const axios = require('axios');

// import mockData from './mock-data.json';
const url = 'http://almoxarifado-tg.sa-east-1.elasticbeanstalk.com/solicitacao/';

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
    static getSolicitacoes() {
        return new Promise( (resolve, reject) => { //retirei o ASYNC
            try {
                const res = axios.get(url);
                console.log(res);
                resolve (res);
            } catch(err) {
                reject(err)
            }
        })
    }

    static setSolicitacao(data) {
        console.log(data);
        return new Promise((resolve, reject) => {
            try {
                const res = axios.post(url, data);
                console.log(res);
                resolve (res);
            } catch(err) {
                reject(err)
            }
        })
    }

    static updateSolicitacao() {
        return new Promise((resolve, reject) => {
            try {
                const res = "Atualizado!";
                resolve (res);
            } catch(err) {
                reject(err)
            }
        })
    }

    static deleteSolicitacao() {
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