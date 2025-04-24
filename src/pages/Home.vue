<template>
  <div class="first-wrapper">
    <SideBar />
    <div class="todo-container">
      <TodoList />
    </div>
  </div>
</template>

<script setup>
import TodoList from '../components/TodoList.vue'
import SideBar from '../components/SideBar.vue'
</script>

<style scoped>
.first-wrapper {
  display: flex;
  gap: 50px;
}

.todo-container {
  background-color: white;
  margin-top: 20px;
  margin-right: 50px;
  border-radius: 10px;
  min-width: 1000px;
  height: 660px;
  overflow-y: auto;
}

@media screen and (max-width: 500px) {
  .first-wrapper {
    display: grid;
    grid-template-columns: 1fr;
    gap: 50px;
  }

  .todo-container {
    height: 100%;
    min-width: 100%;
    margin-right: 0;
    overflow-x: hidden;
  }
}
</style>