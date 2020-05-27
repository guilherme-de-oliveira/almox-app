<template>
  <v-app id="inspire">
    <v-col cols="12">
      <v-row
        align="center"
        justify="center"
        class="grey lighten-5">
        <v-item  v-for="value in data" :key="value.action" class="card">
          <Cards
            :action="value.action"
            :cabecalho="value.cabecalho"
            :color="value.color"
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
          color: 'yellow darken-2',
          descritivo: 'Parceiros que nos ajudam a constuír nossos produtos.',
          tipo: 'Gerenciar',
          icone: 'mdi-hard-hat',
        },
        grupoMaterial: {
          action: '/grupoMaterial',
          cabecalho: 'Grupo de Material',
          color: "green darken-2",
          descritivo: 'Metal, plástico, escritório e mais.',
          tipo: 'Gerenciar',
          icone: 'mdi-group',
        },
        inventario: {
          action: '/inventario',
          cabecalho: 'Inventário',
          color:"red darken-2",
          descritivo: 'Listagem completa de todos os produtos armazenados.',
          tipo: 'Gerenciar',
          icone: 'mdi-not-equal',
        },
        local: {
          action: '/local',
          cabecalho: 'Local Armazenamento',
          color: 'deep-purple darken-2',
          descritivo: 'Locais inteligentes para armazenamento de insumos',
          tipo: 'Gerenciar',
          icone: 'mdi-parachute'
        },
        material: {
          action: '/material',
          cabecalho: 'Material',
          color: 'cyan darken-2',
          descritivo: 'Itens a ingressarem à produção ou serem comercializados',
          tipo: 'Gerenciar',
          icone: 'mdi-puzzle'
        },
        requisicao: {
          action: '/requisicao',
          cabecalho: 'Requisição',
          color: 'brown darken-2',
          descritivo: 'Requisição de materiais feita por um setor',
          tipo: 'Gerenciar',
          icone: 'mdi-pen',
        },

        solicitacaoMaterial: {
          action: '/solicitacaoMaterial',
          cabecalho: 'Solicitação Compra',
          color: 'teal darken-2',
          descritivo: 'Solicitação de material que atingiram em estoque mínimo',
          tipo: 'Gerenciar',
          icone: 'mdi-book-open',
        },
        usuario: {
          action: '/usuario',
          cabecalho: 'Usuário',
          descritivo: 'Colaboradores que interagem com o sistema',
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