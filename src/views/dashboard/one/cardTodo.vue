<template>
  <div class="card bg-white">
    <div class="card-title bg-teal text-white">
      {{cardTitle}}
      <div class=" float-right">
      </div>
    </div>
    <div class="card-content">
      <div class="flex">
        <div class="list item-inset-delimiter auto">
          <q-infinite-scroll :handler="loadMore" :offset="7">
            <!-- Content, in this case some <p> tags -->
            <div class="item" v-for="(todo, index) in showingData">
              <div class="item-primary">{{index + 1}}</div>
              <div class="item-content has-secondary">
                <span v-show="todo.completed" class="completed-line">{{todo.title}}</span>
                <input v-show="!todo.completed" v-model.lazy="todo.title" class="fit" @change="changeTitle(todo)">
              </div>
              <q-toggle class="item-secondary"
                        icon="done"
                        @input="completeTodo(todo)"
                        v-model="todo.completed"
              ></q-toggle>
            </div>
          </q-infinite-scroll>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  /* eslint-disable */
  import Chart from 'chart.js'

  export default {
    mounted () {
    },
    data () {
      return {
        todos: [],
        actualMaxPosition: 10
      }
    },
    props: ['cardTitle', 'api'],
    watch: {
    },
    computed: {
      showingData () {
        return this.todos.slice(0, this.actualMaxPosition)
      }
    },
    methods: {
      loadMore (index, done) {
        setTimeout(() => {
          this.actualMaxPosition += 9
          done()
        }, 1000)

      },
      completeTodo (todo) {
      },
      changeTitle (todo) {
      }
    }
  }
</script>
<style scoped>
  input {
    padding: 7px 0;
    font-size: 16px;
  }
  .completed-line {
    text-decoration: line-through;
  }
</style>
