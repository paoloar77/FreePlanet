<template >
    <q-page padding class="signup">
        <div class="text-center">
            <p>
                <logo></logo>
            </p>
        </div>

        <!--Prova URL :  {{env('PROVA_PAOLO')}}-->

        <q-field
                :error="$v.signup.email.$error"
                :error-label="`${errorMsg('email', $v.signup.email)}`"
        >
            <q-input
                    v-model="signup.email"
                    @change="val => { signup.email = val }"
                    :before="[{icon: 'mail', handler () {}}]"
                    @blur="$v.signup.email.$touch"
                    :error="$v.signup.email.$error"
                    :float-label="$t('reg.email')"></q-input>
        </q-field>


        <q-field
                :error="$v.signup.username.$error"
                :error-label="`${errorMsg('username', $v.signup.username)}`"
        >
            <q-input
                    v-model="signup.username"
                    @change="val => { signup.username = val }"
                    :before="[{icon: 'person', handler () {}}]"
                    @blur="$v.signup.username.$touch"
                    :error="$v.signup.username.$error"
                    :float-label="$t('reg.username')"></q-input>
        </q-field>


        <q-field
                :error="$v.signup.password.$error"
                :error-label="`${errorMsg('password', $v.signup.password)}`"
        >
            <q-input
                    v-model="signup.password"
                    type="password"
                    :before="[{icon: 'vpn_key', handler () {}}]"
                    @blur="$v.signup.password.$touch"
                    :error="$v.signup.password.$error"
                    :float-label="$t('reg.password')"></q-input>
        </q-field>

        <q-field
                :error="$v.signup.repeatPassword.$error"
                :error-label="`${errorMsg('repeatpassword', $v.signup.repeatPassword)}`"
        >
            <q-input
                    v-model="signup.repeatPassword"
                    type="password"
                    :before="[{icon: 'vpn_key', handler () {}}]"
                    @blur="$v.signup.repeatPassword.$touch"
                    :error="$v.signup.repeatPassword.$error"
                    :float-label="$t('reg.repeatPassword')"></q-input>
        </q-field>

        <q-field
                :error="$v.signup.terms.$error"
                :error-label="`${errorMsg('terms', $v.signup.terms)}`"
        >

            <q-checkbox
                    v-model="signup.terms"
                    :before="[{icon: 'vpn_key', handler () {}}]"
                    color="secondary"
                    @blur="$v.signup.terms.$touch"
                    :error="$v.signup.terms.$error"
                    :float-label="$t('reg.terms')"
                    :label="$t('reg.terms')"></q-checkbox>
        </q-field>

        <br>

        <q-btn rounded size="lg" color="primary" @click="submitOk" :disabled='!allowSubmit'>{{$t('reg.submit')}}
        </q-btn>

        <!--

                <div align="center">
            <q-btn rounded size="lg" color="primary" @click="submitOk" :disable="">{{$t('reg.submit')}}
            </q-btn>
        </div>

        -->

    </q-page>

</template>

<script lang="ts" src="./signup.ts">
</script>
<style lang="scss" scoped>
    @import './signup.scss';
</style>
