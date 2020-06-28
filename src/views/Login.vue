<template>
  <v-form>
    <v-container>
      <v-row justify="space-around">
        <v-sheet
          elevation="12"
          class="pa-12"
          :width="500"
        >
        <v-row>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="display-1 ">Login</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="erro">
            <v-alert type="error">
              Usuário ou Senha Inválidos
            </v-alert>
          </v-list-item>
        </v-row>
        <v-row>
          <v-col cols="1" sm="12" md="12">
            <v-text-field
              label="Usuário"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="1" sm="12" md="12">
            <v-text-field
              v-model="passwordAtual"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min]"
              :type="show1 ? 'text' : 'password'"
              name="input-10-1"
              label="Senha"
              hint="Mínimo 8 caracteres"
              counter
              @click:append="show1 = !show1"
            ></v-text-field>
          </v-col>
        </v-row>
        <div class="my-2">
          <v-btn large color="primary" @click="Login">Login</v-btn>
        </div>
        <a>Esqueceu sua senha?</a>
        </v-sheet>
      </v-row>
    </v-container>
  </v-form>
</template>

  <script>
  export default {
    data: () => ({
      show1: false,
      show2: true,
      show3: false,
      show4: false,
      password: '12345678',
      passwordAtual: '',
      erro: false,
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters',
        emailMatch: () => ('The email and password you entered don\'t match'),
      },
    }),

    methods: {
      Login() {
        if(this.password == this.passwordAtual){
          this.erro = false;
          console.log('entrei');
          window.location.href = '/';
        } else {
          this.erro = true;
        }
      }
    }
  }
</script>