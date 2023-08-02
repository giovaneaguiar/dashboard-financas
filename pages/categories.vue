<template>
  <div>
    <div class="flex items-center justify-between">
      <h1 class="font-bold text-2xl">
        Categorias
      </h1>
    </div>

    <div class="mt-6">
      <div>
        <div class="flex items-center space-x-3">
          <div>
            <AppFormInput v-model="name" @keyup.enter="addCategory"/>
          </div>

          <AppButton @click="addCategory">
            Adicionar
          </AppButton>
        </div>
      </div>

      <table class="mt-4 min-w-full divide-y divide-gray-200 shadow">
        <thead class="bg-gray-50">
          <tr>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Categoria
            </th>
            <th
              scope="col"
              class="relative px-6 py-3"
            >
              <span class="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="category in categories" :key="category.id" class="bg-white">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              <template v-if="editingCategory && editingCategory.id === category.id">
                <!-- Edição -->
                <div class="w-72">
                  <AppFormInput v-model="editingCategory.name" @keyup.enter="updateCategory(editingCategory)" />
                </div>
              </template>
              <template v-else>
                <!-- Exibição -->
                {{ category.name }}
              </template>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-4">
              <template v-if="editingCategory && editingCategory.id === category.id">
                <!-- Ações de edição -->
                <a href="#" class="text-indigo-600 hover:text-indigo-900" @click.stop.prevent="cancelEdit">Cancelar</a>
                <a href="#" class="text-green-600 hover:text-green-900" @click.stop.prevent="updateCategory(editingCategory)">Salvar</a>
              </template>
              <template v-else>
                <!-- Ações de exibição -->
                <a href="#" class="text-indigo-600 hover:text-indigo-900" @click.stop.prevent="toUpdate(category)">Editar</a>
                <a href="#" class="text-red-600 hover:text-red-900" @click.stop.prevent="deleteCategory(category.id)">Excluir</a>
              </template>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import AppButton from '~/components/Ui/AppButton';
import AppFormInput from '~/components/Ui/AppFormInput';
import AppFormLabel from '~/components/Ui/AppFormLabel';

export default {
  name: 'categoriesPage',

  components: {
    AppButton,
    AppFormInput,
    AppFormLabel,
  },

  async asyncData({ store }) {
    return {
      categories: await store.dispatch('categories/getCategories').then(response =>
        response.map(o => ({ ...o, is_updating: false }))
      ),
      editingCategory: null, // Nova variável para guardar a categoria em edição
    };
  },

  data() {
    return {
      name: '', // Variável para armazenar o nome da nova categoria
    };
  },

  methods: {
    async deleteCategory(id) {
      await this.$axios.$delete(`categories/${id}`).then(() => {
        const idx = this.categories.findIndex(o => o.id === id);
        this.categories.splice(idx, 1);
      });
    },

    async addCategory() {
      if (!this.name) return;
      const data = {
        name: this.name,
      };
      await this.$axios.$post('categories', data).then((response) => {
        this.categories.push(response);
      });
      this.name = ''; // Limpar o campo após adicionar a categoria
    },

    toUpdate(category) {
      // Ao iniciar a edição, copiar a categoria para a variável editingCategory
      this.editingCategory = { ...category };
    },

    cancelEdit() {
      // Ao cancelar a edição, limpar a variável editingCategory
      this.editingCategory = null;
    },

    async updateCategory(category) {
  const data = {
    name: category.name,
  };

  try {
    await this.$axios.$patch(`categories/${category.id}`, data);
    category.is_updating = false;

    // Atualizar o nome da categoria na lista local após a requisição
    const index = this.categories.findIndex((item) => item.id === category.id);
    if (index !== -1) {
      this.categories[index].name = category.name;
    }

    this.editingCategory = null; // Ao salvar a edição, limpar a variável editingCategory
  } catch (error) {
    console.error('Erro ao atualizar categoria:', error);
  }
},

  },
};
</script>
