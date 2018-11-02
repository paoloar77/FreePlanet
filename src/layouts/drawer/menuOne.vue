<template>
    <div class="list no-border platform-delimiter light-paragraph">
        <q-icon name="action"/>
        <template v-for="(parent, index) in links">
            <q-list>
                <div class="list-label cursor-pointer" @click="parent.show = !parent.show">
                    {{replaceUnderlineToSpace(index)}}
                </div>
                <template v-for="child in parent.routes">
                    <transition name="menu">
                        <div v-show="parent.show">
                                <q-item link :to="child.route" exact class="item item-link drawer-closer cursor-pointer">
                                    <i :class="child.faIcon" class="item-primary"></i>
                                    <div class="item-content">{{child.name}}</div>
                                </q-item>
                        </div>
                    </transition>
                </template>
            </q-list>
            <hr>
        </template>
    </div>
</template>

<script>
  export default {
    props: ['links'],
    watch: {
      '$route.path'() {
        Object.keys(this.links).forEach(parentName => {
          this.setParentVisibilityBasedOnRoute(this.links[parentName])
        })
      }
    },
    computed: {
      currentRoutePath() {
        return this.$route.path
      }
    },
    methods: {
      created() {
        console.log("MENUONE CREATED!");
      },
      setParentVisibilityBasedOnRoute(parent) {
        parent.routes.forEach(item => {
          if (this.$route.path === item.route) {
            parent.show = true
            return
          }
        })
      },
      replaceUnderlineToSpace(text) {
        while (text.indexOf('_') !== -1) {
          text = text.replace('_', ' ')
        }
        return text
      }
    }
  }
</script>
<style scoped>

    .router-link-active {
        color: #027be3;
        background-color: #dadada !important;
        border-right: 2px solid #027be3;
    }

    .list-label:first-child {
        line-height: 20px;
        padding:5px;
        margin:1px;
    }

    .menu-enter-active, .scale-enter {
        -webkit-animation: moveFromLeftFade .2s ease both;
        animation: moveFromLeftFade .2s ease both;
    }

    .menu-leave-to, .scale-leave-active {
        -webkit-animation: moveToLeft .2s ease both;
        animation: moveToLeft .2s ease both;
    }

    .router-link-active {
        color: #027be3;
        background-color: #dadada !important;
        border-right: 2px solid #027be3;
    }

    .router-link-active .item-primary {
        color: #027be3;
    }
</style>
