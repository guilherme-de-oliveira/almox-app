<template>
  <v-card
    class="mx-auto"
    max-width="344"
    outlined
  >
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class="headline mb-1"> {{ cabecalho }} </v-list-item-title>
        <v-list-item-subtitle> {{ descritivo }} </v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-avatar
        tile
        size="80"
        color="grey"
      ></v-list-item-avatar>
    </v-list-item>

    <v-card-actions>
        <router-link to="/usuario">
            <v-btn text >Gerenciar</v-btn>
        </router-link>
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    props: {
      
    },
    data: () => ({
      cabecalho: 'Usuario',
      descritivo: 'Greyhound divisely hello coldly fonwderfully',

    }),
  }

</script>