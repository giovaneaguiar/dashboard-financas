<template>
  <div>
    <div class="flex items-center justify-between">
      <h1 class="font-bold text-2xl">
        Transações
      </h1>

      <AppButton @click="isAdding = !isAdding">
        Nova transação
      </AppButton>
    </div>

    <TransactionAdd
      v-if="isAdding"
      @after-add="afterAdd"
      @cancel="isAdding = false"
    />

    <div class="mt-6 pb-6 flex items-center space-x-4 border-b border-gray-300">
      <div>
        <AppFormLabel>Descrição</AppFormLabel>
        <AppFormInput />
      </div>

      <div>
        <AppFormLabel>Categoria</AppFormLabel>
        <AppFormSelect :options="[{ name: 'Licença de softwares', id: 1 }]" />
      </div>
    </div>

    <div class="mt-4">
      <div class="space-y-8">
        <div
          v-for="(group, index) in transactionGrouped"
          :key="index"
        >
          <div class="mb-1">
            <div class="font-bold text-sm">
              {{ formatDate(index) }}
            </div>
          </div>

          <div class="space-y-3">
            <Transaction  v-for="transaction in group"
              :key="transaction.id"
              :transaction="transaction"
              @update="onTransactionUpdated"
              :categories="categories"
              />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppButton from '~/components/Ui/AppButton';
import AppFormInput from '~/components/Ui/AppFormInput';
import AppFormLabel from '~/components/Ui/AppFormLabel';
import AppFormSelect from '~/components/Ui/AppFormSelect';
import TransactionAdd from '~/components/Transaction/TransactionAdd';
import Transaction from '~/components/Transaction/Transaction';
import { groupBy, orderBy } from 'lodash';
import dayjs from 'dayjs';

export default {
  name: 'IndexPage',

  components: {
    AppButton,
    AppFormInput,
    AppFormLabel,
    AppFormSelect,
    TransactionAdd,
    Transaction
  },

  data() {
    return {
      isAdding: false,
      transactions: [],
      categories: [],
    }
  },

  mounted() {
    this.getTransactions();
  },
  computed: {
    transactionGrouped(){
      return groupBy(orderBy(this.transactions, 'date', 'desc'), 'date');
    },
    formatDate() {
      return (date) => date ? dayjs(date).format('DD/MM/YYYY') : '';
    },
  },
  methods: {
    async getTransactions(){
          try {
          const response = await this.$axios.$get('transactions?_expand=category');
          this.transactions = response;
          } catch (error) {
            console.error('Error get transactions:', error);
          }
        },

        afterAdd(transaction){
          this.transactions.push(transaction);

        },

          onTransactionUpdated(transaction) {
          // Encontrar a transação atualizada na lista de transações e substituir seus dados
          const idx = this.transactions.findIndex(o => o.id === transaction.id);
          this.transactions.splice(idx, 1, transaction);

       },
      },

    };

  
</script>