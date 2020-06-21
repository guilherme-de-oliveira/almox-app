import axios from 'axios';
const url = 'http://almoxarifado-tg.sa-east-1.elasticbeanstalk.com/requisicao';

class DataService {
    static getRequisicoes() {
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

    static setRequisicao(data) {
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

    static updateRequisicao(item, data) {
        console.log(item)
        console.log(data)
        return new Promise((resolve, reject) => {
            try {
                const res = axios.patch(url+ '/atender/' +item.id_requisicao, data);
                console.log(res);
                resolve (res);
            } catch(err) {
                reject(err)
            }
        })
    }

    // static deleteRequisicao(item) {
    //     console.log(item);
    //     return new Promise((resolve, reject) => {
    //         try {
    //             const res = axios.delete(url+'/'+item.id_requisicao);
    //             console.log(res);
    //             resolve (res);
    //         } catch(err) {
    //             reject(err)
    //         }
    //     })
    // }
}

export default {
    DataService,
}