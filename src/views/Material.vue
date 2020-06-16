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
                        <v-text-field v-model="editedItem.id_material" label="ID Material" disabled></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="8">
                        <v-text-field v-model="editedItem.descricao" label="Descrição"></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col class="d-flex" cols="12" sm="4">
                        <v-select
                          :items="fabricantes"
                          item-text="nome_fantasia"
                          item-value="id_fabricante"
                          label="Fabricante"
                          v-model="fabricante.id_fabricante"
                        ></v-select>
                      </v-col>
                      <v-col class="d-flex" cols="12" sm="4">
                        <v-select
                          :items="locais"
                          item-text="id_local"
                          item-value="id_local"
                          label="Local"
                          v-model="local.id_local"
                        ></v-select>
                      </v-col>
                      <v-col class="d-flex" cols="12" sm="4">
                        <v-select
                          :items="gruposMaterial"
                          item-text="descricao"
                          item-value="id_grupo_material"
                          label="Grupo Material"
                          v-model="grupoMaterial.id_grupo_material"
                        ></v-select>
                      </v-col>
                    </v-row>
                    <v-row>
                      <thead>
                        <tr>
                          <th class="text-left">Estoque</th>
                        </tr>
                      </thead>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field type="number" v-model="editedItem.estoque_atual" label="Atual"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field type="number" v-model="editedItem.estoque_minimo" label="Mínimo"></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field :counter="13" v-model="editedItem.cod_barra" label="Código de barra"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.id_un_medida" label="Un Medida"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="2" v-if="editedIndex === -1">
                        <!-- <v-btn class="mx-2" fab dark small color="primary" @click="addItems(editedItem)">
                          <v-icon dark>mdi-plus</v-icon>
                        </v-btn> -->
                      </v-col>
                    </v-row>
                  <!-- <v-row v-if="editedIndex === -1">
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
                            <td>{{ item.estoque_atual }}</td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </v-row> -->
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
import Fabricante from '../services/Fabricante.js';
import Grupo_Material from '../services/Grupo_Material.js';
import Local_Armazenamento from '../services/Local_Armazenamento';

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
      fabricantes: [],
      fabricante: {},
      gruposMaterial: [],
      grupoMaterial: {},
      locais: [],
      local:{},
      headers: [
        {
          text: 'ID Material',
          align: 'start',
          sortable: false,
          value: 'id_material',
        },
        { text: 'Descrição', value: 'descricao' },        
        { text: 'Estoque', value: 'estoque_atual' },
        { text: 'Estoque Min.', value: 'estoque_minimo' },
        { text: 'Un Medida', value: 'id_un_medida' },
        { text: 'Local', value: 'id_local' },
        { text: 'Ação', value: 'actions', sortable: false },
      ],
      editedIndex: -1,
      editedItem: {
        id: '',
        id_un_medida: "",
        id_fabricante: "",
        id_local: "",
        cod_barra: "",
        custo: 1.0,
        estoque_atual: 0.0,
        estoque_minimo: 0.0,
        id_grupo_material: "",
        descricao: ""
      },
      defaultItem: {
        id_material: "",
        id_un_medida: "Un",
        id_fabricante: "",
        id_local: "",
        cod_barra: "",
        custo: 1.0,
        estoque_atual: 0.0,
        estoque_minimo: 0.0,
        id_grupo_material: "",
        descricao: ""
      },
      addedItems: {},
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
        // console.log(resources.data);
        this.data = resources.data;

//arrumar
        // let resources1 = await Fabricante.DataService.getFabricantes();
        // this.fabricantes = resources1.data;
        // console.log(resources1.data);
      } catch(error) {
        console.log(error);
      }
      this.getFabricantes();
      this.getLocais();
      this.getGrupos();
    },

    methods: {
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
          this.editedItem.id_grupo_material = this.grupoMaterial.id_grupo_material;
          this.editedItem.id_fabricante = this.fabricante.id_fabricante;
          this.editedItem.id_local = this.local.id_local;

          this.editedItem.estoque_atual = parseInt(this.editedItem.estoque_atual);
          this.editedItem.estoque_minimo = parseInt(this.editedItem.estoque_minimo);
          try {
            let response = Material.DataService.setMaterial(this.editedItem);
            // this.data.push(this.editedItem);
            alert("Response: ", response);
          } catch(error) {
            alert(error);
          }
        }
        this.close()
      },

      async getFabricantes() {
        try {
          // const resources = await SystemManagement.TaskService.getAlltickets()
          let resources = await Fabricante.DataService.getFabricantes();
          this.fabricantes = resources.data;
          // console.log(resources.data);
        } catch(error) {
          console.log(error);
        }
      },

      async getLocais() {
        try {
          // const resources = await SystemManagement.TaskService.getAlltickets()
          let resources = await Local_Armazenamento.DataService.getLocais();
          this.locais = resources.data;
          console.log(resources);
        } catch(error) {
          console.log(error);
        }
      },

      async getGrupos() {
        try {
          // const resources = await SystemManagement.TaskService.getAlltickets()
          let resources = await Grupo_Material.DataService.getGrupos();
          this.gruposMaterial = resources.data;
        } catch(error) {
          console.log(error);
        }
      },

      editItem (item) {
        this.editedIndex = this.data.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.fabricante = Object.assign({}, item.fabricante);
        this.grupoMaterial = Object.assign({}, item.grupo_material);
        this.local = Object.assign({}, item.local);
        this.dialog = true;
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

      // addItems(item) {
      //   console.log(item)

      //   this.addedItems += item;
      //   this.editedItem = {};
      //   console.log(this.addedItems);
      // }
    }
  } 
</script>
<style>
h2{
  margin-left: 70px;
}
 
</style>