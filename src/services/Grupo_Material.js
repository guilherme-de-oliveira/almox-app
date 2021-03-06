import axios from 'axios';
const url = 'http://almoxarifado-tg.sa-east-1.elasticbeanstalk.com/grupo_material';

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
    static getGrupos() {
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

    static setGrupo(data) {
        return new Promise((resolve, reject) => {
            try {
                const res = axios.post(url, data);
                resolve (res);
            } catch(err) {
                reject(err)
            }
        })
    }

    static updateGrupo() {
        return new Promise((resolve, reject) => {
            try {
                const res = "Atualizado!";
                resolve (res);
            } catch(err) {
                reject(err)
            }
        })
    }

    static deleteGrupo(item) {
        return new Promise((resolve, reject) => {
            try {
                const res = axios.delete(url + '/'+ item.id_grupo_material);
                // console.log(res)
                // console.log(res)
                resolve (res);
                console.log(res)
                // alert(res.request.response)
            } catch(err) {
                console.log(err)
                reject(err)
            }
        })
    }
}

export default {
    DataService,
}