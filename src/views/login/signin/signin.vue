<template>
    <div>
        <q-page padding class="signin">
            <div class="text-center">
                <p>
                    <!--<img src="../../../assets/quasar-logo-full.svg">-->
                    <img :src="`../../../assets/${logoimg()}`">
                </p>
            </div>

            <!--Prova URL :  {{env('PROVA_PAOLO')}}-->

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
                        :float-label="$t('reg.username')"
                />
            </q-field>

            <q-field
                    :error="$v.signin.password.$error"
                    :error-label="`${errorMsg('password', $v.signin.password)}`"
            >
                <q-input
                        v-model="signin.password"
                        :before="[{icon: 'vpn_key', handler () {}}]"
                        @blur="$v.signin.password.$touch"
                        :error="$v.signin.password.$error"
                        :float-label="$t('reg.password')"
                />
            </q-field>

            <div>
                <a :href="getlinkforgetpwd">{{$t('reg.forgetpassword')}}</a>
            </div>

            <br>

            <div align="center">
                <q-btn rounded size="lg" color="primary" @click="submit" :disable="$v.$error">{{$t('login.enter')}}
                </q-btn>
            </div>
        </q-page>
    </div>
</template>

<script lang="ts" src="./signin.ts">
</script>
