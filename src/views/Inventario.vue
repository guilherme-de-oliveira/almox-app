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
            <v-toolbar-title>Inventario</v-toolbar-title>
            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on }">
                <v-btn color="primary" dark class="mb-2" v-on="on" @click="getMateriais">+ Novo</v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <div v-if="editedIndex !== -1">
                      <span>Status: {{editedItem.status}}</span>
                      </div>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.id_inventario" label="ID Inventário" disabled></v-text-field>
                      </v-col>
                      <!-- Data -->
                      <v-col cols="12" sm="6" md="4">
                        <v-menu
                          ref="menu"
                          v-model="menu"
                          :close-on-content-click="false"
                          :return-value.sync="data"
                          transition="scale-transition"
                          offset-y
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on }">
                            <v-text-field
                              v-model="editedItem.data"
                              label="Data"
                              v-on="on"
                              disabled
                            ></v-text-field>
                          </template>
                          <v-date-picker v-model="editedItem.data" no-title scrollable>
                            <v-spacer></v-spacer>
                            <v-btn text color="error" @click="menu = false">Cancelar</v-btn>
                            <v-btn text color="primary" @click="$refs.menu.save(data)">OK</v-btn>
                          </v-date-picker>
                        </v-menu>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.funcionario.id_funcionario" label="ID Funcionario" disabled></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <thead>
                        <tr>
                          <th class="text-left">Material</th>
                        </tr>
                      </thead>
                      <v-col cols="12" sm="6" md="6">
                        <v-autocomplete
                          v-model="selectMaterial"
                          :loading="loading"
                          :items="items"
                          item-text="descricao"
                          item-value="id_material"
                          :search-input.sync="searchMaterial"
                          hide-no-data
                          hide-details
                          label="Nome">
                        </v-autocomplete>
                      </v-col>
                      <!-- <v-col cols="12" sm="6" md="2">
                        <v-text-field v-model="editedItem.id_material" label="ID"></v-text-field>
                      </v-col> -->
                      <v-col cols="12" sm="6" md="2">
                        <v-text-field type="number" v-model="editedItem.qtde" label="Qtde"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="2" v-if="editedIndex === -1">
                        <v-btn class="mx-2" fab dark small color="primary" @click="addItems(editedItem)">
                          <v-icon dark>mdi-plus</v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                  <v-row >
                    <v-simple-table dense>
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th class="text-left">ID</th>
                            <th class="text-left">Material</th>
                            <th class="text-left">Estoque</th>
                            <th class="text-left">Ação</th>
                          </tr>
                        </thead>
                        <tbody v-if="editedIndex === -1">
                          <tr v-for="item in addedItems" :key="item.id_material">
                            <td>{{ item.id_material }}</td>
                            <td>{{ item.descricao }}</td>
                            <td>{{ item.qtde }}</td>
                            <td><v-icon small @click="deleteAddMaterial(item)">mdi-delete</v-icon></td>
                          </tr>
                        </tbody>
                        <tbody v-else>
                          <tr v-for="item in editedItem.inventario_material" :key="item.id_material">
                            <td>{{ item.material.id_material }}</td>
                            <td>{{ item.material.descricao }}</td>
                            <td>{{ item.qtde }}</td>
                            <td> - </td>
                            <!-- <td><v-icon small @click="deleteAddMaterial(item)">mdi-delete</v-icon></td> -->
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
            @click="prepareXML(item)"
          >
            mdi-download
          </v-icon>
          
        </template>
        <!-- <template v-slot:no-data>
          <v-btn color="primary" @click="initialize">Reset</v-btn>
        </template> -->
      </v-data-table>
    </v-col>
          <download-excel
            :data = "this.data[this.editedIndex]"
            :footer = "this.data_now"
            :header = "this.data_now"
            >
            <v-btn class="ma-2" color="success" dark ref="fileDownload">
              <v-icon dark ref="fileDownload">mdi-download</v-icon>
            </v-btn>
          </download-excel>
  </v-app>
</template>

<script>
import Material from '../services/Material';
import Inventario from '../services/Inventario';
import JsonExcel from 'vue-json-excel';
import Vue from 'vue';
var _ = require('lodash');

Vue.component('downloadExcel', JsonExcel)

  export default {
    data: () => ({
      titulo: 'Inventário',
      sortBy: 'id_inventario',
      sortDesc: true,
      search: '',
      loading: false,
      searchMateriais: [],
      items: [],
      searchMaterial: null,
      selectMaterial: null,
      data_now: 'Data: '+ new Date().toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
      dialog: false,
      data: [],
      headers: [
        {
          text: 'ID Inventário',
          align: 'start',
          sortable: true,
          value: 'id_inventario',
        },
        { text: 'Data', value: 'data' },
        { text: 'Status', value: 'status' },
        { text: 'Ação', value: 'actions', sortable: false },
      ],
      editedIndex: -1,
      editedItem: {
        id_inventario: '',
        data: new Date().toISOString().substr(0, 10),
        funcionario: {
          id_funcionario: 15
        },
        status: '',
        materiais: ''
      },
      defaultItem: {
        funcionario: {
          id_funcionario: 15
        },
        data: new Date().toISOString().substr(0, 10),
        solicitante: '',
        materiais: '',
      },
      addedItems: [], //Para enviar pro back tem de ser um Array com ojetos dentros
      xml: [],
      json_fields: {
              'ID Material': 'id_material',
              'Cod Barra': 'cod_barra',
              'Descricao': 'descricao',
              'Un Medida': 'un_medida.id_un_medida',
              'Estoque Atual': 'estoque_atual',
              'Estoque Minimo': 'estoque_minimo',
              'Fabricante': 'fabricante.nome_fantasia',
              'Local': 'local.id_local',
              'Grupo Material': 'grupo_material.descricao',
          },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Novo' : 'Visualizar'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },

      search (val) {
        console.log(val)
        val && val !== this.selectMaterial && this.querySelections(val)
      },
    },

    async mounted() {
      try {
        // const resources = await SystemManagement.TaskService.getAlltickets()
        let resources = await Inventario.DataService.getInventario();
        console.log(resources.data);
        this.data = resources.data;
        // this.addedItems = this.data.inventario_material;
        this.data.forEach(function(x) {
          // console.log(x);
          if(x.data) {
            var d = new Date(x.data);
            x.data = d.getDate() + '/' + d.getMonth() + '/' + d.getFullYear();
          }
        });

//arrumar
        // let resources1 = await Fabricante.DataService.getFabricantes();
        // this.fabricantes = resources1.data;
        // console.log(resources1.data);
      } catch(error) {
        console.log(error);
      }
    },

    methods: {
      querySelections (v) {
        console.log(v)
        this.loading = true
        // Simulated ajax query
        setTimeout(() => {
          this.items = this.searchMateriais.filter(e => {
            return (e.descricao || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
          })
          this.loading = false
        }, 500)
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
          console.log(this.addedItems);
          var aux = {};
          aux.id_funcionario = parseInt(this.editedItem.funcionario.id_funcionario);
          aux.materiais = this.addedItems;
          // this.editedItem.id_grupo_material = this.grupoMaterial.id_grupo_material;
          // this.editedItem.id_fabricante = this.fabricante.id_fabricante;
          // this.editedItem.id_local = this.local.id_local;
          // this.editedItem.id_un_medida = this.unidadeMedida.id_un_medida;

          // this.editedItem.estoque_atual = parseInt(this.editedItem.estoque_atual)x;
          // this.editedItem.estoque_minimo = parseInt(this.editedItem.estoque_minimo);

            // var aux = {};
            // aux.id_material = this..id_material;
            // aux.qtde = item.qtde;
            // this.addedItems.push(aux);
          try {
            let response = Inventario.DataService.setInventario(aux);
            // this.data.push(this.editedItem);
            alert("Response: ", response);
          } catch(error) {
            alert(error);
          }
        }
        this.close()
      },

      async getMateriais() {
        await Material.DataService.getMateriais().then((resources) => {
          console.log(resources);
          this.items = resources.data; 
        });
      },

      editItem (item) {
        console.log(item);
        this.editedIndex = this.data.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.fabricante = Object.assign({}, item.fabricante);
        this.grupoMaterial = Object.assign({}, item.grupo_material);
        this.unidadeMedida = Object.assign({}, item.un_medida);
        this.local = Object.assign({}, item.local);
        this.dialog = true;
      },

      deleteItem (item) {
        console.log(item);
        if (confirm('Deletar Item?')) {
          try{
              let response = Material.DataService.deleteMaterial(item);
              alert("Response: ", response);
          } catch (err) {
            alert(err);
          }
        }
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem);
          this.addedItems = [];
          this.editedIndex = -1
        })
      },

      prepareXML(item) {
        this.editedIndex = this.data.indexOf(item);
        
        var aux = Object.entries(this.data[this.editedIndex]);
        var array = [];
        // console.log(this.xml)
        aux.forEach(function(x, y) {
          console.log(x, y);

          array[x] = y;
        });
console.log(array)
        this.xml = array;
        console.log(this.xml)
        this.$refs.fileDownload.$el.click(5000)
      },

      addItems(item) {
        console.log(item)
        console.log(this.selectMaterial)
        console.log(this.items);
        // var test =  this.querySelections(this.selectMaterial);
        // console.log(test)
        var aux = {};
        var test  = _.find(this.items, ['id_material', this.selectMaterial]);
        // _.find(this.searchMateriais, function(obj) {
        //   console.log(obj)
        //   return obj.id_material === this.selectMaterial;
        // });
        console.log(test)
        aux.id_material = this.selectMaterial;
        aux.qtde = parseInt(item.qtde);
        aux.descricao = test.descricao;


        this.addedItems.push(aux);
        this.editedItem.id_material = '';
        this.editedItem.qtde = '';
        console.log(this.addedItems);
      },

      deleteAddMaterial(item) {
        const index = this.addedItems.indexOf(item)
        console.log(this.addedItems)
        if (confirm('Deletar Item?')) {
          try{
              this.addedItems.splice(index, 1)
              // alert("Response: ", response);
          } catch (err) {
            alert(err);
          }
        }
      },

    }
  } 
</script>
<style>
h2{
  margin-left: 70px;
}
.hidden{
  display: none;
}
</style>