<template>
  <div class="container-fluid mt-3">
    <!-- ПАНЕЛЬ УПРАВЛЕНИЯ -->
    <div class="card shadow-sm border-0 mb-4 p-3 bg-light">
      <div class="row g-3 align-items-end">
        <div class="col-lg-4 col-md-12">
          <label class="small fw-bold text-muted mb-2 d-block">Инструменты</label>
          <div class="btn-group w-100 shadow-sm">
            <button class="btn btn-primary" @click="fetchReport">
              <i class="bi bi-arrow-clockwise"></i> Обновить
            </button>
            <button class="btn btn-danger" @click="downloadPDF">
              <i class="bi bi-file-pdf"></i> PDF
            </button>
            <button class="btn btn-info text-white" @click="askAI" :disabled="loadingAI">
               <span v-if="loadingAI" class="spinner-border spinner-border-sm me-1"></span>
               <i v-else class="bi bi-robot"></i> AI Анализ
            </button>
          </div>
        </div>
        
        <div class="col-lg-4 col-md-6">
          <label class="small fw-bold text-muted mb-2">Выбрать склад:</label>
          <select class="form-select border-primary-subtle" v-model="selectedStock" @change="fetchReport">
            <option v-for="s in stocks" :key="s.id" :value="s.nameStock">{{ s.nameStock }}</option>
          </select>
        </div>

        <div class="col-lg-4 col-md-6">
          <label class="small fw-bold text-muted mb-2">Выбрать товар:</label>
          <select class="form-select border-primary-subtle" v-model="selectedGood" @change="fetchReport">
            <option v-for="g in goods" :key="g.id" :value="g.nameGood">{{ g.nameGood }}</option>
          </select>
        </div>
      </div>
    </div>

    <!-- AI СОВЕТНИК -->
    <Transition name="slide-fade">
      <div v-if="aiMessage" class="alert alert-info border-0 shadow-sm d-flex align-items-center">
        <span class="fs-4 me-3">🤖</span>
        <div class="flex-grow-1">
          <h6 class="fw-bold mb-1">Рекомендация AI:</h6>
          <p class="mb-0 small">{{ aiMessage }}</p>
        </div>
        <button type="button" class="btn-close" @click="aiMessage = ''"></button>
      </div>
    </Transition>

    <!-- ТАБЛИЦА ОСТАТКОВ -->
    <div class="table-responsive rounded-3 shadow-sm border bg-white">
      <table class="table table-hover align-middle mb-0">
        <thead class="table-dark">
          <tr>
            <th class="ps-4">Склад</th>
            <th>Товар</th>
            <th class="text-center" style="width: 200px;">Текущий остаток</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, idx) in reportData" :key="idx">
            <td class="ps-4">{{ item.nameStock }}</td>
            <td>{{ item.nameGood }}</td>
            <td class="text-center">
              <span :class="['badge rounded-pill px-3 py-2', item.qty > 0 ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger']">
                {{ item.qty }} шт.
              </span>
            </td>
          </tr>
          <tr v-if="reportData.length === 0">
            <td colspan="3" class="text-center p-5 text-muted">
              <i class="bi bi-box-seam fs-2 d-block mb-2"></i>
              Данные об остатках отсутствуют
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

// Базовый URL из окружения Vite
const API_URL = import.meta.env.VITE_API_URL;

// Состояние
const reportData = ref([]);
const stocks = ref([]);
const goods = ref([]);
const selectedStock = ref("Все");
const selectedGood = ref("Все");
const aiMessage = ref("");
const loadingAI = ref(false);

// 1. Инициализация (загрузка справочников)
const initData = async () => {
  try {
    const [sRes, gRes] = await Promise.all([
      axios.get(`${API_URL}/stocks/`),
      axios.get(`${API_URL}/goods/`)
    ]);
    stocks.value = [{ id: 0, nameStock: "Все" }, ...sRes.data];
    goods.value = [{ id: 0, nameGood: "Все" }, ...gRes.data];
  } catch (err) {
    console.error("Ошибка загрузки справочников:", err);
  }
};

// 2. Получение отчета (с кодированием URL для кириллицы)
const fetchReport = async () => {
  const s = encodeURIComponent(selectedStock.value);
  const g = encodeURIComponent(selectedGood.value);
  try {
    const res = await axios.get(`${API_URL}/goodrests/${s}/${g}/`);
    reportData.value = res.data;
  } catch (err) {
    console.error("Ошибка получения отчета:", err);
  }
};

// 3. Скачивание PDF
const downloadPDF = async () => {
  const s = encodeURIComponent(selectedStock.value);
  const g = encodeURIComponent(selectedGood.value);
  try {
    const res = await axios.post(`${API_URL}/goodrests/${s}/${g}/`, {}, { responseType: 'blob' });
    const blob = new Blob([res.data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Inventory_${selectedStock.value}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (err) {
    alert("Ошибка генерации PDF на сервере");
  }
};

// 4. Интеграция с AI
const askAI = async () => {
  if (reportData.value.length === 0) return;
  loadingAI.value = true;
  aiMessage.value = "";
  try {
    const res = await axios.post(`${API_URL}/ai-analyze/`, { report_data: reportData.value });
    aiMessage.value = res.data.report;
  } catch (err) {
    aiMessage.value = "Не удалось связаться с AI-модулем.";
  } finally {
    loadingAI.value = false;
  }
};

onMounted(() => {
  initData();
  fetchReport();
});
</script>

<style scoped>
.bg-success-subtle { background-color: #d1e7dd; color: #0f5132; }
.bg-danger-subtle { background-color: #f8d7da; color: #842029; }
.badge { font-size: 0.95rem; }

/* Анимация для AI блока */
.slide-fade-enter-active { transition: all 0.3s ease-out; }
.slide-fade-leave-active { transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1); }
.slide-fade-enter-from, .slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>
