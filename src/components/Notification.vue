<template>
    <div v-if="visible" class="notification" :class="type" @click="hide">
      <span>{{ message }}</span>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      message: String,
      type: {
        type: String,
        default: 'success',
      },
    },
    data() {
      return {
        visible: true,
      };
    },
    methods: {
      hide() {
        this.visible = false;
        setTimeout(() => {
          this.$emit('closed');
        }, 300);
      },
    },
  };
  </script>
  
  <style scoped>
  .notification {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px;
    border-radius: 5px;
    color: white;
    font-weight: bold;
    cursor: pointer;
    transition: opacity 0.3s ease-in-out;
  }
  
  .notification.success {
    background-color: #4caf50;
  }
  
  .notification.error {
    background-color: #f44336;
  }
  
  .notification.info {
    background-color: #2196f3;
  }
  
  .notification.warning {
    background-color: #ff9800;
  }
  </style>
  