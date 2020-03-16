

<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
     <v-list dense>
        <v-list-item link>
            <v-list-item-title>
                <router-link to="./">
                    Home
                </router-link>
            </v-list-item-title>
        </v-list-item>
        <v-list-item link>
            <v-list-item-title>
                <router-link to="./requisicao">
                    Requisicao
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
    </v-app-bar>

<router-view class="view"></router-view>
   <v-footer
      color="indigo"
      app
    >
      <span class="white--text">&copy; 2019</span>
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
    }),
  }
</script>
<style>
.view{
  padding-top: 100px;
}
</style>