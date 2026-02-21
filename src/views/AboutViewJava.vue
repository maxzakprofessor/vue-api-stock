<template>
  <div class="container mt-5 mb-5">
    <!-- 🚀 БЛОК ПРИВЕТСТВИЯ (CALL TO ACTION) -->
    <div class="row justify-content-center mb-5">
      <div class="col-lg-10">
        <div class="bg-white p-5 rounded-4 shadow-sm border border-primary border-opacity-25 text-center">
          <div class="display-1 mb-3 animate-bounce">📦</div>
          <h1 class="display-4 fw-black text-dark mb-3">
            Sklad <span class="text-primary">PRO</span> AI
          </h1>
          <p class="lead text-muted mb-4 fs-4">
            Интеллектуальная экосистема складского учета нового поколения. 
            <br><span class="badge bg-light text-primary border">Java 25 LTS</span> + <span class="badge bg-light text-success border">Vue 3</span>
          </p>
          
          <!-- Динамическая кнопка: Вход или Переход к складу -->
          <div v-if="!isLoggedIn" class="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <router-link to="/login" class="btn btn-primary btn-lg px-5 py-3 shadow fw-bold">
              <i class="bi bi-shield-lock-fill me-2"></i> Войти в систему
            </router-link>
          </div>
          <div v-else class="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <router-link to="/goodrests" class="btn btn-success btn-lg px-5 py-3 shadow fw-bold text-white">
              <i class="bi bi-speedometer2 me-2"></i> Перейти к панели управления
            </router-link>
          </div>
          
          <p class="mt-4 small text-muted italic">
            Мигрировано с .NET • Архитектура SOLID • Безопасность JWT
          </p>
        </div>
      </div>
    </div>

    <!-- 📚 ПОДРОБНОСТИ (АККОРДЕОН ИЗ README) -->
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <div class="accordion shadow-sm rounded-3 overflow-hidden border" id="aboutAccordion">
          
          <!-- СЕКЦИЯ 1: ОБЗОР -->
          <div class="accordion-item border-0">
            <h2 class="accordion-header">
              <button class="accordion-button fw-bold bg-white text-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                📖 Обзор архитектуры (SOLID)
              </button>
            </h2>
            <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#aboutAccordion">
              <div class="accordion-body bg-white border-top">
                <p>Система построена на принципах <strong>разграничения ответственности</strong>. Бэкенд на Java 25 полностью изолирован от фронтенда и взаимодействует через защищенный REST API.</p>
                <div class="row mt-3">
                  <div class="col-md-4 mb-2">
                    <div class="p-2 border rounded bg-light small"><strong>S (Single Responsibility):</strong> Логика расчетов в Service-слое.</div>
                  </div>
                  <div class="col-md-4 mb-2">
                    <div class="p-2 border rounded bg-light small"><strong>O (Open/Closed):</strong> Легкое расширение через экспорт PDF.</div>
                  </div>
                  <div class="col-md-4 mb-2">
                    <div class="p-2 border rounded bg-light small"><strong>D (Dependency Injection):</strong> Слабая связанность через Spring IoC.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- СЕКЦИЯ 2: ТЕХНОЛОГИИ (БЕЙДЖИ) -->
          <div class="accordion-item border-0">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed fw-bold bg-white text-dark" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo">
                🛠 Технологический стек (Stack Badges)
              </button>
            </h2>
            <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#aboutAccordion">
                <div class="accordion-body bg-white border-top p-4 text-start">
                  <!-- Блок Backend -->
                  <div class="mb-4">
                    <h6 class="fw-bold text-secondary small text-uppercase mb-3">Бэкенд инфраструктура:</h6>
                    <div class="d-flex flex-wrap gap-2">
                      <img src="https://img.shields.io/badge/Java-ED8B00?style=flat&logo=openjdk&logoColor=white" alt="Java">
                      <img src="https://img.shields.io/badge/Spring Boot-6DB33F?style=flat&logo=spring&logoColor=white" alt="Spring Boot">
                      <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL">
                      <img src="https://img.shields.io/badge/JWT-brightgreen?logo=jsonwebtokens" alt="JWT">
                    </div>
                  </div>
                  <hr class="opacity-10">
                  <!-- Блок Frontend -->
                  <div>
                    <h6 class="fw-bold text-secondary small text-uppercase mb-3">Фронтенд и AI:</h6>
                    <div class="d-flex flex-wrap gap-2">
                        <img src="https://img.shields.io/badge/vue-3.x-brightgreen.svg" alt="Vue 3">
                        <img src="https://img.shields.io/badge/Vite-646CFF?style=flat&logo=Vite&logoColor=white" alt="Vite">
                        <img src="https://img.shields.io/badge/Bootstrap-563D7C?style=flat&logo=bootstrap&logoColor=white" alt="Bootstrap">
                        <img src="https://img.shields.io/badge/Gemini-AI-orange?style=flat&logo=google-gemini&logoColor=white" alt="Gemini AI">
                    </div>
                  </div>
                </div>
            </div>
          </div>

          <!-- СЕКЦИЯ 3: БЕЗОПАСНОСТЬ -->
          <div class="accordion-item border-0">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed fw-bold bg-white text-dark" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree">
                🔐 Стандарты безопасности (Gov-Grade)
              </button>
            </h2>
            <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#aboutAccordion">
              <div class="accordion-body bg-white border-top">
                <div class="alert alert-warning border-0 small shadow-sm">
                  <i class="bi bi-info-circle-fill me-2"></i> Система адаптирована под регламенты госучреждений: централизованная регистрация и принудительная смена паролей.
                </div>
                <ul class="list-group list-group-flush small">
                  <li class="list-group-item">✅ Хеширование паролей алгоритмом BCrypt.</li>
                  <li class="list-group-item">✅ Генерация временных паролей на стороне сервера (Java).</li>
                  <li class="list-group-item">✅ Ролевая модель доступа (admin / user).</li>
                  <li class="list-group-item">✅ Серверная PDF-отчетность (защита от подделки данных).</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- СЕКЦИЯ 4: СТАТУС -->
          <div class="accordion-item border-0 bg-light p-4 text-center">
             <img src="https://img.shields.io" class="mb-3">
             <p class="mb-0 fw-bold text-dark">Разработчик: Закирьянов М.М.</p>
             <p class="small text-muted mb-0 mt-1">Sklad PRO AI Ecosystem • 2026</p>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutView',
  computed: {
    isLoggedIn() {
      // Проверяем наличие токена для смены кнопки Вход -> К складу
      return !!localStorage.getItem('token');
    }
  }
}
</script>

<style scoped>
.fw-black { font-weight: 900; }
.accordion-button:not(.collapsed) {
  color: #0d6efd;
  background-color: #f8f9fa;
  box-shadow: none;
}
.accordion-item {
  border-bottom: 1px solid #dee2e6 !important;
}
.animate-bounce {
  animation: bounce 2s infinite;
  display: inline-block;
}
@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
  40% {transform: translateY(-20px);}
  60% {transform: translateY(-10px);}
}
.italic { font-style: italic; }
</style>
