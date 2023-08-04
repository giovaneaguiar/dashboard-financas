<template>
    <div class="my-4 mt-10 space-y-4">
      <div class="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
        <div>
          <AppFormLabel>Data da transação</AppFormLabel>
          <AppFormInput v-model="localTransaction.date" type="date"/>
        </div>
  
        <div>
          <AppFormLabel>Valor</AppFormLabel>
          <AppFormInput v-model="localTransaction.amount" type="number"/>
        </div>
  
        <div>
          <AppFormLabel>Descrição</AppFormLabel>
          <AppFormInput v-model="localTransaction.description"/>
        </div>
  
        <div>
          <AppFormLabel>Categoria</AppFormLabel>
          <AppFormSelect v-model="localTransaction.categoryId" :options="categories" />
        </div>
      </div>
  
      <div class="space-x-4 flex items-center justify-end">
        <a href="" class="inline-flex text-gray-700 text-sm" @click.stop.prevent="onCancel()">
          Cancelar
        </a>
  
        <AppButton @click="updateTransaction">
          Editar
        </AppButton>
      </div>
    </div>
  </template>
  
  <script>
  import AppButton from '~/components/Ui/AppButton';
  import AppFormInput from '~/components/Ui/AppFormInput';
  import AppFormLabel from '~/components/Ui/AppFormLabel';
  import AppFormSelect from '~/components/Ui/AppFormSelect';
  
  export default {
    name: 'TransactionEdit',
  
    components: {
      AppButton,
      AppFormInput,
      AppFormLabel,
      AppFormSelect,
    },
  
    props: {
      transaction: {
        type: Object,
        default: () => ({}),
      },
      categories: {
        type: Array,
        default: () => [],
      },
    },
  
    data() {
      return {
        localTransaction: {
          date: '',
          amount: 0,
          description: '',
          categoryId: '',
        },
      };
    },
  
    mounted() {
      // Definir isEditing como true quando o componente é montado
      this.isEditing = true;
  
      // Copiar a transação para localTransaction quando o componente é montado
      this.localTransaction = { ...this.transaction };

      this.localTransaction.categoryId = this.transaction.category.id;
    },
  
    methods: {
      updateTransaction() {
        // Criar um objeto com as informações editadas
        const data = {
          date: this.localTransaction.date,
          description: this.localTransaction.description,
          amount: this.localTransaction.amount,
          categoryId: this.localTransaction.categoryId,
        };
  
        // Enviar as informações editadas ao servidor através do $axios
        this.$axios
          .$put(`transactions/${this.transaction.id}`, data)
          .then((response) => {
            // Se a atualização foi bem-sucedida, emitimos um evento para notificar o componente pai
            // sobre a atualização e também atualizamos a transação local com os novos valores
            this.$emit('after-update', response);
            this.localTransaction = { ...response };
          })
          .catch((error) => {
            console.error('Erro ao atualizar a transação:', error);
          });
      },
  
      onCancel() {
        this.$emit('cancel');
      },
    },
  };
  </script>
  