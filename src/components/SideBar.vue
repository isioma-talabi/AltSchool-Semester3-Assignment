<template>
  <article class="sidebar-wrapper">
    <img class="logo" :src="kasuwaImage" alt="A logo of the Kasuwa app" />
    <h1 class="kasuwa-header-text">Kasuwa</h1>
    <p class="text-two">(Kasuwa (Hausa) - Market)</p>
  </article>
</template>

<script setup>
import kasuwaImage from '../assets/kasuwa-main.png'
</script>

<style scoped>
.sidebar-wrapper {
  margin-left: 50px;
}

.kasuwa-header-text {
  font-family: var(--heading-font);
  font-size: 4rem;
  color: white;
  position: relative;
  top: 14rem;
}

.logo {
  object-fit: cover;
  height: 200px;
  position: relative;
  top: 19.25rem;
  right: 0.1rem;
}

.text-one {
  color: white;
  font-weight: 300;
  font-size: 1.5rem;
  position: relative;
  left: 30px;
}

.text-two {
  font-size: 0.9rem;
  color: white;
  font-style: italic;
  position: relative;
  left: 50px;
  top: 150px;
}

/* Media Queries */
@media screen and (max-width: 500px) {
  .sidebar-wrapper {
    margin-left: 0;
    display: grid;
    justify-content: center;
  }
  .logo {
    position: static;
    margin-top: 30px;
  }

  .kasuwa-header-text {
    position: static;
    margin-block: 0;
  }

  .text-two {
    position: static;
    margin-block: 0;
    margin-left: 40px;
  }
}
</style>