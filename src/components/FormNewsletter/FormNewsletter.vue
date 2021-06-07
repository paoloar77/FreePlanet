<template>
    <div>
        <div class="q-pa-md q-gutter-sm text-white">
            <p class="news_title">{{$t('newsletter.title')}}</p>
            <q-form
                    @submit="onSubmit"
                    @reset="onReset"
                    class="q-gutter-md"
            >
                <q-input
                        filled
                        name="firstName"
                        dense
                        dark standout
                        v-model="name"
                        :label="$t('newsletter.name') + `*`"
                        :hint="$t('newsletter.namehint')"
                        lazy-rules
                        :rules="[ val => val && val.length > 0 || $t('newsletter.typesomething')]">

                </q-input>

                <q-input
                        filled
                        dense
                        dark standout
                        v-model="surname"
                        name="lastName"
                        :label="$t('newsletter.surname') + `*`"
                        :hint="$t('newsletter.surnamehint')"
                        lazy-rules
                        :rules="[ val => val && val.length > 0 || $t('newsletter.typesomething')]">

                </q-input>

                <q-input
                        filled
                        dense
                        dark standout
                        v-model="email"
                        :label="$t('newsletter.email') + `*`"
                        lazy-rules
                        :rules="[ val => val && val.length > 6 || $t('newsletter.typesomething')]">

                </q-input>

                <router-link to="/policy" custom v-slot="{ navigate }">
                  <span class="news_link" @click="navigate" @keypress.enter="navigate" role="link">{{$t('privacy_policy')}}</span></router-link>

                <q-toggle dark v-model="accept" :label="$t('newsletter.acceptlicense')"/>

                <div>
                    <q-btn :label="$t('newsletter.submit')" type="submit" color="primary"/>
                    <q-btn :label="$t('newsletter.reset')" type="reset" color="primary" flat class="q-ml-sm"/>
                </div>
            </q-form>
        </div>
    </div>
</template>

<script lang="ts" src="./FormNewsletter.ts">
</script>

<style lang="scss" scoped>
    @import './FormNewsletter.scss';
</style>

