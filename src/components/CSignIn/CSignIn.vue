<template>
    <div>
        <div class="text-center">
            <p>
                <logo></logo>
            </p>
        </div>

        <!--Prova URL :  {{env('PROVA_PAOLO')}}-->
        <form>
            <div class="q-gutter-xs">

                <q-input
                        v-model="signin.username"
                        rounded outlined
                        @blur="$v.signin.username.$touch"
                        :error="$v.signin.username.$error"
                        :error-message="`${errorMsg('username', $v.signin.username)}`"
                        :label="$t('reg.username_login')">


                    <template v-slot:prepend>
                        <q-icon name="person"/>
                    </template>

                </q-input>
                <q-input
                        v-model="signin.password"
                        type="password"
                        rounded outlined
                        @blur="$v.signin.password.$touch"
                        :error="$v.signin.password.$error"
                        :error-message="`${errorMsg('password', $v.signin.password)}`"
                        :label="$t('reg.password')">
                    <template v-slot:prepend>
                        <q-icon name="vpn_key"/>
                    </template>

                </q-input>
                <div>
                    <a :href="getlinkforgetpwd">{{$t('reg.forgetpassword')}}</a>
                </div>

                <br>

                <q-card class="flex flex-center">
                    <!--<q-btn v-if="$myconfig.socialLogin.facebook" :loading="loading" class="q-mb-md q-mr-md" rounded icon="fab fa-facebook-f" size="sm" color="blue-10" text-color="white" @click="facebook" :label="$t('components.authentication.login.facebook')"/>-->
                    <!--
                    <q-btn v-if="$myconfig.socialLogin.facebook" class="q-mb-md q-mr-md" rounded icon="fab fa-facebook-f" size="sm" color="blue-10" text-color="white" @click="facebook" :label="$t('components.authentication.login.facebook')"/>
                    <q-btn v-if="$myconfig.socialLogin.google" class="q-mb-md q-mr-md" rounded icon="fab fa-google" size="sm" color="deep-orange-14" text-color="white" @click="google" :label="$t('components.authentication.login.google')"/>
                    -->
                </q-card>

                <div align="center">
                    <q-btn rounded size="lg" color="primary" @click="submit"
                           :disable="$v.$error || iswaitingforRes">{{$t('login.enter')}}
                    </q-btn>
                </div>
            </div>
        </form>
    </div>
</template>

<script lang="ts" src="./CSignIn.ts">
</script>

<style lang="scss" scoped>
    @import './CSignIn.scss';
</style>
