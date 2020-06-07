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
            <v-toolbar-title>Materiais</v-toolbar-title>
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
                        <v-text-field v-model="editedItem.codMaterial" label="Cod Material" disabled></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="8">
                        <v-text-field v-model="editedItem.descricao" label="Descrição"></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.fabricante" label="ID Fabricante"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.local" label="ID Local"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.grupoMaterial" label="ID Grupo Material"></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <thead>
                        <tr>
                          <th class="text-left">Estoque</th>
                        </tr>
                      </thead>
                      <v-col cols="12" sm="6" md="3">
                        <v-text-field v-model="editedItem.estoque" label="Atual"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="3">
                        <v-text-field v-model="editedItem.estoqueMinimo" label="Mínimo"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="3">
                        <v-text-field v-model="editedItem.estoqueSeguranca" label="Segurança"></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field v-model="editedItem.codigoBarra" label="Código de barra"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.unidadeMedidada" label="Un Medida"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="2" v-if="editedIndex === -1">
                        <v-btn class="mx-2" fab dark small color="primary" @click="addItems(editedItem)">
                          <v-icon dark>mdi-plus</v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                  <v-row>
                    <v-simple-table dense>
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th class="text-left">Descrição</th>
                            <th class="text-left">Estoque</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="item in addedItems" :key="item.descricao">
                            <td>{{ item.descricao }}</td>
                            <td>{{ item.estoque }}</td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
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
import Material from '../services/Material';

  export default {
    data: () => ({
      titulo: 'Material',
      search: '',
            date: new Date().toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
      dialog: false,
      data: [],
      headers: [
        {
          text: 'Cod Material',
          align: 'start',
          sortable: false,
          value: 'codMaterial',
        },
        { text: 'Descrição', value: 'descricao' },        
        { text: 'Estoque', value: 'estoque' },
        { text: 'Estoque Seg.', value: 'estoqueSeguranca' },
        { text: 'Un Medida', value: 'unidadeMedida' },
        { text: 'Ação', value: 'actions', sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        codMaterial: "",
        unidadeMedida: "",
        fabricante: "",
        local: "",
        codigoBarra: "",
        estoque: "",
        estoqueMinimo: "",
        estoqueSeguranca: "",
        grupoMaterial: "",
        descricao: ""
      },
      addedItems: [],
      defaultItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
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
        let resources = await Material.DataService.getMateriais();
        console.log(resources.data);
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
        if (confirm('Deletar Item?')) {
          try{
              console.log(this.editedItem);
              let response = Material.DataService.deleteMaterial();
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
            let response = Material.DataService.updateMaterial();
            alert("Response: ", response);
          } catch(error) {
            alert(error);
          }
          
        } else { 
          //Add Item
          console.log(this.editedItem);

          try {
            let response = Material.DataService.setMaterial();
            this.data.push(this.editedItem);
            alert("Response: ", response);
          } catch(error) {
            alert(error);
          }
        }
        this.close()
      },

      addItems(item) {
        console.log(item)

        this.addedItems.push(this.editedItem);
        this.editedItem = {};
        console.log(this.addedItems);
      }
    }
  } 
</script>
<style>
h2{
  margin-left: 70px;
}
 
</style>