<template>
  <div class="container-fluid px-4 bg-light min-vh-100 pb-5">
      
      <!-- 📦 ГЛАВНЫЙ ЛОГОТИП И ЗАГОЛОВОК СИСТЕМЫ -->
      <div class="d-flex justify-content-center align-items-center mt-4 mb-4 py-3 bg-white rounded shadow-sm border border-primary border-opacity-25">
          <!-- Анимированная иконка коробки -->
          <div class="me-4 display-4 warehouse-logo animate-bounce">
              <span>📦</span>
          </div>
          <div class="text-start border-start ps-4">
              <h2 class="mb-0 fw-black text-dark text-uppercase tracking-tighter">
                  Складской учет <span class="text-primary">PRO</span>
              </h2>
              <p class="mb-0 text-muted small fw-bold">
                  <i class="bi bi-cpu"></i> Python DRF & Vue 3 AI Integration
              </p>
          </div>
      </div>
      
      <!-- 🧭 ГЛАВНОЕ МЕНЮ НАВИГАЦИИ (Navbar) -->
      <nav class="navbar navbar-expand-lg bg-white navbar-light rounded shadow-sm mb-4 border p-2 sticky-top">
          <div class="container-fluid">
              <ul class="navbar-nav w-100 align-items-center flex-wrap">
                
                <!-- ПУНКТЫ МЕНЮ (Показываются только если пользователь вошел в систему) -->
                <template v-if="loggedIn">
                    <!-- 1. ПАНЕЛЬ УПРАВЛЕНИЯ (DASHBOARD) -->
                    <li class="nav-item m-1">
                        <router-link class="nav-link btn btn-nav px-3 fw-bold border-primary border-opacity-10" to="/dashboard">
                           🏠 Главная
                        </router-link>
                    </li>
                    <!-- 2. СПРАВОЧНИКИ -->
                    <li class="nav-item m-1"><router-link class="nav-link btn btn-nav px-3" to="/stocks">🏬 Склады</router-link></li>
                    <li class="nav-item m-1"><router-link class="nav-link btn btn-nav px-3" to="/goods">🍎 Товары</router-link></li>
                    
                    <!-- 3. ЖУРНАЛЫ ОПЕРАЦИЙ -->
                    <li class="nav-item m-1"><router-link class="nav-link btn btn-nav px-3" to="/goodincomes">📥 Приход</router-link></li>
                    <li class="nav-item m-1"><router-link class="nav-link btn btn-nav px-3" to="/goodmoves">🔄 Перемещение</router-link></li>
                    
                    <!-- 4. ОТЧЕТНОСТЬ -->
                    <li class="nav-item m-1"><router-link class="nav-link btn btn-nav px-3" to="/goodrests">📊 Остатки</router-link></li>
                    
                    <!-- 5. АДМИНИСТРИРОВАНИЕ (Только для пользователя 'admin') -->
                    <li v-if="user === 'admin'" class="nav-item m-1 ms-lg-3 border-start ps-lg-3">
                        <router-link class="nav-link btn btn-outline-danger border-0 fw-bold shadow-none" to="/users">
                           👥 Сотрудники
                        </router-link>
                    </li>
                </template>

                <!-- О проекте: доступно всегда, даже без логина -->
                <li class="nav-item m-1">
                    <router-link class="nav-link btn btn-nav px-3" to="/">ℹ️ О проекте</router-link>
                </li>
                
                <!-- ПРАВАЯ СТОРОНА: Кнопки Входа/Выхода -->
                <div class="ms-auto d-flex align-items-center">
                    <!-- Если НЕ залогинен — кнопка ВХОД -->
                    <li v-if="!loggedIn" class="nav-item m-1">
                        <router-link class="btn btn-primary shadow-sm px-4 fw-bold" to="/login">
                          🔐 Вход в систему
                        </router-link>
                    </li>

                    <!-- Если ЗАЛОГИНЕН — кнопка ВЫХОД с именем пользователя -->
                    <li v-if="loggedIn" class="nav-item m-1">
                        <button class="btn btn-danger shadow-sm px-4 fw-bold" data-bs-toggle="modal" data-bs-target="#logoutModal">
                          🚪 Выйти [{{ user }}]
                        </button>
                    </li>
                </div>
              </ul>
          </div>
      </nav>

      <!-- 🖥️ ОСНОВНОЙ КОНТЕНТ (Сюда подгружаются все компоненты страниц) -->
      <div class="content-wrapper p-3 bg-white rounded shadow-sm border min-vh-50">
          <router-view></router-view>
      </div>

      <!-- 🚪 МОДАЛЬНОЕ ОКНО ПОДТВЕРЖДЕНИЯ ВЫХОДА -->
      <div class="modal fade" id="logoutModal" tabindex="-1" aria-hidden="true">
          <div class="modal-dialog modal-sm modal-dialog-centered">
              <div class="modal-content border-0 shadow-lg">
                  <div class="modal-body text-center p-4">
                      <div class="text-warning mb-3">
                         <i class="bi bi-question-circle display-4"></i>
                      </div>
                      <h5 class="fw-bold">Завершить работу?</h5>
                      <p class="small text-muted">Ваша сессия будет закрыта.</p>
                      <div class="d-flex justify-content-center gap-2 mt-4">
                          <button type="button" class="btn btn-light px-4 border" data-bs-dismiss="modal">Нет</button>
                          <button type="button" class="btn btn-danger px-4 shadow-sm" @click="confirmLogout" data-bs-dismiss="modal">Да, выйти</button>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      // Инициализация флага авторизации: проверяем наличие токена в браузере
      loggedIn: !!localStorage.getItem('token'),
      // Храним имя текущего пользователя
      user: localStorage.getItem('username')
    }
  },
  watch: {
    // Автоматически обновляем статус меню при переходе по страницам
    '$route'() {
      this.updateLoginStatus();
    }
  },
  methods: {
    // Синхронизация состояния приложения с хранилищем localStorage
    updateLoginStatus() {
      this.loggedIn = !!localStorage.getItem('token');
      this.user = localStorage.getItem('username');
    },
    // Очистка данных при выходе
    confirmLogout() {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      this.updateLoginStatus();
      // Переход на страницу логина
      this.$router.push('/login');
    }
  },
  created() {
    // Проверка статуса при самом первом запуске приложения
    this.updateLoginStatus();
  }
}
</script>

<style scoped>
/* Дополнительные стили для красоты интерфейса */
.fw-black { font-weight: 900; }

.btn-nav:hover { 
  background-color: #f8f9fa; 
  color: #0d6efd; 
  transform: translateY(-2px); 
  transition: 0.2s; 
}

/* Стиль для активной кнопки меню */
.router-link-active { 
  background-color: #0d6efd !important; 
  color: white !important; 
  font-weight: bold; 
}

/* Анимация "прыгающей" коробки логотипа */
.animate-bounce { 
  animation: bounce 2s infinite; 
}

@keyframes bounce { 
  0%, 100% { transform: translateY(0); } 
  50% { transform: translateY(-10px); } 
}

/* Плавный переход для контента */
.content-wrapper {
  transition: all 0.3s ease;
}
</style>
