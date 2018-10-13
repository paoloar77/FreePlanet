<template>
    <div id="signup" class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-content">
            <button class="modal-close is-large" aria-label="close" @click="$emit('close')"></button>
            <transition name="signup">
                <div class="signup-form">
                    <form @submit.prevent="validateBeforeSubmit">
                        <label class="title">Registrazione</label>
                        <div class="column is-12">
                            <label class="label">{{ $t("message.Email") }}</label>
                            <p class="control has-icon has-icon-right">
                                <input name="email" v-model="email" v-validate="'required|email'"
                                       :class="{'input': true, 'is-danger': ('email') }" type="text"
                                       placeholder="Email">
                                <i v-show="('email')" class="fa fa-warning"></i>
                                <span v-show="('email')"
                                      class="help is-danger">{{ ('email') }}</span>
                            </p>
                        </div>
                        <div class="column is-12">
                            <label class="label">{{ $t("message.Name") }}</label>
                            <p class="control has-icon has-icon-right">
                                <input name="name" v-model="name" v-validate="{required: true, minLength: 5}"
                                       :class="{'input': true, 'is-danger': ('name') }" type="text"
                                       v-bind:placeholder="$t('message.Name')">
                                <i v-show="('name')" class="fa fa-warning"></i>
                                <span v-show="('name')"
                                      class="help is-danger">{{ ('name') }}</span>
                            </p>
                        </div>
                        <div class="column is-12">
                            <label class="label">{{ $t("message.Surname") }}</label>
                            <p class="control has-icon has-icon-right">
                                <input name="surname" v-model="surname" v-validate="'required|alpha'"
                                       :class="{'input': true, 'is-danger': ('surname') }" type="text"
                                       v-bind:placeholder="$t('message.Surname')">
                                <i v-show="('surname')" class="fa fa-warning"></i>
                                <span v-show="('surname')"
                                      class="help is-danger">{{ ('surname') }}</span>
                            </p>
                        </div>
                        <div class="column is-12">
                            <label class="label">{{ $t("message.username") }}</label>
                            <p class="control has-icon has-icon-right">
                                <input name="name" v-model="username" v-validate="'required|alpha'"
                                       :class="{'input': true, 'is-danger': ('username') }" type="text"
                                       v-bind:placeholder="$t('message.username')">
                                <i v-show="('surname')" class="fa fa-warning"></i>
                                <span v-show="('username')"
                                      class="help is-danger">{{ ('username') }}</span>
                            </p>
                        </div>
                        <div class="column is-12">
                            <label class="label">{{ $t("message.password") }}</label>
                            <p class="control has-icon has-icon-right">
                                <input name="name" v-model="password" v-validate="'required|alpha'"
                                       :class="{'input': true, 'is-danger': ('password') }" type="password"
                                       v-bind:placeholder="$t('message.password')">
                                <i v-show="('password')" class="fa fa-warning"></i>
                                <span v-show="('password')"
                                      class="help is-danger">{{ ('password') }}</span>
                            </p>
                        </div>
                        <div class="column is-12">
                            <label class="label">{{ $t("message.repeatpassword") }}</label>
                            <p class="control has-icon has-icon-right">
                                <input name="name" v-model="repeatpassword" v-validate="'required|confirmed:password'"
                                       :class="{'input': true, 'is-danger': ('repeatpassword') }" type="password"
                                       v-bind:placeholder="$t('message.repeatpassword')">
                                <i v-show="('repeatpassword')" class="fa fa-warning"></i>
                                <span v-show="('repeatpassword')"
                                      class="help is-danger">{{ ('repeatpassword') }}</span>
                            </p>
                        </div>
                        <div class="column is-12">
                            <label class="label">{{ $t("message.Phone") }}</label>
                            <p class="control has-icon has-icon-right">
                                <input name="phone" v-model="phone" v-validate="'required|numeric'"
                                       :class="{'input': true, 'is-danger': ('phone') }" type="text"
                                       placeholder="Phone">
                                <i v-show="('phone')" class="fa fa-warning"></i>
                                <span v-show="('phone')"
                                      class="help is-danger">{{ ('phone') }}</span>
                            </p>
                        </div>
                        <div class="column is-12">
                            <p class="control">
                                <button class="button is-primary submit" type="submit">Submit</button>
                            </p>
                        </div>
                    </form>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
  //import axios from '../../axios-auth';

  export default {

    name: 'registrazione',
    data() {
      return {
        email: '',
        name: '',
        surname: '',
        username: '',
        password: '',
        repeatpassword: '',
        phone: '',
        url: '',
        terms: false,
        myshowModal: this.$store.state.myshowModal
      }
    },
    methods: {
      validateBeforeSubmit() {
        this.$validator.validateAll().then((result) => {
          if (result) {
            // eslint-disable-next-line
            alert('Form Submitted!');
            return;
          }

          alert($t("message.CorrectErrors"));
        });
      },
      onSubmit() {
        const formData = {
          email: this.email,
          age: this.age,
          password: this.password,
          confirmPassword: this.confirmPassword,
          country: this.country,
          terms: this.terms
        }
        console.log(formData);
        var miaurl = '/signupNewUser?key=AIzaSyCXlVPPWknVGhfc60mt7Jkv0Xzrho7_mwc';
        miaurl = '/signupNewUser';

        /*
        axios.post(miaurl, {
          email: formData.email,
          password: formData.password,
          returnSecureToken: true
        })
          .then(res => console.log(res))
          .catch(error => console.log(error))
          */
      }

    }
  }
</script>

<style scoped>

    p{
        margin-bottom: 5px;
    }

    .column{
        padding : .25rem;
    }
    .title{
        color:blue;

    }
    .signup-form{
        margin-top: 5px;
        margin-bottom: 5px;
        padding: 10px;
    }
    .input label {
        display: block;
        color: #4e4e4e;
    }

    .input.inline label {
        display: inline;
    }

    .input input {
        font: inherit;
        width: 100%;
        padding: 6px 12px;
        box-sizing: border-box;
        border: 1px solid #ccc;
    }

    .input.inline input {
        width: auto;
    }

    .input input:focus {
        outline: none;
        border: 1px solid #521751;
        background-color: #eee;
    }

    .input select {
        border: 1px solid #ccc;
        font: inherit;
    }

    .submit{
        font-size: 20px;

    }
    .submit button {
        border: 1px solid #521751;
        color: #521751;
        padding: 10px 20px;
        font: inherit;
        cursor: pointer;
    }

    .submit button:hover,
    .submit button:active {
        background-color: #521751;
        color: white;
    }

    .submit button[disabled],
    .submit button[disabled]:hover,
    .submit button[disabled]:active {
        border: 1px solid #ccc;
        background-color: transparent;
        color: #ccc;
        cursor: not-allowed;
    }
</style>
