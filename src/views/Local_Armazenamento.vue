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
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat color="#F5F5F5">
            <v-toolbar-title>Locais</v-toolbar-title>
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
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.id_local" label="ID Local" disabled></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" sm="6" md="5">
                        <v-text-field v-model="editedItem.corredor" label="Corredor"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="5">
                        <v-text-field v-model="editedItem.prateleira" label="Prateleira"></v-text-field>
                      </v-col>
                      <!-- <v-col cols="12" sm="6" md="2">
                        <v-btn class="mx-2" fab dark small color="primary">
                          <v-icon dark>mdi-plus</v-icon>
                        </v-btn>
                      </v-col> -->
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
        <!-- <template v-slot:no-data>
          <v-btn color="primary" @click="initialize">Reset</v-btn>
        </template> -->
      </v-data-table>
    </v-col>
  </v-app>
</template>

<script>
import Local_Armazenamento from '../services/Local_Armazenamento';

export default {
    data: () => ({
      titulo: 'Local de Armazenamento',
      sortBy: 'corredor',
      sortDesc: true,
      search: '',
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
      dialog: false,
      headers: [
        {
          text: 'ID Local',
          align: 'start',
          sortable: false,
          value: 'id_local',
        },
        { text: 'Corredor', value: 'corredor' },
        { text: 'Prateleira', value: 'prateleira' },
        { text: 'Ação', value: 'actions', sortable: false },
      ],
      data: [],
      editedIndex: -1,
      editedItem: {
        id_local: '',
        corredor: '',
        prateleira: '',
      },
      defaultItem: {
        id_local: '',
        corredor: '',
        prateleira: '',
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
        let resources = await Local_Armazenamento.DataService.getLocais();
        this.data = resources.data;
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
        if(confirm('Deletar Item?')){
          try{
              console.log(this.editedItem);
              let response = Local_Armazenamento.DataService.deleteLocal();
              this.data.splice(index, 1)
              alert("Response: ", response);
          } catch (err) {
            alert(err);
          }
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
            let response = Local_Armazenamento.DataService.updateLocal();
            alert("Response: ", response);
          } catch(error) {
            alert(error);
          }
          
        } else { 
          //Add Item
          console.log(this.editedItem);

          try {
            let response = Local_Armazenamento.DataService.setLocal(this.editedItem);
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