<template>
<div class="container-fluid mt-3">
    <!-- Заголовок и кнопка добавления -->
    <div class="d-flex justify-content-between align-items-center mb-4">
        <h4 class="text-primary fw-bold">Товары (ТМЦ)</h4>
        <button type="button" class="btn btn-primary shadow-sm" data-bs-toggle="modal" data-bs-target="#editModal" @click="addClick()">
            Добавить товар
        </button>
    </div>

    <!-- Таблица с фильтрами и сортировкой -->
    <div class="table-responsive shadow-sm rounded">
        <table class="table table-striped table-hover align-middle border">
            <thead class="table-dark">
                <tr>
                    <th style="width: 30%;">
                        <div class="d-flex align-items-center mb-1">
                            <input class="form-control form-control-sm me-2 shadow-none" v-model="idFilter" v-on:keyup="FilterFn()" placeholder="🔍 ID">
                            <div class="btn-group-vertical">
                                <button type="button" class="btn btn-dark btn-xs p-0 px-1" @click="sortResult('id', true)">▲</button>
                                <button type="button" class="btn btn-dark btn-xs p-0 px-1" @click="sortResult('id', false)">▼</button>
                            </div>
                        </div>
                        <small class="ps-2">ID ТМЦ</small>
                    </th>
                    <th style="width: 50%;">
                        <div class="d-flex align-items-center mb-1">
                            <input class="form-control form-control-sm me-2 shadow-none" v-model="nameGoodFilter" v-on:keyup="FilterFn()" placeholder="🔍 Поиск">
                            <div class="btn-group-vertical">
                                <button type="button" class="btn btn-dark btn-xs p-0 px-1" @click="sortResult('nameGood', true)">▲</button>
                                <button type="button" class="btn btn-dark btn-xs p-0 px-1" @click="sortResult('nameGood', false)">▼</button>
                            </div>
                        </div>
                        <small class="ps-2">Наименование ТМЦ</small>
                    </th>
                    <th class="text-center" style="width: 20%;">Действия</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="acc in goods" :key="acc.id">
                    <td>{{acc.id}}</td>
                    <td>{{acc.nameGood}}</td>
                    <td class="text-center">
                        <button type="button" class="btn btn-light shadow-sm me-2" data-bs-toggle="modal" data-bs-target="#editModal" @click="editClick(acc)">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                            </svg>
                        </button>
                        <button type="button" class="btn btn-light shadow-sm" data-bs-toggle="modal" data-bs-target="#deleteConfirmModal" @click="prepareDelete(acc.id)">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                            </svg>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <!-- МОДАЛЬНОЕ ОКНО РЕДАКТИРОВАНИЯ -->
    <div class="modal fade" id="editModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content border-0 shadow-lg">
                <div class="modal-header bg-primary text-white">
                    <h5 class="modal-title">{{modalTitle}}</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body p-4">
                    <div class="input-group mb-3">
                        <span class="input-group-text w-25 bg-light fw-bold small">Название</span>
                        <input type="text" class="form-control" v-model="nameGood">
                    </div>
                    <div class="d-grid gap-2">
                        <button @click="createClick()" v-if="id==0" class="btn btn-success btn-lg" data-bs-dismiss="modal">Создать товар</button>
                        <button @click="updateClick()" v-if="id!=0" class="btn btn-warning btn-lg text-white" data-bs-dismiss="modal">Обновить данные</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- МОДАЛЬНОЕ ОКНО УДАЛЕНИЯ -->
    <div class="modal fade" id="deleteConfirmModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-sm modal-dialog-centered">
            <div class="modal-content border-0 shadow">
                <div class="modal-body text-center p-4">
                    <div class="text-danger mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-exclamation-triangle" viewBox="0 0 16 16">
                            <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.15.15 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.16.16 0 0 1-.054.06.11.11 0 0 1-.066.017H1.146a.11.11 0 0 1-.066-.017.16.16 0 0 1-.054-.06.18.18 0 0 1 .002-.183L7.884 2.073a.15.15 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z"/>
                            <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z"/>
                        </svg>
                    </div>
                    <h5 class="fw-bold">Удалить товар?</h5>
                    <div class="d-flex justify-content-center gap-2 mt-4">
                        <button class="btn btn-light px-3" data-bs-dismiss="modal">Нет</button>
                        <button class="btn btn-danger px-3" @click="confirmDelete" data-bs-dismiss="modal">Да</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from "axios";

export default {
    name: 'goodsComponent',
    data() {
        return {
            goods: [],
            goodsWithoutFilter: [],
            modalTitle: "",
            nameGood: "",
            id: 0,
            idFilter: "",
            nameGoodFilter: "",
            idToDelete: 0
        }
    },
    methods: {
        refreshData() {
            // Используем VITE_API_URL и добавляем слэш в конце
            axios.get(`${import.meta.env.VITE_API_URL}/goods/`)
                .then((res) => {
                    this.goods = res.data;
                    this.goodsWithoutFilter = res.data;
                })
                .catch(err => console.error("Ошибка загрузки товаров:", err));
        },
        addClick() {
            this.modalTitle = "Добавить новый товар";
            this.id = 0;
            this.nameGood = "";
        },
        editClick(acc) {
            this.modalTitle = "Редактировать товар";
            this.id = acc.id;
            this.nameGood = acc.nameGood;
        },
        createClick() {
            axios.post(`${import.meta.env.VITE_API_URL}/goods/`, {
                nameGood: this.nameGood
            })
            .then(() => {
                this.refreshData();
                this.nameGood = "";
            })
            .catch(err => alert("Ошибка создания: " + JSON.stringify(err.response.data)));
        },
        updateClick() {
            // ВАЖНО: ID в пути и закрывающий слэш
            axios.put(`${import.meta.env.VITE_API_URL}/goods/${this.id}/`, {
                nameGood: this.nameGood
            })
            .then(() => {
                this.refreshData();
            })
            .catch(err => console.error("Ошибка обновления:", err));
        },
        prepareDelete(id) {
            this.idToDelete = id;
        },
        confirmDelete() {
            // ВАЖНО: ID в пути и закрывающий слэш
            axios.delete(`${import.meta.env.VITE_API_URL}/goods/${this.idToDelete}/`)
            .then(() => {
                this.refreshData();
                this.idToDelete = 0;
            })
            .catch(err => console.error("Ошибка удаления:", err));
        },
        FilterFn() {
            const idF = this.idFilter.toString().toLowerCase().trim();
            const nameF = this.nameGoodFilter.toLowerCase().trim();

            this.goods = this.goodsWithoutFilter.filter(el => {
                return el.id.toString().toLowerCase().includes(idF) &&
                       el.nameGood.toLowerCase().includes(nameF);
            });
        },
        sortResult(prop, asc) {
            this.goods.sort((a, b) => {
                if (asc) {
                    return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
                } else {
                    return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
                }
            });
        }
    },
    mounted() {
        this.refreshData();
    }
}
</script>

<style scoped>
.btn-xs { font-size: 0.7rem; line-height: 1; }
</style>
