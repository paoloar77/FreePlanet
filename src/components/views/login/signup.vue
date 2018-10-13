<template>
    <div>
        <!--Prova URL :  {{envHelper('PROVA_PAOLO')}}-->

        <q-input
                v-model="email"
                @blur="$v.form.email.$touch"
                :error="$v.form.email.$error"
                :float-label="getFormSignup.email"
        />
        <q-input
                v-model="form.password"
                @blur="$v.form.password.$touch"
                :error="$v.form.password.$error"
                float-label="Password"
        />

        <q-btn color="primary" @click="submit">Submit</q-btn>
    </div>
</template>

<script>
  import {required, email} from 'vuelidate/lib/validators'

  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        url: process.env.VUE_APP_URL,
        form: {
          email: '',
          username: '',
          dateOfBirth: '',
          password: '',
          terms: false,
        }
      }
    },
    computed:{
      ...mapGetters("glob", [
        'getUsername',
        'getPassword',
        'getEmail',
        'getDateOfBirth',
      ]),
      envHelper(){
        return env
      }
    },
    validations: {
      form: {
        email: {required, email},
        password: {required, minLen: minLength(6)},
        confirmPassword: {
          sameAs: sameAs(vm => {
            return vm.password
          })
        },
        terms: {
          required: requiredUnless(vm => {
            return vm.country === 'germany'
          })
        },

      }
    },
    methods: {
      submit() {
        this.$v.form.$touch();

        if (this.$v.form.$error) {
          this.$q.notify('Please review fields again.')
          return
        }

        const formData = {
          email: this.email,
          username: this.username,
          password: this.password,
          dateOfBirth: this.dateOfBirth,
          confirmPassword: this.confirmPassword,
          terms: this.terms,
        }
        console.log(formData);
        this.$store.dispatch('signup', formData)

        // ...
      }
    }
  }
</script>
