<template>
   <v-app id="inspire">
    <h2>{{ titulo}}</h2>
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
                <download-excel
            :data = "this.data"
            :footer = "this.date_now"
            :header = "this.date_now"
            >
            <v-btn class="ma-2" color="success" dark>
              <v-icon dark>mdi-download</v-icon>
            </v-btn>
          </download-excel>
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
            <v-toolbar-title>Solicitações</v-toolbar-title>
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
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.id_solicitacao" label="ID Solicitação" disabled></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-menu
                          ref="menu"
                          v-model="menu"
                          :close-on-content-click="false"
                          :return-value.sync="date"
                          transition="scale-transition"
                          offset-y
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on }">
                            <v-text-field
                              v-model="date"
                              label="Data"
                              v-on="on"
                              disabled
                            ></v-text-field>
                          </template>
                          <v-date-picker v-model="date" no-title scrollable>
                            <v-spacer></v-spacer>
                            <v-btn text color="error" @click="menu = false">Cancelar</v-btn>
                            <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                          </v-date-picker>
                        </v-menu>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.funcionario.id_funcionario" label="Solicitante" disabled></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <span>Item</span>
                    </v-row>
                    <v-row>
                      <!-- <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.id_material" label="ID Material"></v-text-field>
                      </v-col> -->
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
                      <v-col cols="12" sm="6" md="2">
                        <v-text-field type="number" v-model="editedItem.qtde" label="Qtde"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="2" v-if="editedIndex === -1">
                        <v-btn @click="getMaterialById(editedItem)" class="mx-2" fab dark small color="primary">
                          <v-icon dark >mdi-plus</v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                  <v-row>
                    <v-simple-table dense>
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th class="text-left">ID</th>
                            <th class="text-left">Material</th>
                            <th class="text-left">Estoque</th>
                            <th class="text-left">Est. Mínimo</th>
                            <th class="text-left">Qtde</th>
                            <th class="text-left">Ação</th>
                          </tr>
                        </thead>
                        <tbody v-if="editedIndex === -1">
                          <tr v-for="item in addedItems" :key="item.id_material">
                            <td>{{ item.id_material }}</td>
                            <td>{{ item.descricao }}</td>
                            <td>{{ item.estoque_atual }}</td>
                            <td>{{ item.estoque_minimo }}</td>
                            <td>{{ item.qtde }}</td>
                            <td><v-icon small @click="deleteAddMaterial(item)">mdi-delete</v-icon></td>
                          </tr>
                        </tbody>
                        <tbody v-else>
                          <tr v-for="item in editedItem.solicitacao_material" :key="item.id_material">
                            <td>{{ item.material.id_material }}</td>
                            <td>{{ item.material.descricao }}</td>
                            <td>{{ item.material.estoque_atual }}</td>
                            <td>{{ item.material.estoque_minimo }}</td>
                            <td>{{ item.qtde }}</td>
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
        </template>
      </v-data-table>
    </v-col>
  </v-app>
</template>

<script>
// import Cards from '../components/Cards';
import Solicitacao_Material from '../services/Solicitacao_Material';
import Material from '../services/Material';
import JsonExcel from 'vue-json-excel';
import Vue from 'vue';
var _ = require('lodash');

Vue.component('downloadExcel', JsonExcel);

  export default {
    data: () => ({
      titulo: 'Solicitação de Compra',
      sortBy: 'id_solicitacao',
      sortDesc: true,
      search: '',
      loading: false,
      searchMateriais: [],
      items: [],
      searchMaterial: null,
      selectMaterial: null,
      date: new Date().toISOString().substr(0, 10),
      date_now: new Date().toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
      dialog: false,
      headers: [
        {
          text: 'ID Solicitação',
          align: 'start',
          sortable: true,
          value: 'id_solicitacao',
        },
        { text: 'Data', value: 'data' },
        { text: 'Solicitante', value: 'funcionario.nome' },
        { text: 'Status', value: 'status' },
        { text: 'Ação', value: 'actions', sortable: false },
      ],
      data: [],
      addedItems: [],
      sendItems: {
        'materiais': {}
      },
      editedIndex: -1,
      editedItem: {
        funcionario: {
          id_funcionario: 15
        },
      },
      defaultItem: {
        funcionario: {
          id_funcionario: 15
        },
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

      search (val) {
        console.log(val)
        val && val !== this.selectMaterial && this.querySelections(val)
      },
    },

    async mounted() {
      this.getSolicitacoes();
    },

    methods: {
      async getSolicitacoes() {
        try {
          // const resources = await SystemManagement.TaskService.getAlltickets()
          let resources = await Solicitacao_Material.DataService.getSolicitacoes();
          console.log(resources.data);
          this.data = resources.data;

          this.data.forEach(function(x) {
            if(x.data) {
              var d = new Date(x.data);
              x.data = d.getDate() + '/' + d.getMonth() + '/' + d.getFullYear();
            }
          });
        } catch(error) {
          console.log(error);
        }
      },

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

      editItem (item) {
        this.editedIndex = this.data.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
           this.addedItems = []
          this.editedIndex = -1
        })
      },

     save () {
        if (this.editedIndex > -1) {
          //Update Item
          try {
 Object.assign(this.data[this.editedIndex], this.editedItem);
            console.log(this.editedItem);

            var aux = {};
            aux.materiais = this.editedItem.requisicao_material;
            console.log(aux);
            aux.materiais.forEach(function(x){
              x.id_material = x.material.id_material;
              x.qtde = parseInt(x.qtdeAtender);
              delete x.material;
              console.log(x);
            });
            console.log(aux);
            let response = Solicitacao_Material.DataService.updateSolicitacao();
            alert("Response: ", response);
          } catch(error) {
            alert(error);
          }
          
        } else { 
          //Add Item
          var aux2 = {};
          aux2.id_funcionario = this.editedItem.funcionario.id_funcionario;
          aux2.materiais = this.sendItems.materiais;
          console.log(aux2);
          try {
            let response = Solicitacao_Material.DataService.setSolicitacao(aux2);
            // this.data.push(this.editedItem);
            this.getSolicitacoes();
            alert("Response: ", response);
          } catch(error) {
            alert(error);
          }
        }
        this.close()
      },

      deleteAddMaterial(item) {
        const index = this.data.indexOf(item)
        if (confirm('Deletar Item?')) {
          try{
              this.addedItems.splice(index, 1)
              // alert("Response: ", response);
          } catch (err) {
            alert(err);
          }
        }
      },

      addItems(item) {
        console.log(item)
        var test  = _.find(this.items, ['id_material', this.selectMaterial]);
console.log(test);
        this.addedItems.push(this.editedItem);
        this.editedItem = {};
        console.log(this.addedItems);
      },

      async getMateriais() {
        await Material.DataService.getMateriais().then((resources) => {
          console.log(resources);
          this.items = resources.data; 
        });
      },

      async getMaterialById(item) {
        // console.log(item);
        var test = this.addedItems.filter(x => x.id_material == this.selectMaterial)
        if (test.length == 0){
          if (item.qtde > 0) {
          // console.log(this.items);
          var resources  = _.find(this.items, ['id_material', this.selectMaterial]);

          console.log(resources)
          var array = {};
          array.id_material = resources.id_material;
          array.descricao = resources.descricao;
          array.estoque_atual = resources.estoque_atual;
          array.estoque_minimo = resources.estoque_minimo;
          array.qtde = item.qtde;

          resources.qtde = item.qtde;

          console.log(item)

          console.log(this.addedItems);
          this.addedItems.push(array); 
          this.editedItem = Object.assign({}, this.defaultItem)

          this.sendItems.materiais= this.addedItems;
          console.log(this.addedItems);
          } else {
            alert('Quantidade deve ser maior que 0!')
          }
        } else {
          alert('Item já existente na lista!')
        }
        
      },
    }
  } 
</script>
<style>
 h2{
   margin-left: 70px;
 }
 
</style>