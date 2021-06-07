<template>
    <div class="" :style="mystyle">
        <q-input v-model="myvalue"
                 v-show="false"
                 color="blue-6"
                 hide-bottom-space
                 outlined
                 borderless
                 :label="label"
                 :bg-color="bgcolor"
                 :readonly="true"
                 :dense="dense"
                 mask="####-##-## ##:##"
                 debounce="500"
                 @input="changeval"
                 :input-class="getclass"
        >
        </q-input>

        <q-field
                :label="label"
                stack-label
                :value="myvalue"
                outlined
                :dense="dense"
                color="blue-6"
                :bg-color="bgcolor"
                debounce="500"
                :input-class="getclass">

            <template v-slot:control>
                <div style="">
                    <div class="self-center full-width no-outline" :style="mystyle" tabindex="0">
                        {{ getstrDate(myvalue) }}
                    </div>
                </div>
            </template>
            <template v-slot:append>
                <q-icon v-if="canEdit" name="event" class="cursor-pointer">
                    <q-popup-proxy v-model="showDateTimeScroller" @before-show="Opening" @before-hide="Closing">

                        <q-scroller
                                v-model="myvalue"
                                :view="view"
                                :locale="toolsext.getLocale()"
                                :rounded-borders="true"
                                border-color="#2196f3"
                                bar-color="#2196f3"
                                text-color="white"
                                color="primary"
                                :minute-interval="minuteinterval"
                                inner-text-color="primary"
                                inner-color="white"
                                :style="scrollerPopupStyle280"
                                @input="changeval"
                                @close="() => { savetoclose();  }"
                        ></q-scroller>

                    </q-popup-proxy>
                </q-icon>
            </template>
        </q-field>
    </div>
</template>

<script lang="ts" src="./CDateTime.ts">
</script>

<style lang="scss" scoped>
    @import './CDateTime.scss';
</style>
