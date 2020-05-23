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
        :items="desserts"
        :search="search"
        sort-by="calories"
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
                        <v-text-field v-model="editedItem.name" label="ID Local"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.fat" label="Cap Máx(Kg)"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.protein" label="Prateleira(m)"></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" sm="6" md="5">
                        <v-text-field v-model="editedItem.carbs" label="Largura(m)"></v-text-field>
                      </v-col>  
                      <v-col cols="12" sm="6" md="5">
                        <v-text-field v-model="editedItem.protein" label="Altura(m)"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="2">
                        <v-btn class="mx-2" fab dark small color="primary">
                          <v-icon dark>mdi-plus</v-icon>
                        </v-btn>
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
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize">Reset</v-btn>
        </template>
      </v-data-table>
    </v-col>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      titulo: 'Local de Armazenamento',
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
          value: 'idLocal',
        },
        { text: 'Cap Máx(Kg)', value: 'capMax' },
        { text: 'Largura(m)', value: 'largura' },
        { text: 'Altura(m)', value: 'altura' },
        { text: 'Prateleira', value: 'prateleira' },
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
            cnpj: 1,
            nome: 'Frozen Yogurt',
            razaoSocial: 159,
            endereco: 'Rua X'
          },
        ],
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

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.desserts = [
          {
            idLocal: 'A01',
            capMax: '13/12/2020',
            largura: 'Albert',
            altura: 2,
            prateleira: 2,
          },
          {
            idLocal: 'A01',
            capMax: '13/12/2020',
            largura: 'Albert',
            altura: 2,
            prateleira: 2,
          },
          {
            idLocal: 'A01',
            capMax: '13/12/2020',
            largura: 'Albert',
            altura: 2,
            prateleira: 2,
          },
          {
            idLocal: 'A01',
            capMax: '13/12/2020',
            largura: 'Albert',
            altura: 2,
            prateleira: 2,
          },
          {
            idLocal: 'A01',
            capMax: '13/12/2020',
            largura: 'Albert',
            altura: 2,
            prateleira: 2,
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