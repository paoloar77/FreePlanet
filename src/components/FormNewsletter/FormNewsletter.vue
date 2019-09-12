<template>
    <div>
        <div class="q-pa-md q-gutter-sm text-white">
            <p class="news_title">Desideri ricevere la nostra Newsletter?</p>
            <q-form
                    @submit="onSubmit"
                    @reset="onReset"
                    class="q-gutter-md"
            >
                <q-input
                        filled
                        name="firstName"
                        dark standout
                        v-model="name"
                        :label="$t('newsletter.name') + `*`"
                        :hint="$t('newsletter.namehint')"
                        lazy-rules
                        :rules="[ val => val && val.length > 0 || $t('newsletter.typesomething')]">

                </q-input>

                <q-input
                        filled
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
                        dark standout
                        v-model="email"
                        :label="$t('newsletter.email') + `*`"
                        lazy-rules
                        :rules="[ val => val && val.length > 6 || $t('newsletter.typesomething')]">

                </q-input>

                <a href="/policy"><span class="news_link">Privacy Policy</span></a>

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

