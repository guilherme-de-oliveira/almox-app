// import axios from 'axios';
const axios = require('axios');

// import mockData from './mock-data.json';
const url = 'http://almoxarifado-tg.sa-east-1.elasticbeanstalk.com/material/';

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
    static getMateriais() {
        return new Promise( (resolve, reject) => { //retirei o ASYNC
            try {
                // const res = mockData.materiais;
                const res = axios.get(url);
                
                resolve (res);
            } catch(err) {
                reject(err)
            }
        })
    }

    static getMaterialById(item) {
        return new Promise( (resolve, reject) => { //retirei o ASYNC
            try {
                const res = axios.get(url`${item.id_material}`);
                
                console.log(res);
                resolve (res);
            } catch(err) {
                reject(err)
            }
        })
    }

    
    static getUnidadesMedida() {
        return new Promise( (resolve, reject) => { //retirei o ASYNC
            try {
                const res = axios.get('http://almoxarifado-tg.sa-east-1.elasticbeanstalk.com/un_medida');
                
                console.log(res);
                resolve (res);
            } catch(err) {
                reject(err)
            }
        })
    }

    static setMaterial(data) {
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

    static updateMaterial() {
        return new Promise((resolve, reject) => {
            try {
                const res = "Atualizado!";
                resolve (res);
            } catch(err) {
                reject(err)
            }
        })
    }

    static deleteMaterial(item) {
        console.log(item)
        return new Promise((resolve, reject) => {
            try {
                const res = axios.delete('http://almoxarifado-tg.sa-east-1.elasticbeanstalk.com/material/'+item.id_material);
                console.log(res);
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