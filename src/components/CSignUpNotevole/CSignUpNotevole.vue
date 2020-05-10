<template>
  <div>
    <div class="text-center">
      <p>
        <logo mystyle="height:200px;"></logo>
        <CTitleBanner :title="gettitlereg"></CTitleBanner>
      </p>
    </div>

    <q-banner
      v-if="!nuovareg"
      rounded
      class="bg-primary text-white"
      style="text-align: center; font-size:1rem;">
      <span class="mybanner" v-html="$t('reg.reg_lista_prec')"></span>
    </q-banner>

    <br>
    <q-banner
      v-if="!nuovareg"
      rounded
      class="bg-warning text-black"
      style="text-align: center; font-size:1rem;">
      <span class="mybanner">{{ $t('reg.nuove_registrazioni')}}</span>
    </q-banner>

    <!--Prova URL :  {{env('PROVA_PAOLO')}}-->

    <div class="q-gutter-sm">

      <!--<q-option-group-->
      <!--:options="options"-->
      <!--label="Notifications"-->
      <!--type="radio"-->
      <!--v-model="signup.already_registered"-->
      <!--&gt;</q-option-group>-->

      <!--<q-toggle dark color="green"
                v-model="signup.already_registered"
                :label="$t('reg.already_registered')">
      </q-toggle>-->
      <br>

      <q-input
        v-if="showaportador && signup.aportador_solidario !== tools.APORTADOR_NONE"
        bg-color="lightblue"
        :readonly="true"
        v-model="signup.aportador_solidario"
        rounded outlined
        @blur="$v.signup.aportador_solidario.$touch"
        :error="$v.signup.aportador_solidario.$error"
        :error-message="errorMsg('aportador_solidario', $v.signup.aportador_solidario)"
        maxlength="20"
        debounce="1000"

        :label="$t('reg.aportador_solidario')">

        <template v-slot:prepend>
          <q-icon name="person"/>
        </template>

      </q-input>

      <div v-if="regvisibile">
        <q-input
          v-model="signup.email"
          rounded outlined
          @blur="$v.signup.email.$touch"
          :error="$v.signup.email.$error"
          :error-message="errorMsg('email', $v.signup.email)"
          @keydown.space="(event) => event.preventDefault()"
          maxlength="50"
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
          @keydown.native.54="(event) => event.preventDefault()"
          @keydown.native.52="(event) => event.preventDefault()"
          @keydown.space="(event) => event.preventDefault()"
          maxlength="20"
          debounce="1000"
          :error-message="errorMsg('username', $v.signup.username)"
          :label="$t('reg.username')">

          <template v-slot:prepend>
            <q-icon name="person"/>
          </template>

        </q-input>

        <q-input
          v-model="signup.name"
          rounded outlined
          @blur="$v.signup.name.$touch"
          :error="$v.signup.name.$error"
          maxlength="30"
          debounce="1000"
          :error-message="errorMsg('name', $v.signup.name)"
          :label="$t('reg.name')">

          <template v-slot:prepend>
            <q-icon name="person"/>
          </template>

        </q-input>

        <q-input
          v-model="signup.surname"
          rounded outlined
          @blur="$v.signup.surname.$touch"
          :error="$v.signup.surname.$error"
          maxlength="30"
          debounce="1000"
          :error-message="errorMsg('surname', $v.signup.surname)"
          :label="$t('reg.surname')">

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
          maxlength="30"
          :label="$t('reg.password')">

          <template v-slot:prepend>
            <q-icon name="vpn_key"/>
          </template>

        </q-input>

        <q-input
          v-model="signup.repeatPassword"
          type="password"
          maxlength="30"
          rounded outlined
          @blur="$v.signup.repeatPassword.$touch"
          :error="$v.signup.repeatPassword.$error"
          :error-message="`${errorMsg('repeatpassword', $v.signup.repeatPassword)}`"

          :label="$t('reg.repeatPassword')">

          <template v-slot:prepend>
            <q-icon name="vpn_key"/>
          </template>

        </q-input>

        <!--:hint="$t('reg.tips.repeatpassword')"-->

        <q-input
          v-if="shownationality"
          v-model="countryname"
          :readonly="true"
          rounded outlined

          debounce="1000"
          :label="$t('reg.nationality')">

          <template v-slot:prepend>
            <vue-country-code
              @onSelect="selectcountry"
              :preferredCountries="tools.getprefCountries"
              :dropdownOptions="{ disabledDialCode: true }"
            >

            </vue-country-code>
          </template>

        </q-input>

        <div v-if="!tools.isMobile()"><br></div>

        <vue-tel-input
          v-if="showcell"
          @country-changed="intcode_change"
          v-model="signup.profile.cell"
          :preferredCountries="tools.getprefCountries"
          :placeholder="getplaceholdercell"
          maxlength="20"
          autocomplete="off"
          mode="international"
          :enabledCountryCode="false"
          inputClasses="clCell"
          wrapperClasses="clCellCode">
        </vue-tel-input>

        <br>
        <div class="text-center">
          <q-btn rounded size="sm" color="positive" @click="showdisclaimer = true" :label="$t('privacy_policy')">
          </q-btn>
        </div>

        <q-checkbox
          v-model="signup.terms"
          color="secondary"
          @blur="$v.signup.terms.$touch"
          :error="$v.signup.terms.$error"
          :error-message="`${errorMsg('terms', $v.signup.terms)}`"
          :label="$t('reg.terms')">

        </q-checkbox>

        <q-checkbox
          v-if="showadultcheck"
          v-model="iamadult"
          color="secondary"
          :label="$t('reg.onlyadult')">
        </q-checkbox>

        <div v-if="showadultcheck">
          <br>
        </div>

        <div class="wrapper">
          <q-btn rounded size="lg" color="positive" @click="submitOk" :disabled='!allowSubmit' :label="$t('reg.submit')">
          </q-btn>
        </div>
      </div>

    </div>

    <!--

            <div align="center">
        <q-btn rounded size="lg" color="primary" @click="submitOk" :disable="">{{$t('reg.submit')}}
        </q-btn>
    </div>

    -->

    <q-dialog v-model="showdisclaimer">
      <q-card :style="`min-width: `+ tools.myheight_dialog() + `px;`">
        <q-toolbar class="bg-primary text-white">
          <q-toolbar-title>
            Policy
          </q-toolbar-title>
          <q-btn flat round color="white" icon="close" v-close-popup></q-btn>
        </q-toolbar>
        <q-card-section class="inset-shadow">
          <PagePolicy
            owneremail="ayni.gifteconomy@gmail.com"
            :SiteName="$t('ws.sitename')"
            ownerDataName="Ayni"
            managerData="Ayni"
            includeData="dati anagrafici (ragione sociale, nome, cognome), recapiti (telefono, indirizzo email)"
            url="ayni.gifteconomy@gmail.com"
            lastdataupdate="16 Gennaio 2020"
            country="Italia"
          >

          </PagePolicy>
        </q-card-section>
      </q-card>

    </q-dialog>

  </div>
</template>

<script lang="ts" src="./CSignUpNotevole.ts">
</script>
<style lang="scss" scoped>
  @import './CSignUpNotevole.scss';
</style>
