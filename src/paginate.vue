<template>
    <div ref="el">
        <div v-if="status.LOADING">
            <slot name="spinner" />
        </div>
        <div v-if="status.COMPLETED">
            <slot name="nomore" />
        </div>

    </div>
</template>

<script>
    import { computed, onMounted, onUnmounted, ref, reactive } from 'vue';

    export default {
        name: "v-scroll-paginate",

        props: {
            options: {
                type: Object, default: () => {
                    return {
                        root: null,
                        threshold: 0.85
                    }
                }
            },
            fetch: Function
        },

        setup({ options, fetch }, { emit }) {

            const el = ref(null);

            let status = reactive({
                LOADING: 0,
                COMPLETED: 0
            }), observer = null;

            const reset = () => {
                Object.assign(status, { LOADING: 0, COMPLETED: 0 });
                observer.observe(el.value);
            }

            onMounted(() => {
                observer = new IntersectionObserver(entries => {
                    entries.forEach(entry => {
                        if (entry && entry.isIntersecting) {

                            if (status.COMPLETED) {
                                status.LOADING = 0;
                                observer.unobserve(el.value);
                            }

                            if (status.LOADING) return;

                            status.LOADING = 1;

                            if (typeof fetch === "function") {
                                fetch.call(this, status);
                            }
                            else {
                                emit("fetch", status);
                            }

                        }
                    });
                }, options);

                observer.observe(el.value);

            });

            onUnmounted(() => observer.disconnect());

            return { el, status, reset };

        }
    }

</script>