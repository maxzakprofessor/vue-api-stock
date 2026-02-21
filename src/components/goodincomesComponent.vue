<template>
<div class="container-fluid mt-3">
    <!-- Заголовок -->
    <div class="d-flex justify-content-between align-items-center mb-4">
        <h4 class="text-primary fw-bold">Приход товаров</h4>
        <button type="button" class="btn btn-primary shadow-sm" data-bs-toggle="modal" data-bs-target="#editModal" @click="addClick()">
            Добавить приход товара
        </button>
    </div>

    <!-- Таблица -->
    <div class="table-responsive shadow-sm rounded">
        <table class="table table-striped table-hover align-middle border">
            <thead class="table-dark">
                <tr>
                    <th>Наименование склада</th>
                    <th>Наименование товара</th>
                    <th class="text-center">Кол-во</th>
                    <th class="text-center">Дата и время</th>
                    <th class="text-center">Действия</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="acc in goodincomes" :key="acc.id">
                    <td>{{acc.nameStock}}</td>
                    <td>{{acc.nameGood}}</td>
                    <td class="text-center fw-bold text-success">{{acc.qty}}</td>
                    <td class="text-center small">{{formatDate(acc.datetime)}}</td>       
                    <td class="text-center">
                        <button type="button" class="btn btn-light shadow-sm me-2" data-bs-toggle="modal" data-bs-target="#editModal" @click="editClick(acc)">
                            <svg xmlns="http://www.w3.org" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                            </svg>
                        </button>
                        <button type="button" class="btn btn-light shadow-sm" data-bs-toggle="modal" data-bs-target="#deleteConfirmModal" @click="prepareDelete(acc.id)">
                            <svg xmlns="http://www.w3.org" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                            </svg>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <!-- МОДАЛЬНОЕ ОКНО -->
    <div class="modal fade" id="editModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content border-0 shadow-lg">
                <div class="modal-header bg-primary text-white">
                    <h5 class="modal-title">{{modalTitle}}</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body p-4">
                    <div class="input-group mb-3">
                        <span class="input-group-text w-25 bg-light fw-bold small">Склад</span>
                        <select class="form-select" v-model="nameStock">
                            <option v-for="st in stocks" :key="st.id" :value="st.nameStock">{{st.nameStock}}</option>
                        </select>
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text w-25 bg-light fw-bold small">Товар</span>
                        <select class="form-select" v-model="nameGood">
                            <option v-for="g in goods" :key="g.id" :value="g.nameGood">{{g.nameGood}}</option>
                        </select>
                    </div>        
                    <div class="input-group mb-3">
                        <span class="input-group-text w-25 bg-light fw-bold small">Кол-во</span>
                        <input type="number" class="form-control" v-model="qty">
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text w-25 bg-light fw-bold small">Дата</span>
                        <input type="date" class="form-control" v-model="dateInp">
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text w-25 bg-light fw-bold small">Время</span>
                        <input type="time" class="form-control" v-model="timeInp">
                    </div>
                    <div class="d-grid gap-2">
                        <button @click="createClick()" v-if="id==0" class="btn btn-success btn-lg" data-bs-dismiss="modal">Создать приход</button>
                        <button @click="updateClick()" v-if="id!=0" class="btn btn-warning btn-lg text-white" data-bs-dismiss="modal">Обновить данные</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- УДАЛЕНИЕ -->
    <div class="modal fade" id="deleteConfirmModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-sm modal-dialog-centered">
            <div class="modal-content border-0 shadow">
                <div class="modal-body text-center p-4">
                    <h5 class="fw-bold">Удалить приход?</h5>
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
    name: 'goodincomesComponent',
    data() {
        return {
            goodincomes: [],
            stocks: [],
            goods: [],
            modalTitle: "",
            nameStock: "",
            nameGood: "",
            qty: 0,
            dateInp: "",
            timeInp: "",
            id: 0,
            idToDelete: 0
        }
    },
    methods: {
        refreshData() {
            const api = import.meta.env.VITE_API_URL;
            axios.get(`${api}/goodincomes/`).then(res => { this.goodincomes = res.data; });
            axios.get(`${api}/stocks/`).then(res => { this.stocks = res.data; });
            axios.get(`${api}/goods/`).then(res => { this.goods = res.data; });
        },

        formatDate(dtString) {
            return new Date(dtString).toLocaleString();
        },

        addClick() {
            this.modalTitle = "Добавить приход";
            this.id = 0;
            this.nameStock = "";
            this.nameGood = "";
            this.qty = 1;
            const now = new Date();
            this.dateInp = now.toLocaleDateString('en-CA'); 
            this.timeInp = now.toTimeString().slice(0, 5);
        },

        editClick(acc) {
            this.modalTitle = "Редактировать приход";
            this.id = acc.id;
            this.nameStock = acc.nameStock;
            this.nameGood = acc.nameGood;
            this.qty = acc.qty;
            
            // МАРАФЕТ: Прямая нарезка строки ISO для HTML инпутов (substring)
            if (acc.datetime && acc.datetime.includes('T')) {
                this.dateInp = acc.datetime.substring(0, 10); 
                this.timeInp = acc.datetime.substring(11, 16); 
            }
        },

        createClick() {
            const stockObj = this.stocks.find(s => s.nameStock === this.nameStock);
            const goodObj = this.goods.find(g => g.nameGood === this.nameGood);

            // МАРАФЕТ: Склейка ISO даты с таймзоной 'Z'
            const finalDatetime = `${this.dateInp}T${this.timeInp}:00Z`;

            axios.post(`${import.meta.env.VITE_API_URL}/goodincomes/`, {
                stock: stockObj ? stockObj.id : null,
                good: goodObj ? goodObj.id : null,
                qty: this.qty,
                datetime: finalDatetime
            })
            .then(() => this.refreshData())
            .catch(err => alert("Ошибка: " + JSON.stringify(err.response.data)));
        },

        updateClick() {
            const stockObj = this.stocks.find(s => s.nameStock === this.nameStock);
            const goodObj = this.goods.find(g => g.nameGood === this.nameGood);

            // МАРАФЕТ: Склейка ISO даты для PUT-запроса
            const finalDatetime = `${this.dateInp}T${this.timeInp}:00Z`;

            axios.put(`${import.meta.env.VITE_API_URL}/goodincomes/${this.id}/`, {
                stock: stockObj ? stockObj.id : null,
                good: goodObj ? goodObj.id : null,
                qty: this.qty,
                datetime: finalDatetime
            })
            .then(() => {
                this.refreshData();
                console.log("Приход успешно обновлен!");
            })
            .catch(err => {
                console.error("Ошибка обновления:", err.response.data);
                alert("Ошибка при сохранении: " + JSON.stringify(err.response.data));
            });
        },

        prepareDelete(id) { this.idToDelete = id; },

        confirmDelete() {
            axios.delete(`${import.meta.env.VITE_API_URL}/goodincomes/${this.idToDelete}/`)
                .then(() => this.refreshData());
        }
    },
    mounted() {
        this.refreshData();
    }
}
</script>
