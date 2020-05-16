

<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app>
      <v-list dense>
        <v-list-item link>
            <v-list-item-title>
                <router-link to="./">
                    Home
                </router-link>
            </v-list-item-title>
        </v-list-item>
        <v-list-item link v-for="item in data" :key="item.action">
            <v-list-item-title>
              <v-icon large> {{ item.icone }} </v-icon>
              <router-link :to="item.action">
                {{ item.cabecalho }}
              </router-link>
            </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="indigo"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Almoxarifado - Jhons</v-toolbar-title>
      <v-spacer></v-spacer>
      <span style="text-align: right"> {{user}} </span>
    </v-app-bar>

<router-view class="view"></router-view>
   <v-footer
      color="indigo"
      app
    >
      <span class="white--text">&copy; 2020</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
      user: 'Guilherme de Oliveira',
      data: {
        fabricante: {
          action: '/fabricante',
          cabecalho: 'Fabricante',
          descritivo: 'Greyhound divisely hello coldly fonwderfully',
          tipo: 'Gerenciar',
          icone: 'mdi-hard-hat',
        },
        grupoMaterial: {
          action: '/grupoMaterial',
          cabecalho: 'Grupo de Material',
          descritivo: 'Greyhound divisely hello coldly fonwderfully',
          tipo: 'Gerenciar',
          icone: 'mdi-group',
        },
        inventario: {
          action: '/inventario',
          cabecalho: 'Inventário',
          descritivo: 'Greyhound divisely hello coldly fonwderfully',
          tipo: 'Gerenciar',
          icone: 'mdi-not-equal',
        },
        local: {
          action: '/local',
          cabecalho: 'Local de Armazenamento',
          descritivo: 'Greyhound divisely hello coldly fonwderfully',
          tipo: 'Gerenciar',
          icone: 'mdi-parachute'
        },
        material: {
          action: '/material',
          cabecalho: 'Material',
          descritivo: 'Greyhound divisely hello coldly fonwderfully',
          tipo: 'Gerenciar',
          icone: 'mdi-puzzle'
        },
        requisicao: {
          action: '/requisicao',
          cabecalho: 'Requisição',
          descritivo: 'Greyhound divisely hello coldly fonwderfully',
          tipo: 'Gerenciar',
          icone: 'mdi-pen',
        },

        solicitacaoMaterial: {
          action: '/solicitacaoMaterial',
          cabecalho: 'Solicitaçao de Material',
          descritivo: 'Greyhound divisely hello coldly fonwderfully',
          tipo: 'Gerenciar',
          icone: 'mdi-book-open',
        },
        usuario: {
          action: '/usuario',
          cabecalho: 'Usuário',
          descritivo: 'Greyhound divisely hello coldly fonwderfully',
          tipo: 'Gerenciar',
          icone: 'mdi-account',
        },
     // estoque: {
        //   action: '/estoque',
        //   cabecalho: 'Estoque',
        //   descritivo: 'Greyhound divisely hello coldly fonwderfully',
        //   tipo: 'Gerenciar'
        // },
      }
    }),
  }
</script>
<style>
.view{
  padding-top: 100px;
}
</style>