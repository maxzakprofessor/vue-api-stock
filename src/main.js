import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import 'bootstrap'

const app = createApp(App)

// 1. ПЕРЕХВАТЧИК ЗАПРОСОВ (Добавляем токен)
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// 2. УМНЫЙ ПЕРЕХВАТЧИК ОТВЕТОВ (Исправленная версия)
axios.interceptors.response.use(
  response => response,
  error => {
    // Проверяем, был ли это запрос к AI-советнику
    // (Подставьте сюда часть URL вашего AI сервиса, например 'ai' или 'gemini')
    const isAiRequest = error.config && error.config.url && error.config.url.includes('ai');

    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      
      if (isAiRequest) {
        // Если ошибка в AI — просто пишем в консоль и НЕ выходим из системы
        console.error("AI Сервис недоступен или отклонил запрос, сессия сохранена.");
      } else {
        // Если ошибка в основных данных (склад, товары) — выходим
        console.warn("Сессия истекла или доступ запрещен. Переход на Login.");
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        router.push('/login');
      }
    }
    return Promise.reject(error);
  }
);

app.use(router)
app.mount('#app')
