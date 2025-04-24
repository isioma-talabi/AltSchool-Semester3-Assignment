<template>
  <div class="todo-id-container">
    <div>
      <SideBar />
    </div>
    <div v-if="todo" class="todo-details-container">
      <h2 class="details-title">Grocery Details</h2>
      <div class="details-card">
        <p>
          <strong>ID:</strong> {{ todo.id }}
        </p>
        <p class="title">{{ todo.title }}</p>
        <p class="status">
          <strong>Completed:</strong> {{ todo.completed ? "Yes" : "No" }}
        </p>
      </div>
      <router-link to="/">
        <button class="details-button">Go Back Home</button>
      </router-link>
    </div>
    <p v-else class="loading-data">
      Chill. I am fetching that specific grocery todo list!
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import SideBar from '../components/SideBar.vue'

const route = useRoute()
const todo = ref(null)

onMounted(() => {
  const id = parseInt(route.params.id)
  const storedData = JSON.parse(localStorage.getItem("todoData"))

  if (storedData) {
    const todoItem = storedData.find(item => item.id === id)
    todo.value = todoItem || null
  }
})
</script>

<style scoped>
.loading-data {
  text-align: center;
  margin-top: 300px;
  color: white;
  font-family: var(--heading-font);
  font-size: 2rem;
}

.todo-details-container {
  background-color: white;
  margin-top: 100px;
  margin-right: 50px;
  border-radius: 10px;
  min-width: 1000px;
  min-height: 500px;
}

.todo-id-container {
  display: flex;
  gap: 100px;
}

.details-card {
  border: 1px solid var(--primary-color);
  width: 300px;
  margin: 40px auto;
  padding: 20px;
  border-radius: 5px;  
}

.details-title {
  margin-top: 30px;
}

.title {
  color: var(--primary-color);
  font-weight: bold;
  font-size: 1.2rem;
}

.status {
  border: 1px solid gray;
  width: 150px;
  padding: 10px;
  border-radius: 30px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
}

.details-button {
  width: 300px;
  margin: 0 auto;
  display: block;
  border: 1px solid var(--primary-color);
  color: white;
  font-weight: 300;
  background-color: var(--primary-color);
  cursor: pointer;
}

/* Media Queries */
@media screen and (max-width: 500px) {
  .todo-id-container {
    flex-direction: column;
    gap: 0px;
  }

  .todo-details-container {
    min-width: 100%;
    margin-top: 50px;
  }

  .details-card {
    margin-top: 60px;
  }
}
</style>