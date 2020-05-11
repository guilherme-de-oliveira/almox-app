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
        :items="desserts"
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
                <v-btn color="primary" dark class="mb-2" v-on="on">Novo Item</v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.name" label="N Requisição"></v-text-field>
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
                            <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                            <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                          </v-date-picker>
                        </v-menu>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.fat" label="Solicitante"></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <span>Item</span>
                    </v-row>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.carbs" label="Código"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.protein" label="Nome"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="2">
                        <v-text-field v-model="editedItem.protein" label="Qtde"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="2">
                        <v-btn class="mx-2" fab dark small color="primary">
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
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="item in reqItems" :key="item.nome">
                            <td>{{ item.codigo }}</td>
                            <td>{{ item.nome }}</td>
                            <td>{{ item.quantidade }}</td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </v-row>
                </v-container>
              </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                  <v-btn color="blue darken-1" text @click="save">Save</v-btn>
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
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize">Reset</v-btn>
        </template>
      </v-data-table>
    </v-col>
  </v-app>
</template>

<script>
// import Cards from '../components/Cards';

  export default {

    // components: {
    //     Cards
    // },
    data: () => ({
      titulo: 'Requisição de Materiais',
      search: '',
            date: new Date().toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
      data: {
        consultar: {
          action: '/consultar',
          cabecalho: 'Consultar',
          descritivo: 'Greyhound divisely hello coldly fonwderfully',
          tipo: 'Gerenciar'
        },
        adicionar: {
          action: '/adicionar',
          cabecalho: 'Home',
          descritivo: 'Greyhound divisely hello coldly fonwderfully',
          tipo: 'Gerenciar'
        },
        alterar: {
          action: '/alterar',
          cabecalho: 'Requisição',
          descritivo: 'Greyhound divisely hello coldly fonwderfully',
          tipo: 'Gerenciar'
        },
        pesquisar: {
          action: '/pesquisar',
          cabecalho: 'Inventário',
          descritivo: 'Greyhound divisely hello coldly fonwderfully',
          tipo: 'Gerenciar'
        },
      },
      dialog: false,
      headers: [
        {
          text: 'N requisição',
          align: 'start',
          sortable: false,
          value: 'requisicao',
        },
        { text: 'Data', value: 'data' },
        { text: 'Solicitante', value: 'solicitante' },
        { text: 'Qtde', value: 'quantidade' },
        { text: 'Status', value: 'status' },
        { text: 'Ação', value: 'actions', sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
      defaultItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
       reqItems: [
          {
            codigo: 1,
            nome: 'Frozen Yogurt',
            quantidade: 159,
          },
          {
            codigo: 1,
            nome: 'Frozen Yogurt',
            quantidade: 159,
          },
          {
            codigo: 1,
            nome: 'Frozen Yogurt',
            quantidade: 159,
          },
          {
            codigo: 1,
            nome: 'Frozen Yogurt',
            quantidade: 159,
          },
        ],
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Novo Item' : 'Editar Item'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.desserts = [
          {
            requisicao: 'A01',
            data: '13/12/2020',
            solicitante: 'Albert',
            quantidade: 2,
            status: 'fechado',
          },
          {
            requisicao: 'A01',
            data: '13/12/2020',
            solicitante: 'Albert',
            quantidade: 2,
            status: 'aberto',
          },
          {
            requisicao: 'A01',
            data: '13/12/2020',
            solicitante: 'Albert',
            quantidade: 2,
            status: 'aberto',
          },
          {
            requisicao: 'A01',
            data: '13/12/2020',
            solicitante: 'Albert',
            quantidade: 2,
            status: 'aberto',
          },
          {
            requisicao: 'A01',
            data: '13/12/2020',
            solicitante: 'Albert',
            quantidade: 2,
            status: 'aberto',
          },
          {
            requisicao: 'A01',
            data: '13/12/2020',
            solicitante: 'Albert',
            quantidade: 2,
            status: 'aberto',
          },
          {
            requisicao: 'A01',
            data: '13/12/2020',
            solicitante: 'Albert',
            quantidade: 2,
            status: 'aberto',
          },
          {
            requisicao: 'A01',
            data: '13/12/2020',
            solicitante: 'Albert',
            quantidade: 2,
            status: 'aberto',
          },
          {
            requisicao: 'A01',
            data: '13/12/2020',
            solicitante: 'Albert',
            quantidade: 2,
            status: 'aberto',
          },
          {
            requisicao: 'A01',
            data: '13/12/2020',
            solicitante: 'Albert',
            quantidade: 2,
            status: 'aberto',
          },
        ]
      },

      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.desserts.indexOf(item)
        confirm('Deletar Item?') && this.desserts.splice(index, 1)
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
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          this.desserts.push(this.editedItem)
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