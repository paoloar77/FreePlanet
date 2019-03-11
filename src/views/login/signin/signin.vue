<template>
    <div>
        <q-page padding class="signin">
            <div class="text-center">
                <p>
                    <logo></logo>
                </p>
            </div>

            <!--Prova URL :  {{env('PROVA_PAOLO')}}-->
            <form>

                <q-field
                        :error="$v.signin.username.$error"
                        :error-label="`${errorMsg('username', $v.signin.username)}`"
                >
                    <q-input
                            v-model="signin.username"
                            autocomplete="username"
                            @change="val => { signin.username = val }"
                            :before="[{icon: 'person', handler () {}}]"
                            @blur="$v.signin.username.$touch"
                            :error="$v.signin.username.$error"
                            :float-label="$t('reg.username_login')"></q-input>
                </q-field>

                <q-field
                        :error="$v.signin.password.$error"
                        :error-label="`${errorMsg('password', $v.signin.password)}`"
                >
                    <q-input
                            v-model="signin.password"
                            type="password"
                            :before="[{icon: 'vpn_key', handler () {}}]"
                            @blur="$v.signin.password.$touch"
                            :error="$v.signin.password.$error"
                            :float-label="$t('reg.password')"></q-input>
                </q-field>

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
                    <q-btn rounded size="lg" color="primary" @click="submit" :disable="$v.$error || iswaitingforRes">{{$t('login.enter')}}
                    </q-btn>
                </div>
            </form>
        </q-page>
    </div>
</template>

<script lang="ts" src="./signin.ts">
</script>

<style lang="scss" scoped>
    @import './signin.scss';
</style>
