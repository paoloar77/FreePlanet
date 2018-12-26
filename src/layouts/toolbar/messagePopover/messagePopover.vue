<template>
    <button class="relative-position animate-bounce">
        <i class="fa fa-2x fa-envelope-o"></i>
        <span class="floating label bg-dark">5</span>
        <q-popover self="top right">
            <div class="list striped">
                <p class="caption no-margin text-center text-white bg-teal">Messages from people</p>
                <div class="item item-link two-lines item-delimiter no-margin"
                     v-for="post in filteredPosts"
                >
                    <img class="item-primary" :src="randomAvatarUrl()">
                    <div class="item-content has-secondary">
                        <div>{{post.title}}</div>
                        <div>{{randomDate()}}</div>
                    </div>
                    <span class="label bg-red text-white item-secondary no-margin">
            <i class="left-detail"></i> New
          </span>
                </div>
            </div>
        </q-popover>
    </button>
</template>

<script lang="ts" src="./messagePopover.ts">
</script>
