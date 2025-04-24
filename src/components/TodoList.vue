<template>
  <div>
    <h2>A Grocery To-do App.</h2>

    <div class="button-container">
      <input
        class="search-input-box"
        type="text"
        id="grocery-input"
        placeholder="Search your groceries"
        v-model="searchQuery"
      />

      <select
        id="filter-todos"
        v-model="filterStatus"
      >
        <option value="All">All</option>
        <option value="Completed">Completed</option>
        <option value="Not Completed">Not Completed</option>
      </select>

      <button id="add-item-button" @click="isModalOpen = true">
        Add New Item
      </button>
    </div>

    <!-- Modal for Adding To-Do -->
    <div v-if="isModalOpen" class="modal">
      <div class="modal-content">
        <h3 class="modal-title">Add New Grocery Item</h3>
        <div class="modal-label-container">
          <label class="modal-label">
            Title:
            <input
              class="modal-input"
              type="text"
              v-model="newTodoTitle"
            />
          </label>
          <label class="modal-label">
            Completed:
            <input
              class="modal-checkbox"
              type="checkbox"
              v-model="newTodoCompleted"
            />
          </label>
        </div>
        <div class="modal-actions">
          <button class="modal-add" @click="handleAddTodo">
            Add
          </button>
          <button
            class="modal-cancel"
            @click="isModalOpen = false"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>

    <!-- Loading Message -->
    <p v-if="loading" class="loading-data-two">Fetching your yummy groceries...</p>
    <p v-if="error">Error: {{ error }}</p>

    <!-- To-Do List -->
    <ul v-if="!loading && !error" class="todo-ul-container">
      <li v-for="todo in paginatedTodos" :key="todo.id" class="todo-list">
        <div class="todo-list-container">
          <!-- Conditionally render input or H3 -->
          <input
            v-if="editingId === todo.id"
            class="edit-input-box"
            type="text"
            v-model="newTitle"
            @blur="finishEditing(todo.id)"
            @keyup.enter="finishEditing(todo.id)"
            ref="editInput"
          />
          <router-link v-else :to="`/todos/${todo.id}`">
            <h3 class="todo-title">{{ todo.title }}</h3>
          </router-link>

          <div>
            <span class="todo-status">
              {{ todo.completed ? "Completed" : "Not Completed" }}
            </span>
          </div>
        </div>

        <!-- Edit and Delete Buttons -->
        <div class="crud-btns-container">
          <img
            class="crud-btns edit-btn"
            :src="editIcon"
            alt="Edit Icon"
            @click="startEditing(todo)"
          />
          <img
            class="crud-btns delete-btn"
            :src="deleteIcon"
            alt="Delete Icon"
            @click="handleDelete(todo.id)"
          />
        </div>
      </li>
    </ul>

    <!-- Pagination -->
    <div class="pagination-features">
      <label class="pagination-select-container">
        Items per page:
        <select
          id="pagination-select"
          v-model="itemsPerPage"
        >
          <option value="6">6</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </label>
      <section class="pagination-btns-container">
        <button
          class="control-btns previous-btn"
          @click="handlePrevious"
          :disabled="currentPage === 1"
        >
          Previous
        </button>
        <button
          v-for="page in visiblePages"
          :key="page"
          class="paged-numbers"
          :class="{ active: currentPage === page }"
          @click="handlePageChange(page)"
          :disabled="currentPage === page"
        >
          {{ page }}
        </button>
        <button
          class="control-btns next-btn"
          @click="handleNext"
          :disabled="currentPage === totalPages"
        >
          Next
        </button>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick, watch } from 'vue'
import editIcon from '../assets/edit-icon.png'
import deleteIcon from '../assets/delete-icon.png'

const LOCAL_STORAGE_KEY = "todoData"

// State for data and API status
const data = ref([])
const loading = ref(true)
const error = ref(null)

// Fetch data from API or load from local storage
onMounted(() => {
  const storedData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))

  if (storedData) {
    data.value = storedData
    loading.value = false
  } else {
    // Fetch from API if no data in local storage
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((apiData) => {
        data.value = apiData
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(apiData))
        loading.value = false
      })
      .catch((err) => {
        error.value = err.message
        loading.value = false
      })
  }
})

// Search and Filter
const searchQuery = ref("")
const filterStatus = ref("All")

const filteredTodos = computed(() => {
  return data.value.filter((todo) => {
    // Filter based on the search query
    const matchesSearch = todo.title
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase())

    // Filter based on the status
    const matchesStatus =
      filterStatus.value === "All" ||
      (filterStatus.value === "Completed" && todo.completed) ||
      (filterStatus.value === "Not Completed" && !todo.completed)

    return matchesSearch && matchesStatus
  })
})

// Pagination
const currentPage = ref(1)
const itemsPerPage = ref(6)

// Reset to page 1 when filters change
watch([searchQuery, filterStatus], () => {
  currentPage.value = 1
})

// Convert itemsPerPage to number when it changes
watch(itemsPerPage, (newValue) => {
  itemsPerPage.value = Number(newValue)
  currentPage.value = 1
})

const totalPages = computed(() => {
  return Math.ceil(filteredTodos.value.length / itemsPerPage.value)
})

const paginatedTodos = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value
  const endIndex = startIndex + itemsPerPage.value
  return filteredTodos.value.slice(startIndex, endIndex)
})

const visiblePages = computed(() => {
  const startPage = Math.max(1, currentPage.value - 1)
  const endPage = Math.min(totalPages.value, currentPage.value + 1)
  const pages = []
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i)
  }
  return pages
})

// Handlers for Pagination
const handleNext = () => {
  if (currentPage.value < totalPages.value) currentPage.value++
}

const handlePrevious = () => {
  if (currentPage.value > 1) currentPage.value--
}

const handlePageChange = (page) => {
  currentPage.value = page
}

// Editing functionality
const editingId = ref(null)
const newTitle = ref("")
const editInput = ref(null)

const startEditing = (todo) => {
  editingId.value = todo.id
  newTitle.value = todo.title
  // Focus the input after the DOM updates
  nextTick(() => {
    if (editInput.value) {
      editInput.value.focus()
    }
  })
}

const finishEditing = (id) => {
  handleEdit(id, newTitle.value)
  editingId.value = null
}

// CRUD operations
const handleDelete = (id) => {
  const updatedData = data.value.filter((todo) => todo.id !== id)
  data.value = updatedData
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedData))
}

const handleEdit = (id, title) => {
  const updatedData = data.value.map((todo) =>
    todo.id === id ? { ...todo, title } : todo
  )
  data.value = updatedData
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedData))
}

// Add new todo
const isModalOpen = ref(false)
const newTodoTitle = ref("")
const newTodoCompleted = ref(false)

const handleAddTodo = () => {
  if (!newTodoTitle.value.trim()) {
    alert("Please enter a title for the new todo!")
    return
  }

  const newTodo = {
    id: data.value.length > 0 ? Math.max(...data.value.map((todo) => todo.id)) + 1 : 1,
    title: newTodoTitle.value,
    completed: newTodoCompleted.value,
  }

  const updatedData = [newTodo, ...data.value]
  data.value = updatedData
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedData))

  // Reset modal inputs and close modal
  newTodoTitle.value = ""
  newTodoCompleted.value = false
  isModalOpen.value = false
}
</script>

<style scoped>
.todo-list {
  font-family: "Poppins", sans-serif;
  border: 1px solid var(--primary-color);
  border-radius: 5px;
  margin-bottom: 20px;
  padding: 10px;
  list-style: none;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 300px;
}

.todo-list-container {
  width: 200px;
}

.crud-btns-container {
  width: 100px;
}

.crud-btns {
  margin-top: 20px;
  height: 20px;
  margin-right: 5px;
}

.todo-ul-container {
  padding: 0;
  padding: 10px 50px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
}

h2 {
  font-family: var(--heading-font);
  text-align: center;
  color: var(--secondary-color-two);
}

.todo-title {
  font-size: 0.8rem;
  color: var(--primary-color);
  text-decoration: underline;
  text-decoration-color: var(--primary-color);
  text-decoration-thickness: 2px;
}

.todo-title:hover {
  color: var(--secondary-color-one);
}

.todo-status {
  font-size: 10px;
  font-weight: 200;
  text-transform: uppercase;
  border: 1px solid gray;
  padding: 5px;
  border-radius: 30px;
}

.search-input-box {
  width: 610px;
  height: 50px;
  border-radius: 8px;
  border: 1px solid var(--secondary-color-one);
  padding: 20px;
  font-family: "Poppins", sans-serif;
  font-size: 12px;
}

button {
  height: 50px;
  width: 134px;
  background-color: var(--primary-color);
  border: none;
  border-radius: 8px;
  font-family: "Poppins", sans-serif;
  font-size: 16px;
  color: whitesmoke;
}

.button-container {
  display: flex;
  justify-content: center;
  gap: 20px;
}

#filter-todos {
  width: 150px;
  font-family: "Poppins", sans-serif;
  color: grey;
  font-size: 12px;
  border: 1px solid var(--secondary-color-two);
  border-radius: 5px;
  padding: 5px;
}

/* Pagination Styles */
.pagination-features {
  display: flex;
  justify-content: center;
  gap: 50px;
  margin-bottom: 10px;
}

.control-btns {
  width: 90px;
  font-size: 1rem;
  border-radius: 0;
  padding: 10px 15px;
  background-color: var(--secondary-color-one);
}

.control-btns:hover {
  color: var(--primary-color);
}

.previous-btn {
  border-radius: 5px 0 0 5px;
}

.next-btn {
  border-radius: 0 5px 5px 0;
}

.paged-numbers {
  width: 50px;
  border-radius: 0;
  padding: 10px 5px;
  background-color: var(--secondary-color-one);
}

.paged-numbers:hover {
  background-color: var(--secondary-color-two);
}

.paged-numbers.active {
  background-color: var(--primary-color);
  color: white;
  cursor: default; 
}

label {
  font-family: "Poppins", sans-serif;
  color: var(--secondary-color-two);
  font-size: 16px;
  font-weight: 300;
}

#pagination-select {
  margin-left: 15px;
  width: 90px;
  height: 50px;
  padding-left: 30px;
  font-family: var(--heading-font);
  font-size: 16px;
  border: 1px solid var(--secondary-color-two);
  border-radius: 5px;
  color: var(--secondary-color-two);
}

/* Edit Input and Button Styles */
.edit-input-box {
  height: 40px;
  width: 200px;
  font-family: "Poppins", sans-serif;
  border: 1px solid var(--primary-color);
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 20px;
  margin-top: 10px;
}

/* Loading Data Style */
.loading-data-two {
  text-align: center;
  margin-top: 300px;
  color: var(--primary-color);
  font-family: var(--heading-font);
  font-size: 2rem;
}

/* Modal Styles */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1010;
  border: 2px solid var(--primary-color);
}

.modal-title {
  text-align: center;
  color: var(--secondary-color-two);
  font-family: var(--heading-font);
}

.modal-label-container {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.modal-label {
  color: var(--primary-color);
  font-family: "Poppins", sans-serif;
}

.modal-input {
  margin-left: 30px;
  height: 35px;
  width: 250px;
  border: 1px solid var(--primary-color);
  border-radius: 10px;
}

.modal-checkbox {
  margin-left: 10px;
}

.modal-actions {
  display: flex;
  gap: 20px;
  margin-top: 30px;
  justify-content: center;
}

.modal-add {
  height: 40px;
  background-color: var(--primary-color);
  font-weight: 300;
}

.modal-cancel {
  height: 40px;
  background-color: var(--secondary-color-two);
  font-weight: 300;
}

/* Media Queries */
@media screen and (max-width: 500px) {
  .todo-ul-container {
    grid-template-columns: 1fr;
  }

  .search-input-box {
    width: 320px;
    margin: 0 auto;
  }

  .button-container {
    flex-direction: column;
  }

  #filter-todos {
    width: 320px;
    margin: 0 auto;
  }

  button {
    width: 320px;
    margin: 0 auto;
  }

  .pagination-features {
    flex-direction: column;
    justify-content: center;
  }

  .pagination-btns-container {
    width: 100%;
    margin-left: 32px;
  }

  .pagination-select-container {
    margin-left: 80px;
  }
}
</style>