<template>
  <div>
    <div class="text-center">
      <p>
        <logo></logo>
        <CTitleBanner :title="$t('pages.SignUp')"></CTitleBanner>
      </p>
    </div>

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
          :enabledCountryCode="true"
          inputClasses="clCell"
          wrapperClasses="clCellCode">
        </vue-tel-input>


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
          <q-btn rounded size="lg" color="positive" @click="submitOk" :disabled='!allowSubmit'>
            {{$t('reg.submit')}}
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

  </div>
</template>

<script lang="ts" src="./CSignUpNotevole.ts">
</script>
<style lang="scss" scoped>
  @import './CSignUpNotevole.scss';
</style>
