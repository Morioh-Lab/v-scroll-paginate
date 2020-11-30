import Paginate from './paginate.vue';
export { Paginate };

export default {
    install: function (vm) {
        vm.component(Paginate.name, Paginate);
    }
};
