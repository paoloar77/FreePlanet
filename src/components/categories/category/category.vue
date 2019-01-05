<template>
    <q-page>
        <div class="panel">
            <p class="caption">Category:</p>

            <q-input v-model="category" inverted float-label="Inserisci la Categoria"
                     :after="[{icon: 'arrow_forward', content: true, handler () {}}]"
                     v-on:keyup.enter="insertCategory"/>

        </div>
    </q-page>


</template>
<script lang="ts" src="./category.ts">
</script>
