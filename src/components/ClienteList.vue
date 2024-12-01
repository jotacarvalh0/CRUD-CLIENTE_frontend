<template>
  <div>
    <h1>Lista de Clientes</h1>
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Email</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="cliente in clientes" :key="cliente.id">
          <td>{{ cliente.nome }}</td>
          <td>{{ cliente.email }}</td>
          <td>
            <button @click="abrirModal(cliente.id)">Editar</button>
            <button @click="removerCliente(cliente.id)">Excluir</button>
          </td>
        </tr>
      </tbody>
    </table>

    <cliente-edit-modal
      :showModal="modalAberto"
      :clienteId="clienteId"
      @fechar-modal="modalAberto = false"
      @atualizar-clientes="buscarClientes"
    />
  </div>
</template>

<script>
import axios from 'axios';
import ClienteEditModal from './ClienteEditModal.vue';

export default {
  name: "ClienteList",
  components: {
    ClienteEditModal
  },
  data() {
    return {
      clientes: [],
      modalAberto: false,
      clienteId: null,
    };
  },
  methods: {
    abrirModal(id) {
      this.clienteId = id;
      this.modalAberto = true;
    },
    editarCliente(id) {
      this.$router.push(`/clientes/edit/${id}`);
    },
    removerCliente(id) {
      if (confirm('Tem certeza que deseja excluir este cliente?')) {
        axios.delete(`http://localhost:8000/api/clientes/${id}`)
          .then(() => {
            this.$root.addNotification('Cliente excluído com sucesso!', 'warning');
            this.buscarClientes();
          })
          .catch(error => {
            this.$root.addNotification('Erro ao excluir o cliente!', 'error');
            console.error('Erro ao excluir o cliente:', error);
          });
      }
    },
    buscarClientes() {
      axios.get('http://localhost:8000/api/clientes')
        .then(response => {
          this.clientes = response.data;
        })
        .catch(error => {
          console.error('Erro ao buscar clientes:', error);
        });
    }
  },
  mounted() {
    this.buscarClientes();
  }
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}
th,
td {
  padding: 8px;
  text-align: left;
}

th {
  background-color: #388e6f;
}

td {
  background-color: rgba(32, 32, 32, 0.5);
}

button {
  padding: 6px 12px;
  background-color: #42b983;
  color: white;
  border: none;
  cursor: pointer;
  margin-right: 10px;
  border-radius: 4px;
  font-size: 14px;
}

button:hover {
  background-color: #388e6f;
}

@media (max-width: 768px) {
  table {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }

  th, td {
    padding: 10px;
  }
}

.cliente-edit-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.3s ease, visibility 0.3s ease;
}

.cliente-edit-modal.show {
  visibility: visible;
  opacity: 1;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.modal-header h2 {
  margin: 0;
}

.modal-header button {
  background-color: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

.modal-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}

@media (max-width: 600px) {
  .modal-content {
    padding: 15px;
  }
  .modal-header h2 {
    font-size: 18px;
  }
}
</style>
