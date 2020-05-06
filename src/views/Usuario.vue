<template>
  <v-app id="inspire">
    <v-item  v-for="value in data" :key="value">
      <Cards
        :action="value.action"
        :cabecalho="value.cabecalho"
        :descritivo="value.descritivo"
        :type="value.type"/>
    </v-item>
  </v-app>
</template>

<script>
import Cards from '../components/Cards';

  export default {

    props: {
      source: String,
    },
    components: {
        Cards
    },
    data: () => ({
      data: {
        adicionar: {
          action: '/usuario',
          cabecalho: 'Adicionar',
          descritivo: 'testeteststets',
          type: 'Ir'
        },
        editar: {
          action: '/usuario',
          cabecalho: 'Editar',
          descritivo: 'Greyhound divisely hello coldly fonwderfully',
          type: 'Ir'
        },
        remover: {
          action: '/usuario',
          cabecalho: 'Remover',
          descritivo: 'Greyhound divisely hello coldly fonwderfully',
          type: 'Ir'
        },
      }

    }),
  }
</script>