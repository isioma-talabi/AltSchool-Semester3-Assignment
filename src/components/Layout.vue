<template>
  <div>
    <NavBar />
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup>
import NavBar from "./NavBar.vue";
</script>
