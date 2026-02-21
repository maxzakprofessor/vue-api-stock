<template>
  <div class="container-fluid mt-4 px-4">
    <div class="row">
      <!-- ЛЕВАЯ КОЛОНКА: Регистрация -->
      <div class="col-md-4">
        <div class="card shadow-sm border-0 mb-4">
          <div class="card-header bg-primary text-white py-3">
            <h5 class="mb-0"><i class="bi bi-person-plus-fill me-2"></i> Регистрация</h5>
          </div>
          <div class="card-body p-4">
            <form @submit.prevent="registerUser">
              <div class="mb-3">
                <label class="form-label small fw-bold text-muted">Логин (ID сотрудника)</label>
                <input type="text" v-model="form.username" class="form-control" placeholder="например: i.ivanov" required>
              </div>
              <div class="mb-3">
                <label class="form-label small fw-bold text-muted">ФИО (для системы)</label>
                <input type="text" v-model="form.fullName" class="form-control" placeholder="Иванов Иван">
              </div>
              <button type="submit" class="btn btn-primary w-100 shadow-sm mt-2" :disabled="loading">
                <span v-if="loading" class="spinner-border spinner-border-sm me-1"></span>
                <i v-else class="bi bi-shield-lock me-1"></i> Сгенерировать доступ
              </button>
            </form>
          </div>
        </div>
      </div>

      <!-- ПРАВАЯ КОЛОНКА: Список персонала -->
      <div class="col-md-8">
        <div class="card shadow-sm border-0">
          <div class="card-header bg-dark text-white py-3 d-flex justify-content-between align-items-center">
            <h5 class="mb-0"><i class="bi bi-people-fill me-2"></i> Персонал склада</h5>
            <button class="btn btn-sm btn-outline-light" @click="fetchUsers">
              <i class="bi bi-arrow-clockwise"></i> Обновить
            </button>
          </div>
          <div class="table-responsive">
            <table class="table table-hover align-middle mb-0">
              <thead class="table-light">
                <tr>
                  <th>ID / Логин</th>
                  <th>ФИО</th>
                  <th class="text-center">Статус входа</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="user in userList" :key="user.id">
                  <td><code class="text-primary fw-bold">{{ user.username }}</code></td>
                  <td>{{ user.fullName }}</td>
                  <td class="text-center">
                    <!-- Показываем, сменил ли пользователь временный пароль -->
                    <span v-if="user.needsPasswordChange" class="badge rounded-pill bg-warning text-dark px-3">
                      Временный пароль
                    </span>
                    <span v-else class="badge rounded-pill bg-success px-3">
                      Постоянный доступ
                    </span>
                  </td>
                </tr>
                <tr v-if="userList.length === 0">
                  <td colspan="3" class="text-center py-4 text-muted small">Список пуст</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- МОДАЛЬНОЕ ОКНО С ПАРОЛЕМ -->
    <div v-if="showModal" class="modal-backdrop fade show"></div>
    <div v-if="showModal" class="modal fade show d-block" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 shadow-lg">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title"><i class="bi bi-key-fill me-2"></i>Данные для входа</h5>
            <button type="button" class="btn-close btn-close-white" @click="closeModal"></button>
          </div>
          <div class="modal-body text-center p-5">
            <h1 class="display-4 fw-bold text-primary mb-1">{{ generatedInfo.temporaryPassword }}</h1>
            <p class="text-muted small fw-bold mb-4">ВРЕМЕННЫЙ ПАРОЛЬ</p>
            
            <div class="alert alert-warning text-start small border-0">
              <i class="bi bi-exclamation-triangle-fill me-2"></i>
              Передайте эти данные сотруднику: <strong>{{ generatedInfo.username }}</strong>. 
              Система потребует смены пароля при первом входе.
            </div>
            
            <button class="btn btn-dark w-100 btn-lg mt-2 shadow" @click="closeModal">Я сохранил данные</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import axios from 'axios';

// 1. КОНФИГУРАЦИЯ
const API_URL = import.meta.env.VITE_API_URL;

// 2. СОСТОЯНИЕ (STATE)
const userList = ref([]); // Список пользователей
const loading = ref(false); // Индикатор загрузки
const showModal = ref(false); // Показ модалки
const generatedInfo = ref(null); // Данные нового юзера
const form = reactive({ username: "", fullName: "" }); // Форма регистрации

// 3. МЕТОДЫ (LOGIC)

// Получаем список всех юзеров (только для Админа)
const fetchUsers = async () => {
  try {
    const res = await axios.get(`${API_URL}/auth/admin/all-users`);
    userList.value = res.data;
  } catch (err) {
    console.error("Ошибка доступа: вы должны быть администратором.");
  }
};

// Регистрируем нового сотрудника
const registerUser = async () => {
  loading.value = true;
  try {
    const res = await axios.post(`${API_URL}/auth/admin/create-user`, {
      username: form.username,
      fullName: form.fullName
    });
    generatedInfo.value = res.data; // Сохраняем пароль из ответа Django
    showModal.value = true;         // Показываем пароль в модальном окне
    form.username = "";            // Сброс формы
    form.fullName = "";
    await fetchUsers();            // Обновляем таблицу
  } catch (err) {
    alert(err.response?.data || "Ошибка при регистрации");
  } finally {
    loading.value = false;
  }
};

// Закрытие модального окна и очистка пароля из памяти
const closeModal = () => {
  showModal.value = false;
  generatedInfo.value = null;
};

// Загрузка данных при входе в компонент
onMounted(fetchUsers);
</script>

<style scoped>
.modal.show { display: block; }
.modal-backdrop { opacity: 0.5; }
.badge { font-size: 0.8rem; letter-spacing: 0.5px; }
.card { border-radius: 12px; }
.form-control:focus { box-shadow: none; border-color: #0d6efd; }
</style>
