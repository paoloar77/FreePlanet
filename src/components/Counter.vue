<template>
    <div>
        <h3>TS Counter</h3>
        <div>{{count}}</div>
        <div>
            <button @click="increment()">INCREMENT</button>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'

    @Component
    export default class Counter extends Vue {
        count = 0;
        increment() { this.count++ }
    }
</script>
