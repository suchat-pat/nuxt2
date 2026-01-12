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
                    <v-form @submit.prevent="Login">
                        <v-text-field v-model="username" label="ชื่อผู้ใช้" prepend-inner-icon="mdi-account"></v-text-field>
                        <v-text-field v-model="password" type="password" label="รหัสผ่าน" prepend-inner-icon="mdi-lock"></v-text-field>
                        <v-select v-model="role" :items="g" label="ประเภทสมาชิก" prepend-inner-icon="mdi-account-group" />
                        <v-btn class="text-white bg" type="submit" block>เข้าสู่ระบบ</v-btn>
                        <center><nuxt-link to="/regis" class="text-blue"><small>สมัครสมาชิก</small></nuxt-link></center>
                    </v-form>
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

import auth from '../API/auth'

const router = useRouter()
const error = ref('')
const username = ref('')
const password = ref('')
const role = ref('')
const g = ['ฝ่ายบุคลากร','กรรมการประเมิน','ผู้รับการประเมินผล']

const Login = async () => {
    try{
        const res = await auth.login({
            username:username.value,
            password:password.value,
            role:role.value
        })
        localStorage.setItem('token',res.data.token)
        const useRole = res.data.role
        if(useRole === 'ฝ่ายบุคลากร') router.push('/Staff')
        else if(useRole === 'กรรมการประเมิน') router.push('/Committee')
        else if(useRole === 'ผู้รับการประเมินผล') router.push('/Evaluatee')
    }catch(err:any){
        console.error("Login Failed",err)
        error.value = err.response?.data?.message || 'เข้าสู่ระบบไม่สำเร็จ'
    }
}

</script>

<style scoped>
.bg{
    background-color: #7d0c14;
}
</style>