import Vue from 'vue';
import VueRouter from 'vue-router';

import Requisicao from './views/Requisicao.vue';
import Home from './views/Home.vue';
import Usuario from './views/Usuario.vue';
import Fabricante from './views/Fabricante.vue';
import Grupo_Material from './views/Grupo_Material.vue'

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/requisicao',
            name: 'requisicao',
            component: Requisicao
        },
        {
            path: '/usuario',
            name: 'usuario',
            component: Usuario
        },
        {
            path: '/fabricante',
            name: 'fabricante',
            component: Fabricante
        },
        {
            path: '/grupoMaterial',
            name: 'grupoMaterial',
            component: Grupo_Material
        },
    ]
});