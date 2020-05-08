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
        :tipo="value.tipo"/>
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
        usuario: {
          action: '/usuario',
          cabecalho: 'Home',
          descritivo: 'Greyhound divisely hello coldly fonwderfully',
          tipo: 'Gerenciar'
        },
        requisicao: {
          action: '/requisicao',
          cabecalho: 'Requisição',
          descritivo: 'Greyhound divisely hello coldly fonwderfully',
          tipo: 'Gerenciar'
        },
        inventario: {
          action: '/inventario',
          cabecalho: 'Inventário',
          descritivo: 'Greyhound divisely hello coldly fonwderfully',
          tipo: 'Gerenciar'
        },
        estoque: {
          action: '/estoque',
          cabecalho: 'Estoque',
          descritivo: 'Greyhound divisely hello coldly fonwderfully',
          tipo: 'Gerenciar'
        },
        // inventario: {
        //   action: '/inventario',
        //   cabecalho: 'Inventário',
        //   descritivo: 'Greyhound divisely hello coldly fonwderfully',
        //   tipo: "Gerenciar"
        // }
      }
    }),
  }
</script>

<style>

</style>