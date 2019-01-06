<template>
    <q-page>
        <div class="panel">
            <p class="caption">Singlecat:</p>

            <q-input v-model="category" inverted float-label="Inserisci la Categoria"
                     :after="[{icon: 'arrow_forward', content: true, handler () {}}]"
                     v-on:keyup.enter="insertCategory"/>

            <ul>
                Lista:

                <SingleCat :itemcat='mycat' v-for="mycat of categories_arr" :key="mycat.id"/>
            </ul>
        </div>
    </q-page>


</template>
<script lang="ts" src="./category.ts">
</script>
