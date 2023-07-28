export default {


    getCategories(){
        return this.$axios.$get('categories');
    }
}