# An infinite scroll paginate plugin for Vue 3.0

### NPM

```
npm install v-scroll-paginate
```

### Yarn

```
yarn install v-scroll-paginate
```

Usage
--

```js
import { createApp } from 'vue';

import Paginate from 'v-scroll-paginate';

const app = createApp(App);

app.use(Paginate);

app.mount('#app');
```

```html

<v-scroll-paginate :fetch="fetch">
        <template #spinner>
            Loading...
        </template>
        <template #nomore>
            No more data
        </template>
</v-scroll-paginate>

<script>
    import { mapState, useStore } from "vuex";
    import { onMounted, computed } from 'vue';

    export default {       

        setup() {

            const store = useStore();

            const data = computed(() => {
                return store.state.post.data
            });            

            const fetch = (status) => {
                store.dispatch('post/fetch', { offset: data.value.offset }).then(res => {
                    if (!res.hasNextPage)
                        status.COMPLETED = 1;
                    else
                        status.LOADING = 0;
                })
            }

            return { data, fetch }

        }
    }
</script>

```


Most websites now we are using Bootstrap, Material or Spinners FontAwesome and it's available so we do not want to throw this library added to it less and flexible.
```html
<v-scroll-paginate :fetch="fetch">
        <template #spinner>
            <div class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
        </template>       
</v-scroll-paginate>
```



Contributing
------------

Please refer to each project's style and contribution guidelines for submitting patches and additions. In general, we follow the "fork-and-pull" Git workflow.

 1. **Fork** the repo on GitHub
 2. **Clone** the project to your own machine
 3. **Commit** changes to your own branch
 4. **Push** your work back up to your fork
 5. Submit a **Pull request** so that we can review your changes

NOTE: Be sure to merge the latest from "upstream" before making a pull request!

Community
------------
Stay up to date on the development of Morioh UI and reach out to the community with these helpful resources.

Follow [@codek_tv](https://twitter.com/codek_tv) and [@im_a_developer](https://twitter.com/im_a_developer) on Twitter.

Follow [Morioh](https://www.facebook.com/moriohdotcom) and [Vue Developers](https://www.facebook.com/VueDevelopers) on FaceBook.

Join the official [Discord](https://discord.gg/sqxU6un) room: [https://discord.gg/sqxU6un](https://discord.gg/sqxU6un).