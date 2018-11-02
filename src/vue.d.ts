declare module "*.vue" {
    import Vue from "vue"
    export default Vue
}

/* Now when you're importing components from a page, for example:
<script lang="ts">
import Vue from 'vue'
import TestComponent from '../components/test-component.vue'
export default Vue.extend({
  components: {
    'test-component': TestComponent
  }
})
</script>
*/
