<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-5">
        <!-- ГЛАВНАЯ КАРТОЧКА -->
        <div class="card shadow-lg border-0 rounded-4 overflow-hidden">
          <!-- Шапка меняет цвет: Синий для входа, Желтый для смены пароля -->
          <div :class="['card-header text-white text-center py-4', isChangeMode ? 'bg-warning' : 'bg-primary shadow-sm']">
            <h4 class="mb-0 fw-bold text-uppercase">
              <i :class="[isChangeMode ? 'bi bi-shield-lock-fill' : 'bi bi-person-badge', 'me-2']"></i>
              {{ isChangeMode ? 'Защита аккаунта' : 'Авторизация' }}
            </h4>
          </div>
          
          <div class="card-body p-4 p-lg-5">
            <!-- 1. ФОРМА ОБЫЧНОГО ВХОДА -->
            <form v-if="!isChangeMode" @submit.prevent="login">
              <div class="mb-3">
                <label class="form-label fw-bold small text-muted text-uppercase">Логин</label>
                <input type="text" v-model="username" class="form-control form-control-lg shadow-none border-2" required placeholder="ID сотрудника">
              </div>
              <div class="mb-4">
                <label class="form-label fw-bold small text-muted text-uppercase">Пароль</label>
                <input type="password" v-model="password" class="form-control form-control-lg shadow-none border-2" required placeholder="******">
              </div>
              
              <div v-if="error" class="alert alert-danger py-2 small border-0 mb-4 animate__animated animate__shakeX">
                <i class="bi bi-exclamation-circle-fill me-2"></i> {{ error }}
              </div>

              <button type="submit" class="btn btn-primary w-100 btn-lg shadow-sm fw-bold" :disabled="loading">
                <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
                ВОЙТИ В СКЛАД
              </button>
            </form>

            <!-- 2. ФОРМА СМЕНЫ ВРЕМЕННОГО ПАРОЛЯ -->
            <form v-else @submit.prevent="changePassword">
              <div class="alert alert-warning border-0 small mb-4 shadow-sm">
                <i class="bi bi-info-circle-fill me-2"></i>
                <strong>Первый вход:</strong> Пожалуйста, замените временный пароль на ваш постоянный.
              </div>
              
              <div class="mb-3">
                <label class="form-label fw-bold small text-muted text-uppercase">Новый пароль</label>
                <input type="password" v-model="newPassword" class="form-control form-control-lg shadow-none border-2" required placeholder="Минимум 6 символов">
              </div>
              <div class="mb-4">
                <label class="form-label fw-bold small text-muted text-uppercase">Повторите пароль</label>
                <input type="password" v-model="confirmPassword" class="form-control form-control-lg shadow-none border-2" required placeholder="Проверка ввода">
              </div>

              <div v-if="error" class="alert alert-danger py-2 small border-0 mb-4">
                {{ error }}
              </div>

              <button type="submit" class="btn btn-warning w-100 btn-lg fw-bold shadow-sm text-dark" :disabled="loading">
                <span v-if="loading" class="spinner-border spinner-border-sm me-2 text-dark"></span>
                АКТИВИРОВАТЬ АККАУНТ
              </button>
            </form>
          </div>
        </div>
        
        <div class="text-center mt-4 text-muted small">
            &copy; 2026 Система складского учета (DRF/Vue3)
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LoginComponent",
  data() {
    return {
      username: "",
      password: "",
      newPassword: "",
      confirmPassword: "",
      isChangeMode: false,
      error: null,
      loading: false
    };
  },
  methods: {
    // ОСНОВНОЙ ВХОД
    login() {
      this.loading = true;
      this.error = null;
      const baseUrl = import.meta.env.VITE_API_URL;

      axios.post(`${baseUrl}/auth/signin`, {
        username: this.username,
        password: this.password
      })
      .then(response => {
        const token = response.data.access;
        // СИНХРОНИЗАЦИЯ: Берем имя поля точно как в твоем Serializers.py
        const needsChange = response.data.needsPasswordChange;

        if (token) {
          localStorage.setItem('token', token);
          localStorage.setItem('username', response.data.username);
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

          // Проверка флага первого входа
          if (needsChange === true) {
            this.isChangeMode = true; 
            this.error = "Требуется установка личного пароля";
          } else {
            this.$router.push('/goods');
          }
        }
      })
      .catch(err => {
        this.error = "Ошибка: неверный логин или пароль";
        console.error(err);
      })
      .finally(() => { this.loading = false; });
    },

    // ОБНОВЛЕНИЕ ПАРОЛЯ
    changePassword() {
      if (this.newPassword !== this.confirmPassword) {
        this.error = "Пароли не совпадают!";
        return;
      }
      if (this.newPassword.length < 6) {
        this.error = "Пароль должен быть длиннее 6 символов";
        return;
      }

      this.loading = true;
      const baseUrl = import.meta.env.VITE_API_URL;
      
      axios.post(`${baseUrl}/auth/update-password`, {
        username: this.username,
        newPassword: this.newPassword
      })
      .then(() => {
        alert("Пароль успешно обновлен! Войдите снова.");
        localStorage.clear();
        location.reload(); 
      })
      .catch(err => { 
        this.error = "Ошибка при сохранении пароля.";
        console.error(err);
      })
      .finally(() => { this.loading = false; });
    }
  }
};
</script>

<style scoped>
.card { border-radius: 1.2rem; }
.form-control { border-radius: 0.7rem; }
.btn-lg { border-radius: 0.8rem; }
.form-control:focus { border-color: #0d6efd; }
/* Тряска при ошибке */
.animate__shakeX { animation: shakeX 0.5s; }
@keyframes shakeX {
  0%, 100% {transform: translateX(0);}
  20%, 60% {transform: translateX(-10px);}
  40%, 80% {transform: translateX(10px);}
}
</style>
