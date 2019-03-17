<template>
    <q-page padding class="signup">
        <div class="text-center">
            <p>
                <logo></logo>
            </p>
        </div>

        <!--Prova URL :  {{env('PROVA_PAOLO')}}-->

        <div class="q-gutter-xs">
            <q-input
                    v-model="signup.email"
                    rounded outlined
                    @blur="$v.signup.email.$touch"
                    :error="$v.signup.email.$error"
                    :error-message="errorMsg('email', $v.signup.email)"
                    bottom-slots
                    debounce="1000"
                    :label="$t('reg.email')">

                <template v-slot:prepend>
                    <q-icon name="email"/>
                </template>

            </q-input>

            <q-input
                    v-model="signup.username"
                    rounded outlined
                    @blur="$v.signup.username.$touch"
                    :error="$v.signup.username.$error"
                    bottom-slots
                    debounce="1000"
                    :error-message="errorMsg('username', $v.signup.username)"
                    :label="$t('reg.username')">

                <template v-slot:prepend>
                    <q-icon name="person"/>
                </template>

            </q-input>

            <q-input
                    v-model="signup.password"
                    type="password"
                    rounded outlined
                    @blur="$v.signup.password.$touch"
                    :error="$v.signup.password.$error"
                    :error-message="`${errorMsg('password', $v.signup.password)}`"
                    bottom-slots
                    :label="$t('reg.password')">

                <template v-slot:prepend>
                    <q-icon name="vpn_key"/>
                </template>

            </q-input>

            <q-input
                    v-model="signup.repeatPassword"
                    type="password"
                    rounded outlined
                    @blur="$v.signup.repeatPassword.$touch"
                    :error="$v.signup.repeatPassword.$error"
                    :error-message="`${errorMsg('repeatpassword', $v.signup.repeatPassword)}`"
                    bottom-slots
                    :label="$t('reg.repeatPassword')">

                <template v-slot:prepend>
                    <q-icon name="vpn_key"/>
                </template>

            </q-input>

            <!--:hint="$t('reg.tips.repeatpassword')"-->

            <q-checkbox
                    v-model="signup.terms"
                    color="secondary"
                    @blur="$v.signup.terms.$touch"
                    :error="$v.signup.terms.$error"
                    :error-message="`${errorMsg('terms', $v.signup.terms)}`"
                    :label="$t('reg.terms')">

            </q-checkbox>
            <br>

            <div class="wrapper">
                <q-btn rounded size="lg" color="positive" @click="submitOk" :disabled='!allowSubmit'>
                    {{$t('reg.submit')}}
                </q-btn>
            </div>
        </div>

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
