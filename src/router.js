import Vue from 'vue';
import VueRouter from 'vue-router';

import Requisicao from './views/Requisicao.vue';
import Home from './views/Home.vue';
import Usuario from './views/Usuario.vue';
import Fabricante from './views/Fabricante.vue';
import Grupo_Material from './views/Grupo_Material.vue';
import Inventario from './views/Inventario.vue';
import Local_Armazenamento from './views/Local_Armazenamento.vue';
import Material from './views/Material.vue';
import Solicitacao_Material from './views/Solicitacao_Material.vue';
import Login from './views/Login.vue';

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
        {
            path: '/inventario',
            name: 'inventario',
            component: Inventario
        },
        {
            path: '/local',
            name: 'local',
            component: Local_Armazenamento
        },
        {
            path: '/material',
            name: 'material',
            component: Material
        },
        {
            path: '/solicitacaoMaterial',
            name: 'solicitacaoMaterial',
            component: Solicitacao_Material
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
    ]
});