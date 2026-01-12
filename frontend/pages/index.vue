<template>
    <v-container fluid class="fill-height">
        <v-row justify="center" align="center">
            <v-col cols="12" md="8" lg="5">
                <v-card elevation="12" rounded="lg" class="bg">
                <p class="text-white font-weight-bold text-h5 text-center">NTC EVALUATION SYSTEM</p>
                <p class="text-white text-h6 text-center">ระบบประเมินบุคลากรวิทยาลัยเทคนิคน่าน</p>
                <v-container class="bg-white">
                    <p class="text-h5 font-weight-bold text-center">เข้าสู่ระบบ</p>
                    <v-alert v-if="error" type="error" variant="tonal" >{{ error }}</v-alert>
                    <v-form @submit.prevent="Login"></v-form>
                </v-container>
            </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false
})

const error = ref('')
const username = ref('')
const password = ref('')
const role = ['ฝ่ายบุคลากร','กรรมการประเมิน','ผู้รับการประเมินผล']

const Login = async () => {}

</script>

<style scoped>
.bg{
    background-color: #7d0c14;
}
</style>