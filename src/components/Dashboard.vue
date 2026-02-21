<template>
  <div class="container-fluid mt-4 px-4">
    <h4 class="fw-bold mb-4 text-primary">Панель управления (Dashboard)</h4>

    <!-- ВЕРХНИЙ РЯД: КАРТОЧКИ -->
    <div class="row g-4 mb-5">
      <div class="col-md-4" v-for="(val, key) in cardTitles" :key="key">
        <div class="card border-0 shadow-sm rounded-4 p-3 h-100">
          <div class="d-flex align-items-center">
            <div :class="['rounded-circle p-3 me-3 text-white', val.color]">
              <i :class="['bi fs-4', val.icon]"></i>
            </div>
            <div>
              <h3 class="fw-bold mb-0">{{ stats.cards[key] || 0 }}</h3>
              <small class="text-muted text-uppercase fw-bold">{{ val.label }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- НИЖНИЙ РЯД: ГРАФИК И AI -->
    <div class="row">
      <div class="col-lg-8">
        <div class="card border-0 shadow-sm rounded-4 p-4 h-100">
          <h5 class="fw-bold mb-4">Распределение остатков (Топ-7 товаров)</h5>
          <canvas id="balanceChart" style="max-height: 400px;"></canvas>
        </div>
      </div>
      <div class="col-lg-4">
        <div class="card border-0 bg-dark text-white shadow-sm rounded-4 p-4 h-100">
          <h5 class="fw-bold mb-3">🤖 AI Аналитик</h5>
          <p class="small opacity-75 mb-4">На основе текущих данных ИИ рекомендует:</p>
          <div class="alert alert-light border-0 py-2 small text-dark mb-0">
            <i class="bi bi-lightbulb-fill text-warning me-2"></i>
            {{ aiHint || 'Загрузка рекомендаций...' }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const API_URL = import.meta.env.VITE_API_URL;
const stats = ref({ cards: {} });
const aiHint = ref("");

const cardTitles = {
  goods: { label: "Товаров в базе", icon: "bi-box-seam", color: "bg-primary" },
  stocks: { label: "Активных складов", icon: "bi-house-door", color: "bg-success" },
  operations: { label: "Операций прихода", icon: "bi-arrow-down-up", color: "bg-warning" }
};

const initChart = (chartData) => {
  const ctx = document.getElementById('balanceChart');
  new Chart(ctx, {
    type: 'bar', // Можно поменять на 'pie' или 'doughnut'
    data: chartData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true } }
    }
  });
};

onMounted(async () => {
  try {
    const res = await axios.get(`${API_URL}/dashboard/stats/`);
    stats.value = res.data;
    initChart(res.data.chart);
    
    // Запрос к нашему эндпоинту ИИ
    const aiRes = await axios.post(`${API_URL}/ai-analyze/`, { report_data: res.data.chart.datasets[0].data });
    aiHint.value = aiRes.data.report;
  } catch (err) {
    console.error("Ошибка дашборда", err);
  }
});
</script>
