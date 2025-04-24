<template>
  <article class="error-container">
    file="src/pages/Error.vue" type="vue"
  </article>


  <article class="error-container">
    <div class="error-image">
      <img :src="errorImage" alt="An image showing a 404 error" />
    </div>
    <div class="error-message">
      <h1 class="error-text-header">Oops! Error 404</h1>
      <pre class="error-text-two">
        Error Message: {{ errorMessage }}
      </pre>

      <p class="error-text-three">Find your way home, to the light!</p>
      <router-link to="/">
        <button class="error-button">Go Back Home</button>
      </router-link>
    </div>
  </article>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import errorImage from "../assets/ErrorImage.png";

const router = useRouter();
const errorMessage = computed(() => {
  return router.currentRoute.value.params.pathMatch
    ? "This page doesn't exist or has been removed."
    : "An unexpected error occurred.";
});
</script>

<style scoped>
.error-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0px;
  color: black;
}

.error-text-header {
  color: black;
  font-weight: 900;
  font-size: 5rem;
  font-family: var(--heading-font);
  text-align: center;
  margin-bottom: 50px;
  margin-top: 170px;
}

.error-message {
  margin-left: 0px;
}

.error-text-two,
.error-text-three {
  text-align: center;
  font-size: 1.3rem;
  font-weight: 300;
}

.error-text-two {
  font-family: var(--body-font);
  margin-top: 20px;
  margin-bottom: 20px;
  color: black;
  font-weight: 600;
}

.error-text-three {
  margin-top: 60px;
}

.error-image > img {
  width: 700px;
  margin: 30px auto;
  border-radius: 10px;
}

.error-button {
  background-color: var(--primary-color);
  border: 2px solid black;
  color: black;
  border-radius: 30px;
  width: 220px;
  height: 60px;
  font-weight: 400;
  margin: 0px auto;
  display: block;
  margin-top: 80px;
  cursor: pointer;
  outline: none;
}

@media screen and (max-width: 500px) {
  .error-container {
    grid-template-columns: 1fr;
  }

  .error-image > img {
    width: 400px;
  }

  .error-text-header {
    font-size: 3rem;
    margin-top: 10px;
  }

  .error-message {
    width: 400px;
  }

  .error-text-two {
    font-size: 14px;
    margin-bottom: 10px;
  }

  .error-text-three {
    margin-top: 50px;
  }

  .error-button {
    margin-top: 50px;
  }
}
</style>
