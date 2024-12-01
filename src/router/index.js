import { createRouter, createWebHistory } from 'vue-router';
import ClienteList from '../components/ClienteList.vue';
import ClienteForm from '../components/ClienteForm.vue';
import HomeView from '../views/HomeView.vue';

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/clientes', name: 'ClienteList', component: ClienteList }, // Lista de clientes
  { path: '/clientes/add', name: 'ClienteAdd', component: ClienteForm }, // Adicionar cliente
  { path: '/clientes/edit/:id', name: 'ClienteEdit', component: ClienteForm }, // Editar cliente
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('../views/NotFound.vue') },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;