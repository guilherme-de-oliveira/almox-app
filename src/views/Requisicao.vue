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
      <v-data-table
        :headers="headers"
        :items="data"
        :search="search"
        sort-by="calories"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat color="#F5F5F5">
            <v-toolbar-title>Requisições</v-toolbar-title>
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
                        <v-text-field v-model="editedItem.id_requisicao" label="ID Requisição" disabled></v-text-field>
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
                              label="Picker in menu"
                              v-on="on"
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
                    <v-row v-if="editedIndex === -1">
                      <span>Item</span>
                    </v-row>
                    <v-row v-if="editedIndex === -1">
                      <!-- <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.id_requisicao" label="ID Requisição" disabled></v-text-field>
                      </v-col> -->
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field v-model="editedItem.id_material" label="Cod Material"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="2">
                        <v-text-field v-model="editedItem.qtde" label="Qtde"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="2" v-if="editedIndex === -1">
                        <v-btn class="mx-2" fab dark small color="primary" @click="getMaterialById(editedItem)">
                          <v-icon dark>mdi-plus</v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                  <v-row>
                    <v-simple-table dense>
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th class="text-left">Código</th>
                            <th class="text-left">Nome</th>
                            <th class="text-left">Qtde</th>
                            <th class="text-left">Qtde Atendida</th>
                            <th class="text-left">Action</th>
                          </tr>
                        </thead>
                        <tbody v-if="editedIndex === -1">
                          <tr v-for="item in addedItems" :key="item.id_material">
                           <td>{{ item.id_material }}</td>
                            <td>{{ item.descricao }}</td>
                            <td>{{ item.qtde }}</td>
                            <td>-</td>
                            <td><v-icon small @click="deleteAddMaterial(item)">mdi-delete</v-icon></td>
                          </tr>
                        </tbody>
                        <tbody v-else><!-- edit items -->
                           <tr v-for="item in editedItem.requisicao_material" :key="item.id_material">
                            <td>{{ item.material.id_material }}</td>
                            <td>{{ item.material.descricao }}</td>
                            <td>{{ item.qtde }}</td>
                            <td><v-text-field style="max-width: 50px;" v-model="item.qtde_atendida" label="Qtde Atendida"></v-text-field></td>
                            <td><v-icon small @click="deleteMaterial(item)">mdi-delete</v-icon></td>
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
      </v-data-table>
    </v-col>
  </v-app>
</template>

<script>
// import Cards from '../components/Cards';
import Requisicao from '../services/Requisicao';
import Material from '../services/Material';

var _ = require('lodash');

  export default {
    data: () => ({
      titulo: 'Requisição de Materiais',
      search: '',
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
      quantidade: Number,
      dialog: false,
      headers: [
        {
          text: 'ID requisição',
          align: 'start',
          sortable: false,
          value: 'id_requisicao',
        },
        { text: 'Data', value: 'data' },
        { text: 'Solicitante', value: 'funcionario.nome' },
        { text: 'Qtde', value: 'quantidade' },
        { text: 'Status', value: 'status' },
        { text: 'Ação', value: 'actions', sortable: false },
      ],
      data: [],
      addedItems: [],
      editedIndex: -1,
      editedItem: {
        id_requisicao: '',
        data: '',
        status: '',
        funcionario:{
          id_funcionario: ''
        }
      },
      defaultItem: {
        requisicao: '',
        data: '',
        status: '',
        funcionario:{
          id_funcionario: ''
        }
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
        let resources = await Requisicao.DataService.getRequisicoes();
        console.log(resources);
        this.data = resources.data;

//QUANTIDADE QTDE DA REQUISICAO
        // this.data.forEach(function(x, index) {
        //   console.log(this.data[index])
        //   this.data[index].quantidadeMaterial = this.data[index].requisicao_material.lenght();
          
        // });
      } catch(error) {
        console.log(error);
      }
    },

    methods: {
      editItem (item) {
        this.editedIndex = this.data.indexOf(item)
        this.editedItem = Object.assign({}, item)
        console.log(this.editedItem);
        this.dialog = true;
      },

      deleteItem (item) {
        const index = this.data.indexOf(item)
        if (confirm('Deletar Item?')) {
          try{
              console.log(this.editedItem);
              let response = Requisicao.DataService.deleteRequisicao();
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
            let response = Requisicao.DataService.updateRequisicao();
            alert("Response: ", response);
          } catch(error) {
            alert(error);
          }
          
        } else { 
          //Add Item
          this.editedItem.requisicao_material = this.addedItems;
          console.log(this.editedItem);

          try {
            let response = Requisicao.DataService.setRequisicao();
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
      },

      deleteMaterial(item) {
        this.data.forEach(function(y){
          if(y.id_requisicao == item.id_requisicao){
            _.remove(y.requisicao_material, function (z) {
              return z.id_material === item.id_material;
            });
          }
        });

        this.removeItem(item);
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

      removeItem(item) {
        _.remove(this.editedItem, function(x) {
          return item.id_material === x.id_material;
        });
        
        this.editedItem = Object.assign({}, this.editedItem);
      },

      async getMaterialById(item) {
        console.log(item);
        try {
          // const resources = await SystemManagement.TaskService.getAlltickets()
          let resources = await Material.DataService.getMaterialById(item);
          console.log(resources.data);
          // resources.data.quantidade = item.quantidade;
          resources.data.qtde = item.qtde;
          // this.addedItems = resources.data;
          this.addedItems.push(resources.data);
          // var tes=this.addedItems.indexOf(item.id_material);
          
          this.editedItem = {};
          console.log(this.addedItems);
        } catch(error) {
          console.log(error);
          alert('Material não encontrado! Insira um Código de Material Válido!');
        }
      }
    }
  } 
</script>
<style>
 h2{
   margin-left: 70px;
 }
 
</style>