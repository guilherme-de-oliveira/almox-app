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
                v-model="editedItem.name"
                :counter="10"
                label="Código Usuário"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="9">
            <v-text-field
              v-model="editedItem.email"
              label="Nome"
              required
            ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="d-flex" cols="12" sm="4">
              <v-select
                :items="departamentos"
                item-text="descricao"
                item-value="id_departamento"
                label="Departamento"
                v-model="departamentos.id_departamento"
              ></v-select>
            </v-col>
          </v-row>
          <v-btn color="primary" @click="save(item)" style="margin-right: 20px;">salvar</v-btn>
          <v-btn color="error darken-1" @click="clear">cancelar</v-btn>
        </form>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import Departamento from '../services/Departamento';
import Funcionario from '../services/Funcionario';
  export default {
    props: {
      source: String,
    },
    components: {
        // Cards
    },
    data: () => ({
      editedItem: {},
      tipo: '',
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
      departamentos: []
    }),

    async mounted() {
      this.getDepartamentos();
    },

    
    methods: {
      openForm(data){
        console.log(data);
        this.formUser = true;

        this.titulo = data.cabecalho;
        this.tipo = data.tipo;
      },

      save () {
        if (this.tipo == 'consultarEditar') {
          //Update Item
          // var aux = {};
          // aux.id = this.editedItem.id_material;
          // aux.id_un_medida = this.editedItem.id_un_medida;
          // aux.id_fabricante = this.editedItem.id_fabricante;
          // aux.id_local = this.editedItem.id_local;
          // aux.cod_barra = this.editedItem.cod_barra;
          // aux.custo = this.editedItem.custo;
          // aux.estoque_atual = this.editedItem.estoque_atual;
          // aux.estoque_minimo = this.editedItem.estoque_minimo;
          // aux.id_grupo_material = this.editedItem.id_grupo_material;
          // aux.descricao = this.editedItem.descricao;
          // try {
          //   Object.assign(this.data[this.editedIndex], this.editedItem);
          //   console.log(this.editedItem);
          //   let response = Material.DataService.updateMaterial(aux);
          //   alert("Response: ", response);
          //   // location.reload();
          // } catch(error) {
          //   alert(error);
          // }
          
        } else if(this.tipo == 'adicionar') { 
          //Add Item
          console.log('add')
          console.log(this.editedItem);
          // this.editedItem.id_grupo_material = this.grupoMaterial.id_grupo_material;
          // this.editedItem.id_fabricante = this.fabricante.id_fabricante;
          // this.editedItem.id_local = this.local.id_local;
          // this.editedItem.id_un_medida = this.unidadeMedida.id_un_medida;

          // this.editedItem.estoque_atual = parseInt(this.editedItem.estoque_atual);
          // this.editedItem.estoque_minimo = parseInt(this.editedItem.estoque_minimo);
          try {
            let response = Funcionario.DataService.setFuncionario(this.editedItem);
            // this.data.push(this.editedItem);
            response.then(function(valor) {
              console.log(valor.statusText);
              
              alert(valor.statusText);
            }).catch(function (err){
              alert(err);
            });
          } catch(error) {
            alert(error);
          }
        } else {
          alert('delete');
        }
                  // location.reload();
      },

      async getDepartamentos() {
        try {
          let resources = await Departamento.DataService.getDepartamentos();
          this.departamentos = resources.data;
          console.log(this.departamento)
        } catch(error) {
          console.log(error);
        }
      },
      clear(){
        this.editedItem = {}
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