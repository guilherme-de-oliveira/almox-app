<template>
  <v-card
    class="mx-auto card"
    max-width="344"
    outlined
  >
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class="headline mb-1"> {{ cabecalho }} </v-list-item-title>
        <v-list-item-subtitle> {{ descritivo }} </v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-avatar size="80" color="#F5F5F5">
        <v-icon large> {{ icone }} </v-icon>
      </v-list-item-avatar>
    </v-list-item>

    <v-card-actions>
        <router-link :to="action">
            <v-btn text small>{{ tipo }}</v-btn>
        </router-link>
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    props: {
      action: String,
      cabecalho: String,
      descritivo: String,
      tipo: String,
      icone: String,
    },
    data: () => ({
      // action: '/usuario',
      // cabecalho: 'Usuario',
      // descritivo: 'Greyhound divisely hello coldly fonwderfully',
      // type: "Gerenciar"
    }),
  }

</script>

<style scoped>
.card{
  margin: 10px !important;
}
</style>