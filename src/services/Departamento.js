import axios from 'axios';

const url = 'http://almoxarifado-tg.sa-east-1.elasticbeanstalk.com/departamento';

class DataService {
    static getDepartamentos() {
        return new Promise( (resolve, reject) => {
            try {
                const res = axios.get(url);
                console.log(res);
                resolve (res);
            } catch(err) {
                reject(err)
            }
        })
    }

    static setLocal(data) {
        return new Promise((resolve, reject) => {
            try {
                const res = axios.post(url, data);
                resolve (res);
            } catch(err) {
                reject(err)
            }
        })
    }

    static updateLocal() {
        return new Promise((resolve, reject) => {
            try {
                const res = "Atualizado!";
                resolve (res);
            } catch(err) {
                reject(err)
            }
        })
    }

    static deleteLocal() {
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