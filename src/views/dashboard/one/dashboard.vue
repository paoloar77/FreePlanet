<template>

  <div class="layout-padding ">
    <div class="flex wrap gutter">
      <div class="width-1of3 sm-auto">
        <cardTotal
          title="Total Posts"
          background-color="bg-teal-9"
          icon-name="local_post_office"
          :total="totalPosts">
        </cardTotal>
      </div>
      <div class="width-1of3 sm-auto">
        <cardTotal
          title="Total comments"
          background-color="bg-teal-7"
          icon-name="comment"
          :total="totalComments">
        </cardTotal>
      </div>
      <div class="width-1of3 sm-auto">
        <cardTotal
          title="Static total"
          background-color="bg-teal-5"
          icon-name="repeat_one"
          :total="50004">
        </cardTotal>
      </div>
    </div>
    <div class="flex wrap gutter">
      <div class="width-1of2 lg-width-1of3 sm-auto">
        <card-chart
          card-title="Total Graph"
          :data="dataForGraph"
        ></card-chart>
      </div>
      <div class="auto">
        <knob-statistics
          card-title="General statistics">
        </knob-statistics>
      </div>
    </div>
    <div class="flex wrap gutter">
      <div class="width-4of5 sm-width-1of1">
        <card-todo
          card-title="Generic todos"
          api="todos">
        </card-todo>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  import cardChart from './cardChart.vue'
  import cardTotal from './cardTotal.vue'
  import cardTodo from './cardTodo.vue'
  import knobStatistics from './knobStatistics.vue'
  import { mapActions } from 'vuex'
  import * as types from '../../../store/mutation-types'
  export default {
    mounted () {
      // Axios.all not working
    },
    data () {
      return {
        totalPosts: 0,
        totalComments: 0,
        totalTodos: 0
      }
    },
    computed: {
      dataForGraph () {
        return {
          posts: this.totalPosts,
          todos: this.totalTodos,
          comments: this.totalComments
        }
      }
    },
    methods: {
      ...mapActions("glob", {'setPosts': types.SET_POSTS})
    },
    components: {
      cardTotal,
      cardChart,
      cardTodo,
      knobStatistics
    }
  }
</script>
<style></style>
