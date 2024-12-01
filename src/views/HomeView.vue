<template>
    <div>
      <h1>Bem-vindo ao sistema de gerenciamento de clientes!</h1>
      <router-link to="/clientes/add">
        <button class="add-button">Adicionar Novo Cliente</button>
      </router-link>
    </div>
  </template>
  
  <script>
  // Importe o componente ClienteList para exibição dos clientes
  import ClienteList from '../components/ClienteList.vue';
  
  
  export default {
    components: {
      ClienteList
    }
  };
  </script>
  
  <style scoped>
  .add-button {
    background-color: #42b983;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
  }
  .add-button:hover {
    background-color: #388e6f;
  }
  </style>
  