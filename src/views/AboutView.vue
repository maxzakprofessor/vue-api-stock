<template>
  <div class="container mt-5 mb-5">
    <!-- 🚀 ГЛАВНЫЙ БЛОК (CTA) -->
    <div class="row justify-content-center mb-5">
      <div class="col-lg-10">
        <div class="bg-white p-5 rounded-4 shadow-sm border border-primary border-opacity-25 text-center">
          <div class="display-1 mb-3 animate-bounce">📦</div>
          <h1 class="display-4 fw-black text-dark mb-3">
            Sklad <span class="text-primary">PRO</span> AI
          </h1>
          <p class="lead text-muted mb-4 fs-4">
            Интеллектуальная экосистема складского учета нового поколения. 
            <br>
            <span class="badge bg-light text-primary border">Python 3.12 (DRF)</span> + 
            <span class="badge bg-light text-success border">Vue 3 (Composition)</span>
          </p>
          
          <div v-if="!isLoggedIn" class="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <router-link to="/login" class="btn btn-primary btn-lg px-5 py-3 shadow fw-bold">
              <i class="bi bi-shield-lock-fill me-2"></i> Войти в систему
            </router-link>
          </div>
          <div v-else class="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <router-link to="/dashboard" class="btn btn-success btn-lg px-5 py-3 shadow fw-bold text-white">
              <i class="bi bi-speedometer2 me-2"></i> К панели управления
            </router-link>
          </div>
          
          <p class="mt-4 small text-muted italic">
            Архитектура SOLID • Нормализация БД (No Redundancy) • Аналитика Gemini AI
          </p>
        </div>
      </div>
    </div>

    <!-- 📚 ТЕХНИЧЕСКАЯ ДОКУМЕНТАЦИЯ -->
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <div class="accordion shadow-sm rounded-4 overflow-hidden border" id="aboutAccordion">
          
          <!-- СЕКЦИЯ 1: АРХИТЕКТУРА И SOLID -->
          <div class="accordion-item border-0">
            <h2 class="accordion-header">
              <button class="accordion-button fw-bold bg-white text-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                📖 Архитектурные принципы и Данные
              </button>
            </h2>
            <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#aboutAccordion">
              <div class="accordion-body bg-white border-top">
                <p class="text-start">Система спроектирована с упором на <strong>целостность данных</strong> и расширяемость. Проведена полная <strong>нормализация базы данных</strong>, исключив избыточность (Redundancy).</p>
                <div class="row mt-3 g-2 text-start">
                  <div class="col-md-4">
                    <div class="p-2 border rounded bg-light small h-100">
                        <strong>S (Single Responsibility):</strong> 
                        Справочники отвечают только за описания, а журналы — только за движение. Связанность через <strong>Foreign Keys</strong> гарантирует отсутствие дублей.
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="p-2 border rounded bg-light small h-100">
                        <strong>O (Open/Closed):</strong> 
                        Логика расчетов (например, отчеты по остаткам) открыта для расширения через APIView без изменения структуры таблиц.
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="p-2 border rounded bg-light small h-100">
                        <strong>Нормализация:</strong> 
                        Использование ID вместо текстовых названий в транзакциях минимизирует объем БД и исключает риск "рассинхрона" имен.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- СЕКЦИЯ 2: СТЕК -->
          <div class="accordion-item border-0">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed fw-bold bg-white text-dark" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo">
                🛠 Технологический стек (2026)
              </button>
            </h2>
            <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#aboutAccordion">
                <div class="accordion-body bg-white border-top p-4">
                  <div class="mb-4 text-start">
                    <h6 class="fw-bold text-secondary small text-uppercase mb-3">Backend:</h6>
                    <div class="d-flex flex-wrap gap-2">
                      <img src="https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white" alt="Python">
                      <img src="https://img.shields.io/badge/Django-092E20?style=flat&logo=django&logoColor=white" alt="Django">
                      <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL">
                      <img src="https://img.shields.io/badge/JWT-brightgreen?logo=jsonwebtokens" alt="JWT">
                    </div>
                  </div>
                  <hr class="opacity-10">
                  <div class="text-start">
                    <h6 class="fw-bold text-secondary small text-uppercase mb-3">Frontend & AI:</h6>
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

          <!-- СЕКЦИЯ 3: БЕЗОПАСНОСТЬ (ИСПРАВЛЕНО) -->
          <div class="accordion-item border-0">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed fw-bold bg-white text-dark" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree">
                🔐 Стандарты безопасности
              </button>
            </h2>
            <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#aboutAccordion">
              <div class="accordion-body bg-white border-top pb-3 text-start">
                <div class="alert alert-info border-0 small shadow-sm mb-2">
                  <i class="bi bi-shield-check me-2"></i> В системе реализована строгая политика паролей: генерация на сервере и обязательная смена пользователем.
                </div>
                <ul class="list-group list-group-flush small">
                  <li class="list-group-item border-0 py-1 px-0"><i class="bi bi-check2-circle text-success me-2"></i> Хеширование паролей алгоритмом PBKDF2.</li>
                  <li class="list-group-item border-0 py-1 px-0"><i class="bi bi-check2-circle text-success me-2"></i> Ссылочная целостность данных (Foreign Keys).</li>
                  <li class="list-group-item border-0 py-1 px-0"><i class="bi bi-check2-circle text-success me-2"></i> Ролевая модель доступа: Сотрудники / Администраторы.</li>
                  <li class="list-group-item border-0 py-1 px-0"><i class="bi bi-check2-circle text-success me-2"></i> PDF-отчетность на бэкенде (ReportLab).</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="accordion-item border-0 bg-light p-4 text-center">
             <p class="mb-0 fw-bold text-dark">Разработчик: Закирьянов М.М.</p>
             <p class="small text-muted mb-0 mt-1">Sklad PRO AI Ecosystem • v.2.0 • 2026</p>
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
    isLoggedIn() { return !!localStorage.getItem('token'); }
  }
}
</script>

<style scoped>
.fw-black { font-weight: 900; }
.accordion-button:not(.collapsed) { color: #0d6efd; background-color: #f8f9fa; box-shadow: none; }
.accordion-item { border-bottom: 1px solid #dee2e6 !important; }
.animate-bounce { animation: bounce 2s infinite; display: inline-block; }
@keyframes bounce { 0%, 20%, 50%, 80%, 100% { transform: translateY(0); } 40% { transform: translateY(-20px); } 60% { transform: translateY(-10px); } }
.italic { font-style: italic; }
.list-group-item { background-color: transparent; }
</style>
