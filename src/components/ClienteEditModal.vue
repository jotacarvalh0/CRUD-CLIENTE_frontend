<template>
    <div v-if="showModal" class="modal-overlay">
      <div class="modal">
        <h2>Editar Cliente</h2>
        <form @submit.prevent="salvarCliente">
          <div>
            <label for="nome">Nome:</label>
            <input v-model="cliente.nome" id="nome" required />
          </div>
          <div>
            <label for="email">Email:</label>
            <input v-model="cliente.email" id="email" required type="email" />
          </div>
          <div>
            <label for="telefone">Telefone:</label>
            <input v-model="cliente.telefone" id="telefone" />
          </div>
          <div>
            <label for="data_nascimento">Data de Nascimento:</label>
            <input v-model="cliente.data_nascimento" id="data_nascimento" type="date" />
          </div>
          <div>
            <label for="endereco">Endereço:</label>
            <input v-model="cliente.endereco" id="endereco" />
          </div>
          <button type="submit">Salvar</button>
          <button type="button" @click="fecharModal">Cancelar</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    props: {
      showModal: Boolean,
      clienteId: Number,
    },
    data() {
      return {
        cliente: {
          nome: '',
          email: '',
          telefone: '',
          data_nascimento: '',
          endereco: '',
        },
      };
    },
    watch: {
      clienteId(newId) {
        if (newId) {
          this.carregarCliente(newId);
        }
      },
    },
    methods: {
      fecharModal() {
        this.$emit('fechar-modal');
      },
      carregarCliente(id) {
        axios.get(`http://localhost:8000/api/clientes/${id}`)
          .then(response => {
            this.cliente = response.data;
          })
          .catch(error => {
            console.error('Erro ao carregar cliente:', error);
          });
      },
      salvarCliente() {
        axios.put(`http://localhost:8000/api/clientes/${this.clienteId}`, this.cliente)
          .then(() => {
            this.$root.addNotification('Cliente atualizado com sucesso!', 'info');
            this.fecharModal();
            this.$emit('atualizar-clientes');
          })
          .catch(error => {
            this.$root.addNotification('Erro ao atualizar cliente!', 'error');
            console.error('Erro ao atualizar cliente:', error);
          });
      },
    },
    created() {
      if (this.clienteId) {
        this.carregarCliente(this.clienteId);
      }
    },
  };
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal {
    background-color: #1d4e3a;
    padding: 20px;
    border-radius: 8px;
    width: 400px;
    box-sizing: border-box;
  }
  
  button {
    background-color: #42b983;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    margin-left: 5px;
  }
  
  button:hover {
    background-color: #388e6f;
  }
  
  button[type="button"] {
    background-color: #ff6347;
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
    box-sizing: border-box;
  }
  </style>
  