<template>
    <div class="px-5 py-6 bg-white rounded-lg shadow">
      <div class="flex items-center">
        <div class="flex items-center space-x-5">
          <div>
            <div>
              <div class="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                {{ transaction.category.name }}
              </div>
            </div>
  
            <div class="mt-1.5">
              {{ transaction.description }}
            </div>
          </div>
        </div>
  
        <div class="flex items-center space-x-4 ml-auto">
          <div class="flex items-center">
            <svg v-if="transaction.amount < 0" class="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path></svg>

            <svg v-if="transaction.amount > 0" class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
  
            <div class="font-bold">
              {{ new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL', signDisplay:'never' }).format(transaction.amount) }}
            </div>
          </div>
  
          <button @click="isUpdating = !isUpdating">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
          </button>
        </div>
      </div>
  
      <TransactionEdit 
        v-if="isUpdating"
        :transaction="transaction"
        :categories="categories"
        @update="afterUpdate"
        @cancel="isUpdating = false"
        
        />
    </div>
  </template>
  
  <script>
  import TransactionEdit from '~/components/Transaction/TransactionEdit';
  import AppButton from '~/components/Ui/AppButton';
  import AppFormInput from '~/components/Ui/AppFormInput';
  import AppFormLabel from '~/components/Ui/AppFormLabel';
  import AppFormSelect from '~/components/Ui/AppFormSelect';
  
  export default {
    name: 'Transaction',
  
    components: {
      TransactionEdit,
      AppButton,
      AppFormInput,
      AppFormLabel,
      AppFormSelect
    },
  
    props: {
      transaction: {
        type: Object,
        default: () => ({}),
      },

    },

    mounted() {
    this.getTransactions(); // Chamar a função para buscar as transações
    this.getCategories(); // Chamar a função para buscar as categorias
    },
  
    data() {
      return {
        isUpdating: false,
      };
    },
  
    methods: {
      async getTransactions() {
          try {
          const response = await this.$axios.$get('transactions?_expand=category');
          this.transactions = response;
          } catch (error) {
            console.error('Error get transactions:', error);
          }
      },

      afterAdd(transaction) {
        this.transactions.push(transaction);
      },

      async getCategories() {
        try {
          const response = await this.$axios.$get('categories');
          this.categories = response;
        } catch (error) {
          console.error('Erro ao buscar categorias:', error);
        }
      },

    // Método para lidar com o evento "after-update" emitido pelo componente TransactionEdit
      afterUpdate(updatedTransaction) {
        // Encontrar a transação atualizada na lista de transações e substituir seus dados
        this.$emit('update', updatedTransaction);
      },
    },
  };
  </script>