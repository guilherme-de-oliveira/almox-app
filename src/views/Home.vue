<template>
  <v-app id="inspire">
    <v-item  v-for="value in data" :key="value.action" class="card">
      <Cards
      
        :action="value.action"
        :cabecalho="value.cabecalho"
        :descritivo="value.descritivo"
        :tipo="value.tipo"/>
    </v-item>
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
        requisitar: {
          action: '/requistar',
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
.card{
    /* display: flex; */
/*    
    display: flex;
  justify-content: flex-start; */

}
</style>