<template>
  <div class="cliente-form">
    <h2>{{ isEditMode ? 'Editar Cliente' : 'Adicionar Cliente' }}</h2>
    <form @submit.prevent="salvarCliente">
      <div>
        <label for="nome">Nome:</label>
        <input
          v-model="cliente.nome"
          id="nome"
          :class="getValidationClass(validarNome(), touched.nome)"
          @input="touched.nome = true"
          required
        />
      </div>
      <div>
        <label for="email">Email:</label>
        <input
          v-model="cliente.email"
          id="email"
          :class="getValidationClass(validarEmail(), touched.email)"
          @input="touched.email = true"
          required
          type="email"
        />
      </div>
      <div>
        <label for="telefone">Telefone:</label>
        <input
          v-model="cliente.telefone"
          id="telefone"
          :class="getValidationClass(validarTelefone(), touched.telefone)"
          @input="touched.telefone = true"
        />
      </div>
      <div>
        <label for="data_nascimento">Data de Nascimento:</label>
        <input
          v-model="cliente.data_nascimento"
          id="data_nascimento"
          :class="getValidationClass(validarDataNascimento(), touched.data_nascimento)"
          @input="touched.data_nascimento = true"
          type="date"
        />
      </div>
      <div>
        <label for="endereco">Endereço:</label>
        <input
          v-model="cliente.endereco"
          id="endereco"
          :class="getValidationClass(validarEndereco(), touched.endereco)"
          @input="touched.endereco = true"
        />
      </div>
      <button type="submit">{{ isEditMode ? 'Atualizar' : 'Salvar' }}</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      cliente: {
        nome: '',
        email: '',
        telefone: '',
        data_nascimento: '',
        endereco: '',
      },
      touched: {
        nome: false,
        email: false,
        telefone: false,
        data_nascimento: false,
        endereco: false,
      },
      isEditMode: false,
    };
  },
  created() {
    const id = this.$route.params.id;
    if (id) {
      this.isEditMode = true;
      this.carregarCliente(id);
    }
  },
  methods: {
    carregarCliente(id) {
      axios
        .get(`http://localhost:8000/api/clientes/${id}`)
        .then((response) => {
          this.cliente = response.data;
        })
        .catch((error) => {
          console.error('Erro ao carregar cliente:', error);
        });
    },
    salvarCliente() {
      if (this.isEditMode) {
        axios
          .put(`http://localhost:8000/api/clientes/${this.$route.params.id}`, this.cliente)
          .then(() => {
            alert('Cliente atualizado com sucesso!');
            this.$router.push('/clientes');
          })
          .catch((error) => {
            console.error('Erro ao atualizar cliente:', error);
          });
      } else {
        axios
          .post('http://localhost:8000/api/clientes', this.cliente)
          .then(() => {
            this.$root.addNotification('Cliente criado com sucesso!', 'sucess');
            this.$router.push('/clientes');
          })
          .catch((error) => {
            this.$root.addNotification('Erro ao criar cliente!', 'error');
            console.error('Erro ao criar cliente:', error);
          });
      }
    },
    validarNome() {
      return this.cliente.nome.trim().length >= 3;
    },
    validarEmail() {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(this.cliente.email);
    },
    validarTelefone() {
      const regex = /^\d{10,11}$/;
      return regex.test(this.cliente.telefone);
    },
    validarDataNascimento() {
      return !!this.cliente.data_nascimento;
    },
    validarEndereco() {
      return this.cliente.endereco.trim().length >= 5;
    },
    getValidationClass(isValid, isTouched) {
      if (!isTouched) return ''; // Sem classe quando o campo não foi tocado
      return isValid ? 'valid' : 'invalid';
    },
  },
};
</script>

<style scoped>
.cliente-form {
  width: 400px;
  margin: 0 auto;
}
form div {
  margin-bottom: 10px;
}
label {
  display: block;
  margin-bottom: 5px;
}
input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.3s, background-color 0.3s;
}

input.valid {
  border-color: #4CAF50;
}

input.invalid {
  border-color: #FF5722;
}

button {
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
  width: 100%;
  border-radius: 5px;
}
button:hover {
  background-color: #388e6f;
}

@media (max-width: 600px) {
  .cliente-form {
    padding: 15px;
  }

  input, button {
    padding: 10px;
    font-size: 14px;
  }

  label {
    font-size: 12px;
  }
}
</style>
