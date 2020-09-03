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

          <br />
          <div class="row justify-center">
              <q-btn push
                     rounded
                     color="primary"
                     size="md"
                     to="/requestresetpwd"
                     :label="$t('reg.modificapassword')">
              </q-btn>
          </div>
      </div>

    </CTitleBanner>
    <CTitleBanner class="q-pa-xs" :title="$t('pages.payment')" bgcolor="bg-primary" clcolor="text-white"
                   myclass="myshad" :canopen="true">
      <div class="row fa-border justify-center items-center">

        <CMyFieldDb v-if="tools.isselectPayeer()"
                    :title="$t('reg.payeer_id')"
                    table="users"
                    mykey="profile"
                    myimg="statics/images/payeer.jpg"
                    mysubkey="payeer_id"
                    :type="tools.FieldType.string">
        </CMyFieldDb>
        <CMyFieldDb v-if="tools.isselectAdvCash()"
                    :title="$t('reg.advcash_id')"
                    table="users"
                    mykey="profile"
                    mysubkey="advcash_id"
                    myimg="statics/images/advcash.jpg"
                    :type="tools.FieldType.string">
        </CMyFieldDb>
        <CMyFieldDb v-if="tools.isselectRevolut()"
                    :title="$t('reg.revolut')"
                    table="users"
                    mykey="profile"
                    mysubkey="revolut"
                    myimg="statics/images/revolut.jpg"
                    :type="tools.FieldType.string">
        </CMyFieldDb>

        <CMyFieldDb v-if="tools.isselectPaypal()"
                    :title="$t('reg.email_paypal')"
                    table="users"
                    mykey="profile"
                    mysubkey="email_paypal"
                    myimg="statics/images/paypal.jpg"
                    :type="tools.FieldType.string">
        </CMyFieldDb>

        <CMyFieldDb v-if="tools.isselectPaypal()"
                    :title="$t('reg.link_payment')"
                    table="users"
                    mykey="profile"
                    mysubkey="link_payment"
                    :type="tools.FieldType.string">
        </CMyFieldDb>

        <CMyFieldDb :title="$t('reg.country_pay')"
                    table="users"
                    mykey="profile"
                    mysubkey="country_pay"
                    :type="tools.FieldType.nationality">
        </CMyFieldDb>
        <CMyFieldDb :title="$t('reg.note_payment')"
                    table="users"
                    mykey="profile"
                    mysubkey="note_payment"
                    :type="tools.FieldType.string">
        </CMyFieldDb>

      </div>

      <CMyFieldDb :title="$t('reg.paymenttype')"
                  table="users"
                  mykey="profile"
                  mysubkey="paymenttypes"
                  :type="tools.FieldType.multiselect"
                  jointable="paymenttypes">
      </CMyFieldDb>

    </CTitleBanner>

    <br><br>
    <div class="text-center">
      <q-btn rounded size="md" color="negative" @click="eliminaAccount" :label="$t('reg.cancella_account')">
      </q-btn>
    </div>

  </div>
</template>

<script lang="ts" src="./profile.ts">
</script>

<style lang="scss" scoped>
  @import './profile.scss';
</style>
