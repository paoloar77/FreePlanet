<template>
    <div>
        <section class="padding_testo bg-white text-grey-10 text-justify" >  <!-- v-scroll-reveal.reset -->
            <div class="row items-start q-col-gutter-xs imgtext">
                <div class="imgtext__img">
                    <img v-if="src" :src="src" class="myclimg" :style="style1" :alt="alt1">
                    <img v-if="src2" :src="src2" class="myclimg" :style="style1" :alt="alt2">
                    <div class="section_text">
                    <slot></slot>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script lang="ts" src="./CImgText.ts">
</script>
<style lang="scss" scoped>
    @import './CImgText.scss';
</style>
