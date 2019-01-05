<template>

    <div class="list no-border platform-delimiter light-paragraph">
        <q-icon name="action"/>
        <template v-for="(parent, index) in links">
            <q-list>
                <div class="list-label cursor-pointer" @click="parent.show = !parent.show">
                    {{replaceUnderlineToSpace(index)}} <div class="menu_freccina"><i aria-hidden="true" class="v-icon material-icons theme--light">keyboard_arrow_down</i></div>
                </div>
                <template v-for="child in parent.routes">
                    <q-slide-transition duration="200">
                        <div v-show="parent.show">
                            <q-item link :to="child.route" exact
                                    class="item item-link drawer-closer cursor-pointer">
                                <i :class="child.faIcon" class="item-primary"></i>
                                <div class="item-content">{{$t(child.name)}}</div>
                            </q-item>
                        </div>
                    </q-slide-transition>
                </template>
            </q-list>
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

    .menu-hr{
        border-color: #dedede;
        height: 0.5px;
    }

    .router-link-active {
        color: #027be3;
        background-color: #dadada !important;
        border-right: 2px solid #027be3;
    }

    .list-label:first-child {
        line-height: 20px;
        padding: 5px;
        margin: 1px;
    }

    /*
    .menu-enter-active, .scale-enter {
        -webkit-animation: moveFromTopFade .5s ease both;
        animation: moveFromTopFade .5s ease both;
    }

    .menu-leave-to, .scale-leave-active {
        -webkit-animation: moveToBottom .5s ease both;
        animation: moveToBottom .5s ease both;
    }
    */

    .router-link-active {
        color: #027be3;
        background-color: #dadada !important;
        border-right: 2px solid #027be3;
    }

    .router-link-active .item-primary {
        color: #027be3;
    }

    .menu_freccina {
        position: absolute;
        right: 10px;
        display: inline-block;
        padding: 0 0px 0px 0px;
        -webkit-transform: rotate(-180deg);
        transform: rotate(-180deg);
    }

</style>
