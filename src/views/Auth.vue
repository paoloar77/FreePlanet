<template lang="html">
  <div id="firebaseui-auth-container"></div>
</template>

<script lang="ts" >
  import Vue from 'vue'
export default Vue.extend({
    name: 'auth',
    mounted () {
      var uiConfig = {
        signInSuccessUrl: '/success',
        signInOptions: [
          //firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          //firebase.auth.EmailAuthProvider.PROVIDER_ID
        ]
      }
      //var ui = new firebaseui.auth.AuthUI(firebase.auth())
      //ui.start('#firebaseui-auth-container', uiConfig)
    }
  })
</script>

<style lang="css">

</style>
