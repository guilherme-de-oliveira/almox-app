<template>
  <v-app id="inspire">
test
<Cards/>
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
      drawer: null,
    }),
  }
</script>