<template>
  <header>
    <nav>
      <ul class="nav-ul-container">
        <li class="nav-list">
          <a
            href="https://github.com/isioma-talabi"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              class="githubicon"
              :src="githubIcon"
              alt="Link to the author's GitHub profile"
            />
          </a>
        </li>
        <li class="nav-list">
          <router-link to="/">Kasuwa- Grocery Todo-List</router-link>
        </li>
        <li class="nav-list">
          <router-link to="/test-error">Error Boundary</router-link>
        </li>
        <li class="nav-list">
          <router-link to="/non-existent-path">Error 404</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import githubIcon from '../assets/github-icon.png'
</script>

<style scoped>
.nav-ul-container {
  margin: 0;
  padding-block: 40px;
  margin-bottom: 0px;
  display: flex;
  justify-content: center;
  gap: 70px;
  list-style: none;
  color: white;
  font-weight: 400;
  font-size: 1.1rem;
  text-decoration: underline;
  text-decoration-color: var(--secondary-color-one);
  text-decoration-thickness: 3px;
}

header {
  background-color: #4f7c2a;
  width: 100%;
}

.nav-list:hover {
  text-decoration-line: none;
}

a {
  color: white;
  text-decoration: none;
}

.githubicon {
  width: 30px;
}

/* Media Queries */
@media screen and (max-width: 500px) {
  .nav-ul-container {
    font-size: 1rem;
    gap: 30px;
    flex-direction: column;
    align-items: center;
    padding-left: 0;
  }
}
</style>