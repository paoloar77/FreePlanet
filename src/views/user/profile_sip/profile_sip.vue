<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div class="q-gutter-sm q-pa-xs q-pb-md">
        <CTitleBanner class="q-pa-xs" :title="$t('pages.profile')" bgcolor="bg-primary" clcolor="text-white"
                      myclass="myshad" :canopen="true">


            <div class="column">
                <div class="row">
                    <CMyFieldDb :title="$t('reg.name')"
                                table="users"
                                mykey="name"
                                :type="tools.FieldType.string">
                    </CMyFieldDb>
                    <CMyFieldDb :title="$t('reg.surname')"
                                table="users"
                                mykey="surname"
                                :type="tools.FieldType.string">
                    </CMyFieldDb>
                </div>
                <div class="row">
                    <CMyFieldDb :title="$t('reg.username')"
                                table="users"
                                mykey="username"
                                disable="true"
                                :type="tools.FieldType.string">
                    </CMyFieldDb>
                    <CMyFieldDb :title="$t('reg.email')"
                                table="users"
                                mykey="email"
                                disable="true"
                                :type="tools.FieldType.string">
                    </CMyFieldDb>
                </div>
                <CMyFieldDb :title="$t('reg.nationality')"
                            table="users"
                            mykey="profile"
                            mysubkey="nationality"
                            :type="tools.FieldType.nationality">
                </CMyFieldDb>
                <div class="row">
                    <CMyFieldDb :title="$t('reg.intcode_cell')"
                                table="users"
                                mykey="profile"
                                mysubkey="intcode_cell"
                                :type="tools.FieldType.intcode">
                    </CMyFieldDb>
                    <CMyFieldDb :title="$t('reg.cell')"
                                table="users"
                                mykey="profile"
                                mysubkey="cell"
                                :type="tools.FieldType.string">
                    </CMyFieldDb>
                </div>
                <!--<CMyFieldDb :title="$t('reg.username_telegram')"
                            table="users"
                            mykey="profile"
                            mysubkey="username_telegram"
                            :type="tools.FieldType.string">
                </CMyFieldDb>-->
                <!--<CMyFieldDb title="Telegram Id"
                            table="users"
                            :readonly="true"
                            mykey="profile"
                            mysubkey="teleg_id"
                            :type="tools.FieldType.number">
                </CMyFieldDb>-->

            </div>

        </CTitleBanner>

        <CTitleBanner class="q-pa-xs" :title="$t('otherpages.biografia')" bgcolor="bg-primary" clcolor="text-white"
                      myclass="myshad" :canopen="true">

            <CMyFieldDb :title="$t('profile.chisei')"
                        table="users"
                        mykey="profile"
                        mysubkey="chisei"
                        :type="tools.FieldType.string">
            </CMyFieldDb>

            <CMyFieldDb :title="$t('profile.iltuoimpegno')"
                        table="users"
                        mykey="profile"
                        mysubkey="iltuoimpegno"
                        :type="tools.FieldType.string">
            </CMyFieldDb>

            <CMyFieldDb :title="$t('profile.come_aiutare')"
                        table="users"
                        mykey="profile"
                        mysubkey="come_aiutare"
                        :type="tools.FieldType.string">
            </CMyFieldDb>

        </CTitleBanner>

        <CTitleBanner class="q-pa-xs" :title="$t('otherpages.modifprof')" bgcolor="bg-primary" clcolor="text-white"
                      myclass="myshad" :canopen="true">

            <div class="row justify-center">
                <q-btn push
                       rounded
                       color="primary"
                       size="md"
                       to="/requestresetpwd"
                       :label="$t('reg.modificapassword')">
                </q-btn>
            </div>

            <br>

            <CTitleBanner class="q-pa-xs" :title="$t('reg.cancella_account')" bgcolor="bg-secondary" clcolor="text-white"
                          myclass="myshad" :canopen="true" :visible="false">

                <div class="text-center">
                    <q-btn rounded size="md" color="negative" @click="eliminaAccount"
                           :label="$t('reg.cancella_account')">
                    </q-btn>
                </div>
            </CTitleBanner>
        </CTitleBanner>

        <br/>

    </div>
</template>

<script lang="ts" src="./profile_sip.ts">
</script>

<style lang="scss" scoped>
    @import './profile_sip.scss';
</style>
