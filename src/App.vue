<script setup>
</script>

<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/clientes">Clientes</router-link>
    </nav>
    <router-view />

    <notification
      v-for="(notif, index) in notifications"
      :key="index"
      :message="notif.message"
      :type="notif.type"
      @closed="removeNotification(index)"
    />
  </div>
</template>

<script>
import Notification from './components/Notification.vue';

  export default {
    name: 'App',
    components: {
      Notification,
    },
    data() {
      return {
        notifications: [],
      };
    },
    methods: {
      addNotification(message, type = 'success') {
        this.notifications.push({ message, type });
        setTimeout(() => {
          this.removeNotification(0); // Remove a notificação após 5 segundos
        }, 5000); // Tempo de exibição da notificação
      },
      removeNotification(index) {
        this.notifications.splice(index, 1);
      },
    },
  }
</script>

<style>
  nav {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #388e6f;
    padding: 10px 0;
    text-align: center;
    box-shadow: 0 2px 5px rgb(0, 0, 0, 0.1);
  }
  nav a {
    display: inline-block;
    text-decoration: none;
    color: white;
    background-color: #388e6f;
    padding: 7px 17px;
    margin: 0 5px;
    border-radius: 5px;
    font-size: 16px;
    font-weight: bold;
    transition: all 0.24s ease;
  }
  nav a:hover {
    background-color: #358b6c;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transform: scale(1.05);
  }
</style>
