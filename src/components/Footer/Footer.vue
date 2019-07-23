<template>
    <div>
        <section class="landing__footer">
            <div class="row justify-between items-start q-col-gutter-xs">
                <div class="col-12 col-sm-4 ">
                    <p style="text-align: center">
                        <logo></logo>
                    </p>
                    <!--<span v-html="$t('homepage.footer.description')">-->
                    <!--</span>-->


                    <FormNewsletter v-if="static_data.SHOW_NEWSLETTER"

                    >
                    </FormNewsletter>

                </div>
                <div class="col-12 col-sm-4">
                    <div class="text-center">

                        <div class="q-mt-xs mycontacts">
                            <p class="mycontacts_title">{{$t('homepage.titlecontatti')}}</p>


                            <p class="mycontacts_text" v-html="$t('homepage.contacts')"></p>
                        </div>
                        <div class="landing__footer-icons row flex-center">
                            <a :href="FBPage" target="_blank">
                                <i aria-hidden="true" class="q-icon fab fa-facebook-f icon_contact links"> </i></a>

                            <a :href="TelegramSupport" target="_blank">
                                <i aria-hidden="true" class="q-icon fab fa-telegram icon_contact links"></i></a>


                            <!--<a href="" target="_blank"><i aria-hidden="true" class="q-icon fab fa-github"> </i></a>-->
                            <!--<a href="https://twitter.com/" target="_blank"><i aria-hidden="true" class="q-icon fab fa-twitter"> </i></a>-->
                            <!--<a href="https://discord.gg/5TDhbDg" target="_blank"><i aria-hidden="true"-->
                            <!--class="q-icon fab fa-discord"> </i></a><a-->
                            <!--href="https://forum.quasar-framework.org/" target="_blank"><i aria-hidden="true"-->
                            <!--class="q-icon fas fa-comments"> </i></a><a-->
                            <!--href="https://www.patreon.com/quasarframework" target="_blank"><i aria-hidden="true"-->
                            <!--class="q-icon fab fa-patreon"> </i></a>-->
                        </div>

                    </div>

                </div>

                <div class="col-12 col-sm-4 q-pa-md" v-for="">
                    <a href="/"><span class="footer_link">Home</span></a><br />
                </div>

                <!--
                <div class="col-12 col-sm-4 q-pa-md">
                    <a href="/"><span class="footer_link">Home</span></a><br />
                    <a href="/chisiamo"><span class="footer_link">Chi Siamo</span></a><br />
                    <a href="/calendarioeventi"><span class="footer_link">Calendario Eventi</span></a><br />
                    <a href="/reiki/significato"><span class="footer_link">Reiki</span></a><br />
                    <a href="/reiki/seminari"><span class="footer_link"> - Seminari Reiki</span></a><br />
                    <a href="/reiki/trattamentiindividuali"><span class="footer_link"> - Trattamenti Individuali</span></a><br />
                    <a href="/reiki/seratereikigruppo"><span class="footer_link"> - Serate di Gruppo</span></a><br />
                    <a href="/shiatsu/significato"><span class="footer_link">Shiatsu</span></a><br />
                    <a href="/shiatsu/trattamentiindividuali"><span class="footer_link"> - Trattamenti Individuali</span></a><br />
                    <a href="/shiatsu/energyyoga"><span class="footer_link"> - Energy Yoga</span></a><br />
                    <a href="/fioridibach"><span class="footer_link">Fiori di Bach</span></a><br />
                    <a href="/scuolaoperatoreolistico"><span class="footer_link">Scuola Operatore Olistico</span></a><br />
                    <a href="/scuoladinaturopatia"><span class="footer_link">Scuola di Naturopatia</span></a><br />


                    <br /><a href="/policy"><span class="footer_link">Privacy Policy</span></a><br />
                </div>
                -->
            </div>
        </section>
        <q-page-scroller position="bottom-right" :scroll-offset="850" :offset="[18, 18]" style="opacity: 0.3">
            <q-btn fab icon="keyboard_arrow_up" color="accent"/>
        </q-page-scroller>
    </div>
</template>

<script lang="ts" src="./Footer.ts">
</script>

<style lang="scss" scoped>
    @import './Footer.scss';
</style>
