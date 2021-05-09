<template>
  <div>
    <div class="text-center">
      <logo></logo>
      <CTitleBanner :title="$t('pages.SignUpIscrizione')" :canopen="true" :visible="false">

        <div class="q-gutter-xs">

          <p class="q-ml-md text-center">
            Leggi
            <span class="underline"> <router-link to="/il-nostro-progetto" custom v-slot="{ navigate }">
            <span class="footer_link" @click="navigate" @keypress.enter="navigate" role="link">Il Nostro Progetto</span>
            </router-link></span>
          </p>


          <q-input
            v-model="signup.name"
            rounded outlined
            @blur="$v.signup.name.$touch"
            :error="$v.signup.name.$error"
            maxlength="30"
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
            :error-message="errorMsg('surname', $v.signup.surname)"
            :label="$t('reg.surname')">

            <template v-slot:prepend>
              <q-icon name="person"/>
            </template>

          </q-input>

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
            v-model="signup.fiscalcode"
            rounded outlined
            @blur="$v.signup.fiscalcode.$touch"
            :error="$v.signup.fiscalcode.$error"
            maxlength="20"
            mask="AAAAAA##A##A###A"
            debounce="1000"
            :error-message="errorMsg('fiscalcode', $v.signup.fiscalcode)"
            :label="$t('reg.fiscalcode')">

            <template v-slot:prepend>
              <q-icon name="person"/>
            </template>

          </q-input>

          <q-input
            v-model="signup.residency_address"
            rounded outlined
            @blur="$v.signup.residency_address.$touch"
            :error="$v.signup.residency_address.$error"
            maxlength="60"
            debounce="1000"
            :error-message="errorMsg('residency_address', $v.signup.residency_address)"
            :label="$t('reg.residency_address')">

            <template v-slot:prepend>
              <q-icon name="person"/>
            </template>

          </q-input>

          <q-input
            v-model="signup.residency_city"
            rounded outlined
            @blur="$v.signup.residency_city.$touch"
            :error="$v.signup.residency_city.$error"
            maxlength="60"
            debounce="1000"
            :error-message="errorMsg('residency_city', $v.signup.residency_city)"
            :label="$t('reg.residency_city')">

            <template v-slot:prepend>
              <q-icon name="person"/>
            </template>

          </q-input>

          <q-input
            v-model="signup.residency_province"
            rounded outlined
            @blur="$v.signup.residency_province.$touch"
            :error="$v.signup.residency_province.$error"
            maxlength="3"
            debounce="1000"
            :error-message="errorMsg('residency_province', $v.signup.residency_province)"
            :label="$t('reg.residency_province')">

            <template v-slot:prepend>
              <q-icon name="person"/>
            </template>

          </q-input>

          <q-input
            v-model="signup.residency_zipcode"
            rounded outlined
            @blur="$v.signup.residency_zipcode.$touch"
            :error="$v.signup.residency_zipcode.$error"
            maxlength="10"
            debounce="1000"
            :error-message="errorMsg('residency_zipcode', $v.signup.residency_zipcode)"
            :label="$t('reg.residency_zipcode')">

            <template v-slot:prepend>
              <q-icon name="person"/>
            </template>

          </q-input>

          <q-input
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

          <br>

          <vue-tel-input
            v-model="signup.cell_phone"
            :placeholder="$t('reg.cell')"
            maxlength="20"
            debounce="1000"
            :enabledCountryCode="true"
            inputClasses="clCell"
            wrapperClasses="clCellCode">
          </vue-tel-input>

          <br>

          <q-input
            v-model="signup.dateofbirth"
            debounce="1000"
            @blur="$v.signup.dateofbirth.$touch"
            :error="$v.signup.dateofbirth.$error"
            :error-message="errorMsg('dateofbirth', $v.signup.dateofbirth)"
            stack-label
            :label="$t('reg.dateofbirth')"
            rounded
            type="date"
            mask="date"
            fill-mask
            outlined>
          </q-input>

          <q-input
            v-model="signup.born_city"
            rounded outlined
            @blur="$v.signup.born_city.$touch"
            :error="$v.signup.born_city.$error"
            maxlength="60"
            debounce="1000"
            :error-message="errorMsg('born_city', $v.signup.born_city)"
            :label="$t('reg.born_city')">

            <template v-slot:prepend>
              <q-icon name="person"/>
            </template>

          </q-input>

          <q-input
            v-model="signup.born_province"
            rounded outlined
            @blur="$v.signup.born_province.$touch"
            :error="$v.signup.born_province.$error"
            maxlength="3"
            debounce="1000"
            :error-message="errorMsg('born_province', $v.signup.born_province)"
            :label="$t('reg.born_province')">

            <template v-slot:prepend>
              <q-icon name="person"/>
            </template>

          </q-input>

          <!--<CDate :mydate="signup.dateofbirth" @input="setDateOfBirth(arguments[0])"
                 :rounded="true" :outlined="true"
                 :dense="false"
                 :label="$t('reg.dateofbirth')">
          </CDate>-->


          <q-input
            v-model="countryborn"
            :readonly="true"
            rounded outlined

            debounce="1000"
            :label="$t('reg.nationality_born')">

            <template v-slot:prepend>
              <vue-country-code
                @onSelect="selectcountryborn"
                :preferredCountries="tools.getprefCountries"
                :dropdownOptions="{ disabledDialCode: true }"
              >

              </vue-country-code>
            </template>

          </q-input>

          <br>

          <!--<div v-if="!tools.isMobile()"><br></div>-->


          <q-select
            rounded outlined v-model="signup.metodo_pagamento"
            :options="tools.SelectMetodiPagamento"
            :label="$t('reg.metodopagamento')" emit-value map-options>
          </q-select>

          <q-checkbox
            v-model="signup.accetta_carta_costituzionale_on"
            color="secondary">
            <span v-html="$t('reg.accetta_carta_costituzionale_on')"></span>
          </q-checkbox>

          <q-checkbox
            v-model="signup.terms"
            color="secondary"
            @blur="$v.signup.terms.$touch"
            :error="$v.signup.terms.$error"
            :error-message="`${errorMsg('terms', $v.signup.terms)}`"
            :label="$t('reg.terms')">

          </q-checkbox>


          <div class="wrapper">
            <q-btn rounded size="lg" color="positive" @click="submitOk" :disabled='!allowSubmit'
                   :label="$t('reg.iscriviti')">
            </q-btn>
          </div>

          <br>
        </div>
      </CTitleBanner>
      <br>
    </div>

  </div>
</template>

<script lang="ts" src="./CSignUpIscrizioneConacreis.ts">
</script>
<style lang="scss" scoped>
@import './CSignUpIscrizioneConacreis.scss';
</style>
