<template>
  <v-app id="inspire">
    <v-row>
      <v-col cols="12" sm="4">
        <v-item  v-for="value in data" :key="value.cabecalho">
          <v-card
            class="d-inline-block cards"
            max-width="344"
            min-width="344"
            outlined>
            <v-list-item three-line>
              <v-list-item-content>
                <v-list-item-title class="headline mb-1"> {{ value.cabecalho }} </v-list-item-title>
                <v-list-item-subtitle> {{ value.descritivo }} </v-list-item-subtitle>
              </v-list-item-content>
              <v-btn class="mx-2" fab dark large color="" @click="openForm(value)">
                <v-icon dark> {{ value.icone }} </v-icon>
              </v-btn>
            </v-list-item>
          </v-card>
        </v-item>
      </v-col>
      <v-col cols="12" sm="7">
        <form class="formUser" v-if="formUser">
          <h2>{{ titulo }}</h2>
          <v-row>
            <v-col cols="12" sm="3">
              <v-text-field
                v-model="name"
                :error-messages="nameErrors"
                :counter="10"
                label="Código Usuário"
                required
                @input="$v.name.$touch()"
                @blur="$v.name.$touch()"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="9">
            <v-text-field
              v-model="email"
              :error-messages="emailErrors"
              label="Nome"
              required
              @input="$v.email.$touch()"
              @blur="$v.email.$touch()"
            ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6">
              <v-select
                v-model="select"
                :items="items"
                :error-messages="selectErrors"
                label="Setor"
                required
                @change="$v.select.$touch()"
                @blur="$v.select.$touch()"
              ></v-select>
            </v-col>
            <v-col cols="12" sm="6">
              <v-select
                v-model="select"
                :items="items"
                :error-messages="selectErrors"
                label="Nível de acesso    "
                required
                @change="$v.select.$touch()"
                @blur="$v.select.$touch()"
              ></v-select>
            </v-col>
          </v-row>
          <v-btn color="primary" @click="submit" style="margin-right: 20px;">salvar</v-btn>
          <v-btn color="error darken-1" @click="clear">cancelar</v-btn>
        </form>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
// import Cards from '../components/Cards';

  export default {

    props: {
      source: String,
    },
    components: {
        // Cards
    },
    data: () => ({
      data: {
        adicionar: {
          action: '/usuario',
          cabecalho: 'Adicionar Usuário',
          descritivo: '',
          icone:'mdi-plus',
          tipo: 'adicionar'
        },
        editar: {
          action: '/usuario',
          cabecalho: 'Consultar Usuário',
          descritivo: '',
          icone: 'mdi-pencil',
          tipo: 'consultarEditar'
        },
        remover: {
          action: '/usuario',
          cabecalho: 'Remover Usuário',
          descritivo: '',
          icone:'mdi-minus',
          tipo: 'remover'
        },
      },
      titulo: '',
      formUser: false,
    }),
    methods: {
      openForm(data){
        console.log(data);
        this.formUser = true;

        this.titulo = data.cabecalho;
      }
    }
  }
</script>
<style>
.cards{
  margin: 20px 20px 20px 100px !important; 
}
.formUser{
  /* margin-right: 10px !important; */
}
</style>