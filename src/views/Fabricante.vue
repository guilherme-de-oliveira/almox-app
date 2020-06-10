<template>
   <v-app id="inspire">
    <h2>{{ titulo }}</h2>
    <v-col cols="12">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
      </template>
      <v-col cols="12" sm="6">
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Procurar"
          solo
          hide-details
          max-size="300px"
        ></v-text-field>
      </v-col>
      <v-data-table
        :headers="headers"
        :items="data"
        :search="search"
        sort-by="calories"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat color="#F5F5F5">
            <v-toolbar-title>Fabricantes</v-toolbar-title>
            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on }">
                <v-btn color="primary" dark class="mb-2" v-on="on">+ Novo</v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="5">
                        <v-text-field v-model="editedItem.cnpj" label="CNPJ"></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" sm="6" md="7">
                        <v-text-field v-model="editedItem.nome_fantasia" label="Nome"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="2">
                        <v-text-field v-model="editedItem.ddd" label="DDD"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="3">
                        <v-text-field v-model="editedItem.telefone" label="Telefone"></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field v-model="editedItem.razao_social" label="Razao Social"></v-text-field>
                      </v-col>  
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field v-model="editedItem.endereco" label="Endereco"></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="error darken-1" text @click="close">Cancelar</v-btn>
                  <v-btn color="blue darken-1" text @click="save">Salvar</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon
            small
            class="mr-2"
            @click="editItem(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            small
            @click="deleteItem(item)"
          >
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-col>
  </v-app>
</template>

<script>
import Fabricante from '../services/Fabricante.js';

  export default {
    data: () => ({
      titulo: 'Fabricante',
      search: '',
            date: new Date().toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
      dialog: false,
      headers: [
        {
          text: 'CNPJ',
          align: 'start',
          sortable: false,
          value: 'cnpj',
        },
        { text: 'Nome', value: 'nome_fantasia' },
        { text: 'Razao Social', value: 'razao_social' },
        { text: 'Endereço', value: 'endereco' },
        { text: 'Ação', value: 'actions', sortable: false },
      ],
      data: [],
      editedIndex: -1,
      editedItem: {
        cnpj: '',
        nome: '',
        razaoSocial: '',
        endereco: '',
        ddd: '',
        telefone: ''
      },
      defaultItem: {
        cnpj: '',
        nome: 0,
        razaoSocial: 0,
        endereco: 0,
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Novo' : 'Editar'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    async mounted() {
      try {
        // const resources = await SystemManagement.TaskService.getAlltickets()
        let resources = await Fabricante.DataService.getFabricantes();
        this.data = resources.data;
        console.log(resources);
      } catch(error) {
        console.log(error);
      }
    },

    methods: {
      editItem (item) {
        this.editedIndex = this.data.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.data.indexOf(item)
        confirm('Deletar Item?');
        try{
            console.log(this.editedItem);
            let response = Fabricante.DataService.deleteFabricante();
            this.data.splice(index, 1)
            alert("Response: ", response);
        } catch (err) {
          alert(err);
        }
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          //Update Item
          try {
            Object.assign(this.data[this.editedIndex], this.editedItem);
            console.log(this.editedItem);
            let response = Fabricante.DataService.updateFabricante();
            alert("Response: ", response);
          } catch(error) {
            alert(error);
          }
          
        } else { 
          //Add Item
          console.log(this.editedItem);

          try {
            let response = Fabricante.DataService.setFabricante();
            this.data.push(this.editedItem);
            alert("Response: ", response);
          } catch(error) {
            alert(error);
          }
        }
        this.close()
      },
    }
  } 
</script>
<style>
 h2{
   margin-left: 70px;
 }
 
</style>