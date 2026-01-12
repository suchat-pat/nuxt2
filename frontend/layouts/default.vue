<template>
    <v-app>
        <v-app-bar color="#7d0c14" class="py-2">
            <v-app-bar-nav-icon @click="drawer = !drawer" variant="text"></v-app-bar-nav-icon>
            <v-toolbar-title>ระบบประเมินบุคลากรวิทยาลัยเทคนิคน่าน</v-toolbar-title>
            <p>ผู้ใช้งาน : {{ user.first_name }} {{ user.last_name }} <br> {{ user.role }}</p>
            <v-btn @click="logout" class="bg-white">ออกจากระบบ</v-btn>&nbsp;&nbsp;&nbsp;&nbsp;
        </v-app-bar>
    </v-app>
</template>

<script setup lang="ts">
import axios from 'axios';
import { useDisplay } from 'vuetify';
const {mdAndDown} = useDisplay()
const isMobile = computed(() => mdAndDown.value)
const drawer = ref(false)
const user = ref({})

</script>

<style scoped>

</style>