<template>
  <div>
    <h1 class="error-boundary-header">Testing the Error Boundary</h1>
    <img
      class="error-boundary-image"
      :src="errorBoundaryImage"
      alt="Error Boundary Image"
    />
    <p class="error-boundary-text">Oh, oh. Something does not seem right...</p>
    <button class="error-boundary-button" @click="triggerError">
      Do Not Press the Spoil Button
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import errorBoundaryImage from "../assets/ErrorBoundaryImage.png";

const error = ref(false);

const triggerError = () => {
  throw new Error("This is a test error for the Error Boundary.");
};
</script>

<style scoped>
.error-boundary-header {
  text-align: center;
  font-weight: 300;
  text-decoration: underline;
}

.error-boundary-image {
  width: 400px;
  margin: 0 auto;
  display: block;
}

.error-boundary-text {
  font-family: var(--heading-font);
  text-align: center;
  font-size: 2rem;
}

.error-boundary-button {
  background-color: var(--primary-color);
  color: black;
  border: 2px solid black;
  border-radius: 30px;
  width: 320px;
  height: 60px;
  font-weight: 400;
  margin: 0px auto;
  display: block;
  margin-top: 80px;
  cursor: pointer;
  outline: none;
}
</style>
