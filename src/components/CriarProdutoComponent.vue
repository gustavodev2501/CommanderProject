<template>
    <div>
        <FullScreenLoader v-if="showScreenLoader" />
        <div v-else class="app-container">
            <SidebarComponent />
            <div class="main-content">
                <TopbarComponent />
                <div class="header">
                    <h1>Produtos</h1>
                    <div class="header-buttons">
                        <div class="excel-dropdown">
                            <button class="btn excel-btn" @click="toggleExcelDropdown">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" width="20"
                                    height="20" stroke-width="2">
                                    <path
                                        d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2">
                                    </path>
                                    <path
                                        d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z">
                                    </path>
                                </svg>
                                Excel
                            </button>
                            <div v-if="showExcelDropdown" class="excel-options">
                                <button @click="importExcelFile">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                        stroke="black" stroke-linecap="round" stroke-linejoin="round" width="20"
                                        height="20" stroke-width="2">
                                        <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
                                        <path
                                            d="M5 13v-8a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2h-5.5m-9.5 -2h7m-3 -3l3 3l-3 3">
                                        </path>
                                    </svg>
                                    Importar Excel
                                </button>
                                <button @click="exportToExcel">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                        stroke="black" stroke-linecap="round" stroke-linejoin="round" width="20"
                                        height="20" stroke-width="2">
                                        <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
                                        <path
                                            d="M11.5 21h-4.5a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v5m-5 6h7m-3 -3l3 3l-3 3">
                                        </path>
                                    </svg>
                                    Exportar para Excel
                                </button>
                            </div>
                        </div>
                        <button class="btn criar-btn" @click="openModal">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" width="20"
                                height="20" stroke-width="2">
                                <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z"></path>
                                <path d="M15 12h-6"></path>
                                <path d="M12 9v6"></path>
                            </svg>
                            Criar Produto
                        </button>
                    </div>
                </div>
                <div class="content">
                    <div class="alert-container">
                        <AlertMessage v-for="alert in alerts" :key="alert.id" :message="alert.message"
                            :type="alert.type" :duration="alert.duration" @closed="removeAlert(alert.id)" />
                    </div>
                    <!-- Tabela com estilização atualizada -->
                    <table class="produtos-table">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Detalhes</th>
                                <th>Categoria</th>
                                <th>Novidades</th>
                                <th>Quem Criou</th>
                                <th>Dia Criado</th>
                                <th>Imagem</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="produto in paginatedProdutos" :key="produto.id" class="table-row">
                                <td>{{ produto.nome }}</td>
                                <td>{{ produto.detalhes }}</td>
                                <td>{{ produto.categoria }}</td>
                                <td>
                                    <ul class="novidades-list">
                                        <li v-for="(nov, index) in produto.novidades" :key="index">{{ nov }}</li>
                                    </ul>
                                </td>
                                <td>{{ produto.criadoPor || 'N/A' }}</td>
                                <td>{{ produto.criadoEm }}</td>
                                <td>
                                    <img v-if="produto.imagens && produto.imagens.length" :src="produto.imagens[0]"
                                        alt="Imagem do produto" class="produto-thumb" />
                                </td>
                                <td>
                                    <button class="editar-btn" @click="editProduto(produto)">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                            width="20" height="20" stroke-width="2">
                                            <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1"></path>
                                            <path
                                                d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.385z">
                                            </path>
                                            <path d="M16 5l3 3"></path>
                                        </svg>
                                        Editar
                                    </button>
                                    <button class="excluir-btn" @click="openDeleteModal(produto)">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                            width="20" height="20" stroke-width="2">
                                            <polyline points="3 6 5 6 21 6"></polyline>
                                            <path d="M19 6l-1 14H6L5 6"></path>
                                            <path d="M10 11v6"></path>
                                            <path d="M14 11v6"></path>
                                            <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"></path>
                                        </svg>
                                        Excluir
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="pagination" v-if="filteredProdutos.length > productsPerPage">
                        <button @click="prevPage" :disabled="currentPage === 1">Anterior</button>
                        <span>{{ currentPage }} / {{ lastPage }}</span>
                        <button @click="nextPage" :disabled="currentPage === lastPage">Próximo</button>
                    </div>
                </div>
            </div>

            <!-- Modal de Cadastro / Edição -->
            <div v-if="showModal" class="modal-overlay" @click.self="closeModal" tabindex="-1"
                @keydown.esc="closeModal">
                <div class="modal-content" ref="modalContent">
                    <span class="modal-close" @click="closeModal">&times;</span>
                    <div class="form-produto">
                        <div class="top-produto">
                            <h1>{{ isEditMode ? 'Editar Equipamento' : 'Postar Equipamento' }}</h1>
                        </div>
                        <div class="body-produto">
                            <input placeholder="Nome do Equipamento" type="text" v-model="nomeEquipamento" />
                            <input placeholder="Detalhes do produto" type="text" v-model="detalhesEquipamento" />

                            <input placeholder="Categoria do Produto" type="text" v-model="categoriaProduto" />
                            <div v-if="categoriaProduto.trim() && filteredCategoriasProduto.length"
                                class="dropdown-categorias-produto">
                                <ul>
                                    <li v-for="(cat, index) in filteredCategoriasProduto" :key="index"
                                        @click="selectCategoriaProduto(cat)">
                                        {{ cat }}
                                    </li>
                                </ul>
                            </div>

                            <div class="novidades-section">
                                <input placeholder="Novidades / Diferenciais" type="text" v-model="newNovidade"
                                    @keyup.enter="addNovidade" />
                                <div class="novidades-list">
                                    <div class="categoria-item" v-for="(nov, index) in novidades" :key="index"
                                        @click="removeNovidade(index)">
                                        {{ nov }}
                                    </div>
                                </div>
                            </div>

                            <div class="image-upload">
                                <label for="file-upload" class="custom-file-upload">Selecionar Imagens</label>
                                <input id="file-upload" type="file" multiple @change="handleFileUpload" />
                                <div class="image-preview" v-if="imagePreviews.length">
                                    <img v-for="(img, index) in imagePreviews" :src="img" :key="index"
                                        alt="Preview da imagem" @click="removeImage(index)" />
                                </div>
                            </div>
                            <button class="btn" @click="handleSubmit" :disabled="loading">
                                <span v-if="!loading">{{ isEditMode ? 'Atualizar' : 'Enviar' }}</span>
                                <span v-else class="loader"></span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Modal de Exclusão -->
            <div v-if="showDeleteModal" class="modal-overlay" @click.self="closeDeleteModal" tabindex="-1"
                @keydown.esc="closeDeleteModal">
                <div class="modal-content" ref="deleteModalContent">
                    <span class="modal-close" @click="closeDeleteModal">&times;</span>
                    <div class="delete-confirmation">
                        <h1>Confirmação de Exclusão</h1>
                        <p>Tem certeza que deseja excluir o equipamento "{{ produtoDeletar?.nome }}"?</p>
                        <div class="actions">
                            <button class="btn" @click="deleteProduto">Sim, excluir</button>
                            <button class="btn" @click="closeDeleteModal">Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Input oculto para importar o arquivo Excel -->
            <input ref="excelFileInput" type="file" accept=".xlsx, .xls" style="display: none"
                @change="handleExcelImport" />
        </div>
    </div>
</template>

<script>
import anime from "animejs";
import SidebarComponent from "./SidebarComponent.vue";
import TopbarComponent from "./TopbarComponent.vue";
import AlertMessage from "./AlertMessage.vue";
import FullScreenLoader from "./FullScreenLoader.vue";
import { ref as dbRef, push, set, onValue, remove } from "firebase/database";
import { db } from "@/firebase";
import * as XLSX from "xlsx";

export default {
    name: "CriarProdutoComponent",
    components: {
        SidebarComponent,
        TopbarComponent,
        AlertMessage,
        FullScreenLoader
    },
    data() {
        return {
            showScreenLoader: false,
            showModal: false,
            nomeEquipamento: "",
            detalhesEquipamento: "",
            categoriaProduto: "",
            newNovidade: "",
            novidades: [],
            imagePreviews: [],
            loading: false,
            alerts: [],
            produtos: [],
            isEditMode: false,
            produtoEditandoId: null,
            showExcelDropdown: false,
            filters: { nome: "", detalhes: "", criadoPor: "", criadoEm: "" },
            currentPage: 1,
            productsPerPage: 5,
            produtoDeletar: null,
            showDeleteModal: false
        };
    },
    computed: {
        filteredProdutos() {
            return this.produtos.filter(produto => {
                const nomeMatch = produto.nome.toLowerCase().includes(this.filters.nome.toLowerCase());
                const detalhesMatch = produto.detalhes.toLowerCase().includes(this.filters.detalhes.toLowerCase());
                const criadoPorMatch = (produto.criadoPor ? produto.criadoPor.toLowerCase() : "").includes(this.filters.criadoPor.toLowerCase());
                const criadoEmMatch = String(produto.criadoEm).toLowerCase().includes(this.filters.criadoEm.toLowerCase());
                return nomeMatch && detalhesMatch && criadoPorMatch && criadoEmMatch;
            });
        },
        paginatedProdutos() {
            const start = (this.currentPage - 1) * this.productsPerPage;
            return this.filteredProdutos.slice(start, start + this.productsPerPage);
        },
        lastPage() {
            return Math.ceil(this.filteredProdutos.length / this.productsPerPage) || 1;
        },
        allCategoriasProduto() {
            const categoriesSet = new Set();
            this.produtos.forEach(produto => {
                if (produto.categoria) {
                    categoriesSet.add(produto.categoria);
                }
            });
            return Array.from(categoriesSet);
        },
        filteredCategoriasProduto() {
            if (!this.categoriaProduto.trim()) return [];
            const query = this.categoriaProduto.trim().toLowerCase();
            return this.allCategoriasProduto.filter(cat => cat.toLowerCase().includes(query));
        }
    },
    methods: {
        openModal() {
            this.resetForm();
            this.isEditMode = false;
            this.produtoEditandoId = null;
            this.showModal = true;
            this.$nextTick(() => {
                anime({
                    targets: this.$refs.modalContent,
                    scale: [0.8, 1],
                    opacity: [0, 1],
                    duration: 500,
                    easing: "easeOutBack"
                });
            });
        },
        closeModal() {
            anime({
                targets: this.$refs.modalContent,
                scale: [1, 0.8],
                opacity: [1, 0],
                duration: 300,
                easing: "easeInBack",
                complete: () => {
                    this.showModal = false;
                }
            });
        },
        resetForm() {
            this.nomeEquipamento = "";
            this.detalhesEquipamento = "";
            this.categoriaProduto = "";
            this.newNovidade = "";
            this.novidades = [];
            this.imagePreviews = [];
            this.isEditMode = false;
            this.produtoEditandoId = null;
        },
        addNovidade() {
            if (this.newNovidade.trim()) {
                this.novidades.push(this.newNovidade.trim());
                this.newNovidade = "";
            }
        },
        removeNovidade(index) {
            this.novidades.splice(index, 1);
        },
        selectCategoriaProduto(categoria) {
            this.categoriaProduto = categoria;
        },
        handleFileUpload(e) {
            const files = e.target.files;
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                this.imagePreviews.push(URL.createObjectURL(file));
            }
        },
        removeImage(index) {
            this.imagePreviews.splice(index, 1);
        },
        addAlert({ message, type = "system", duration = 3000 }) {
            const id = Date.now() + Math.random();
            this.alerts.push({ id, message, type, duration });
        },
        removeAlert(id) {
            this.alerts = this.alerts.filter(alert => alert.id !== id);
        },
        async handleSubmit() {
            if (!this.nomeEquipamento || !this.detalhesEquipamento) {
                this.addAlert({ message: "Preencha os campos de nome e detalhes.", type: "error" });
                return;
            }
            this.loading = true;
            const equipamento = {
                nome: this.nomeEquipamento,
                detalhes: this.detalhesEquipamento,
                categoria: this.categoriaProduto,
                novidades: this.novidades,
                imagens: this.imagePreviews,
                criadoEm: new Date().toISOString().split("T")[0],
                criadoPor: "Admin"
            };
            try {
                if (this.isEditMode) {
                    const equipamentoRef = dbRef(db, `equipamentos/${this.produtoEditandoId}`);
                    await set(equipamentoRef, equipamento);
                    this.addAlert({ message: "Equipamento atualizado!", type: "success" });
                } else {
                    await push(dbRef(db, "equipamentos"), equipamento);
                    this.addAlert({ message: "Equipamento cadastrado!", type: "success" });
                }
                this.closeModal();
            } catch (e) {
                this.addAlert({ message: "Erro ao enviar equipamento.", type: "error" });
            } finally {
                this.loading = false;
            }
        },
        editProduto(produto) {
            this.nomeEquipamento = produto.nome;
            this.detalhesEquipamento = produto.detalhes;
            this.categoriaProduto = produto.categoria || "";
            this.novidades = produto.novidades ? [...produto.novidades] : [];
            this.imagePreviews = produto.imagens ? [...produto.imagens] : [];
            this.isEditMode = true;
            this.produtoEditandoId = produto.id;
            this.showModal = true;
            this.$nextTick(() => {
                anime({
                    targets: this.$refs.modalContent,
                    scale: [0.8, 1],
                    opacity: [0, 1],
                    duration: 500,
                    easing: "easeOutBack"
                });
            });
        },
        fetchProdutos() {
            const equipamentosRef = dbRef(db, "equipamentos");
            onValue(equipamentosRef, snapshot => {
                const data = snapshot.val() || {};
                this.produtos = Object.keys(data).map(key => ({ id: key, ...data[key] }));
                anime({
                    targets: ".table-row",
                    translateX: [-50, 0],
                    opacity: [0, 1],
                    delay: anime.stagger(100),
                    duration: 500,
                    easing: "easeOutQuad"
                });
            });
        },
        toggleExcelDropdown() {
            this.showExcelDropdown = !this.showExcelDropdown;
        },
        importExcelFile() {
            this.$refs.excelFileInput.click();
            this.showExcelDropdown = false;
        },
        handleExcelImport(e) {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = evt => {
                const data = evt.target.result;
                const workbook = XLSX.read(data, { type: "binary" });
                const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });
                if (!jsonData.length) {
                    this.addAlert({ message: "Arquivo vazio ou inválido.", type: "error" });
                    return;
                }
                jsonData.forEach(async item => {
                    if (!item.Nome || !item.Detalhes) return;
                    const produto = {
                        nome: item.Nome,
                        detalhes: item.Detalhes,
                        novidades: item.Novidades ? item.Novidades.split(",").map(c => c.trim()) : [],
                        categoria: item.Categoria || "",
                        imagens: item.Imagens ? item.Imagens.split(",").map(url => url.trim()) : [],
                        criadoPor: item.CriadoPor || "Admin",
                        criadoEm:
                            (typeof item.CriadoEm === "number"
                                ? this.convertExcelDate(item.CriadoEm)
                                : new Date(item.CriadoEm).toISOString().split("T")[0]) ||
                            new Date().toISOString().split("T")[0]
                    };
                    try {
                        await push(dbRef(db, "equipamentos"), produto);
                    } catch (e) {
                        console.error(e);
                    }
                });
                this.addAlert({ message: "Produtos importados!", type: "success" });
                e.target.value = "";
            };
            reader.onerror = () => {
                this.addAlert({ message: "Erro ao ler o arquivo.", type: "error" });
            };
            reader.readAsBinaryString(file);
        },
        exportToExcel() {
            const data = this.produtos.map(produto => ({
                Nome: produto.nome,
                Detalhes: produto.detalhes,
                Categoria: produto.categoria,
                Novidades: produto.novidades && produto.novidades.length ? produto.novidades.join(", ") : "",
                CriadoPor: produto.criadoPor,
                CriadoEm: produto.criadoEm,
                Imagem: produto.imagens && produto.imagens.length ? produto.imagens[0] : ""
            }));
            const ws = XLSX.utils.json_to_sheet(data);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Produtos");
            XLSX.writeFile(wb, "produtos.xlsx");
            this.showExcelDropdown = false;
        },
        prevPage() {
            if (this.currentPage > 1) this.currentPage--;
        },
        nextPage() {
            if (this.currentPage < this.lastPage) this.currentPage++;
        },
        openDeleteModal(produto) {
            this.produtoDeletar = produto;
            this.showDeleteModal = true;
        },
        closeDeleteModal() {
            this.showDeleteModal = false;
            this.produtoDeletar = null;
        },
        async deleteProduto() {
            try {
                await remove(dbRef(db, `equipamentos/${this.produtoDeletar.id}`));
                this.addAlert({ message: "Equipamento excluído!", type: "success" });
            } catch (e) {
                this.addAlert({ message: "Erro ao excluir equipamento.", type: "error" });
            } finally {
                this.closeDeleteModal();
            }
        },
        convertExcelDate(serial) {
            const utc_days = Math.floor(serial - 25569);
            const utc_value = utc_days * 86400 * 1000;
            const date_info = new Date(utc_value);
            const offset = date_info.getTimezoneOffset() * 60000;
            const local_date = new Date(date_info.getTime() + offset);
            return local_date.toISOString().split("T")[0];
        }
    },
    mounted() {
        setTimeout(() => {
            this.showScreenLoader = false;
        }, 5000);
        this.fetchProdutos();
        anime({
            targets: ".app-container",
            opacity: [0, 1],
            duration: 1000,
            easing: "easeInOutQuad"
        });
    }
};
</script>




<style scoped>
.produtos-table {
    width: 100%;
    font-family: 'Arial', sans-serif;
    border-collapse: separate;
    border-spacing: 0;
    border-radius: 10px;
    overflow: hidden;
    background: #F6F6F6;
}

.produtos-table thead {
    background-color: #F6F6F6;
    color: #1e1e1e;
}

.produtos-table thead th {
    padding: 15px;
    text-align: left;
    font-weight: bold;
    letter-spacing: 0.5px;
}

.produtos-table tbody tr {
    border-bottom: 1px solid #b00020;
    transition: background 0.3s ease;
}

.produtos-table tbody tr:hover {
    background-color: #2727271f;
}

.produtos-table tbody td {
    padding: 10px 13px;
    color: #333;
    border: 1px solid #fff;
}

.produto-thumb {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 5px;
}

.app-container {
    display: flex;
    height: 100vh;
}

.main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    color: #1e1e1e;
    flex-wrap: wrap;
}

.header-buttons {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
}

.btn.criar-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #D02D1D;
    padding: 10px;
    border-radius: 5px;
    border: none;
    color: #fff;
    font-size: 15px;
    cursor: pointer;
}

.criar-btn svg {
    margin-right: 5px;
}

.excel-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #F6F6F6;
    padding: 10px;
    border-radius: 5px;
    border: none;
    color: #242424;
    font-size: 15px;
    cursor: pointer;
    position: relative;
}

.excel-btn svg {
    margin-right: 5px;
}

.excel-dropdown {
    position: relative;
}

.excel-options {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 118%;
    width: 10em;
    right: -36px;
    background-color: #F6F6F6;
    border-radius: 5px;
    flex-direction: column;
    z-index: 1000;
}

.excel-options button {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background: none;
    border: none;
    color: black;
    padding: 10px;
    text-align: left;
    width: 100%;
    cursor: pointer;
    transition: background 0.2s;
}

.excel-options svg {
    margin-right: 5px;
}

.excel-options button:hover {
    background-color: #E8E8E8;
}

.editar-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #272727;
    padding: 10px;
    border-radius: 5px;
    border: none;
    margin-top: 10px;
    color: #fff;
    font-size: 15px;
    width: 100%;
    cursor: pointer;
}

.editar-btn svg {
    margin-right: 5px;
}

.excluir-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #b00020;
    padding: 10px;
    border-radius: 5px;
    border: none;
    margin-top: 5px;
    color: #fff;
    font-size: 15px;
    width: 100%;
    cursor: pointer;
}

.excluir-btn svg {
    margin-right: 5px;
}

.content {
    flex: 1;
    padding: 20px;
    box-sizing: border-box;
}

.alert-container {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1100;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1200;
    outline: none;
}

.modal-content {
    background: #F6F6F6;
    padding: 10px;
    border-radius: 10px;
    width: 80%;
    max-width: 600px;
    position: relative;
}

.modal-close {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 24px;
    cursor: pointer;
}

.form-produto {
    background-color: #F6F6F6;
    padding: 15px;
    border-radius: 10px;
}

.form-produto .top-produto h1 {
    font-size: 25px;
    color: #1e1e1e;
}

.form-produto .body-produto {
    margin-top: 10px;
}

.form-produto .body-produto input {
    padding: 15px;
    width: 100%;
    border: none;
    background-color: #FFFFFF;
    border-radius: 5px;
    outline: none;
    font-size: 15px;
    margin-top: 10px;
    color: #1e1e1e;
}

.dropdown-categorias-produto {
    background-color: #FFFFFF;
    border-radius: 5px;
    margin-top: 2px;
    z-index: 10;
}

.dropdown-categorias-produto ul {
    list-style: none;
    margin: 0;
    padding: 0;
}

.dropdown-categorias-produto li {
    padding: 8px 10px;
    cursor: pointer;
    color: #1e1e1e;
}

.novidades-section {
    position: relative;
}

.novidades-list {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    margin-top: 5px;
}

.categoria-item {
    background-color: #D02D1D27;
    padding: 5px 10px;
    border-radius: 5px;
    color: #1e1e1e;
    font-size: 14px;
    cursor: pointer;
}

.form-produto .image-upload {
    width: 100%;
    margin-top: 5px;
    text-align: center;
}

.form-produto .custom-file-upload {
    display: inline-block;
    padding: 15px;
    cursor: pointer;
    background-color: transparent;
    border: 2px solid #1e1e1e;
    border-style: dotted;
    color: #1e1e1e;
    border-radius: 5px;
    width: 100%;
}

.form-produto .image-upload input[type="file"] {
    display: none;
}

.form-produto .image-preview {
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
}

.form-produto .image-preview img {
    max-width: 100px;
    max-height: 100px;
    border-radius: 5px;
    object-fit: cover;
    cursor: pointer;
    transition: transform 0.2s;
}

.form-produto .image-preview img:hover {
    transform: scale(1.1);
}

.form-produto .btn {
    background-color: #D02D1D;
    padding: 15px;
    border-radius: 5px;
    border: none;
    width: 100%;
    margin-top: 10px;
    color: #fff;
    font-size: 15px;
    cursor: pointer;
}

.form-produto .btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
}

.form-produto .loader {
    width: 18px;
    height: 18px;
    border: 3px solid #fff;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    animation: rotation 1s linear infinite;
}

@keyframes rotation {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

/* Estilos do Modal de Exclusão */
.delete-confirmation {
    text-align: center;
    color: #1e1e1e;
    /* Cor de texto alinhada com o modal de criar/editar */
    padding: 15px;
}

.delete-confirmation h1 {
    font-size: 25px;
    margin-bottom: 10px;
}

.delete-confirmation p {
    margin-bottom: 20px;
}

.delete-confirmation .actions {
    display: flex;
    justify-content: space-around;
}

.delete-confirmation .btn {
    background-color: #D02D1D;
    padding: 15px;
    border-radius: 5px;
    border: none;
    color: #fff;
    font-size: 15px;
    cursor: pointer;
    transition: background 0.2s;
}

.delete-confirmation .btn:hover {
    background-color: #a04800;
}

.pagination {
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
}

.pagination button {
    padding: 5px 10px;
    background-color: #1e1e1e;
    border: 1px solid #272727;
    border-radius: 5px;
    color: #fff;
    cursor: pointer;
}

.pagination button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

/* Responsive Styles */

/* For screens below 2560px */
@media (max-width: 2560px) {
    .header h1 {
        font-size: 2.5rem;
    }

    .btn {
        font-size: 1.1rem;
    }
}

/* For screens below 1920px */
@media (max-width: 1920px) {
    .header h1 {
        font-size: 2.2rem;
    }

    .btn {
        font-size: 1rem;
    }
}

/* For screens below 1366px */
@media (max-width: 1366px) {
    .header {
        flex-direction: column;
        align-items: flex-start;
    }

    .header-buttons {
        margin-top: 10px;
    }

    .produtos-table,
    .produtos-table th,
    .produtos-table td {
        font-size: 0.9rem;
    }

    .produto-thumb {
        width: 40px;
        height: 40px;
    }
}

/* For screens below 1024px */
@media (max-width: 1024px) {
    .modal-content {
        width: 90%;
    }
}

/* For screens below 768px */
@media (max-width: 768px) {
    .header h1 {
        font-size: 1.8rem;
    }

    .btn {
        font-size: 0.9rem;
        padding: 6px;
    }

    .produtos-table,
    .produtos-table th,
    .produtos-table td {
        font-size: 0.8rem;
    }

    .produto-thumb {
        width: 35px;
        height: 35px;
    }
}

/* For screens below 480px */
@media (max-width: 480px) {
    .header {
        padding: 10px;
    }

    .header h1 {
        font-size: 1.5rem;
    }

    .header-buttons {
        width: 100%;
        justify-content: space-between;
    }

    .excel-options {
        width: 8em;
        right: 0;
    }

    .produtos-table,
    .produtos-table th,
    .produtos-table td {
        font-size: 0.75rem;
    }
}

/* For screens below 375px */
@media (max-width: 375px) {
    .header {
        padding: 8px;
    }

    .header h1 {
        font-size: 1.4rem;
    }

    .btn {
        font-size: 0.75rem;
        padding: 5px;
    }

    .produtos-table,
    .produtos-table th,
    .produtos-table td {
        font-size: 0.7rem;
    }

    .produto-thumb {
        width: 30px;
        height: 30px;
    }
}
</style>