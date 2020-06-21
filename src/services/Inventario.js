import axios from 'axios';
const url = 'http://almoxarifado-tg.sa-east-1.elasticbeanstalk.com/inventario';

class DataService {
    static getInventario() {
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

    static setInventario(data) {
        console.log(data);
        return new Promise((resolve, reject) => {
            try {
                const res = axios.post(url, data);
                console.log(res);
                // const res = "Cadastrado!";
                resolve (res);
            } catch(err) {
                console.log(err)
                reject(err)
            }
        })
    }

    static updateInventario() {
        return new Promise((resolve, reject) => {
            try {
                const res = "Atualizado!";
                resolve (res);
            } catch(err) {
                reject(err)
            }
        })
    }

    static deleteInventario() {
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