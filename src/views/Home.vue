<template>
  <v-app id="inspire">
    <v-col cols="12">
        <v-row
          align="center"
          justify="center"
          class="grey lighten-5"

        >
    <v-item  v-for="value in data" :key="value.action" class="card">
      <Cards
        :action="value.action"
        :cabecalho="value.cabecalho"
        :descritivo="value.descritivo"
        :tipo="value.tipo"
        :icone="value.icone"/>
    </v-item>
        </v-row>
    </v-col>
  </v-app>
</template>

<script>
import Cards from '../components/Cards';

  export default {

    components: {
        Cards
    },
    data: () => ({
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

</style>