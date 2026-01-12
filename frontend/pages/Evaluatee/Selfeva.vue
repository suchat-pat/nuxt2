<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-form @submit.prevent="saveScore">
                    <h1 class="text-h5 font-weight-bold">แบบประเมิน</h1>
                    <v-card class="mt-2 pa-2">
                        <p>ชื่อ - นามสกุล : {{ user.first_name }} {{ user.last_name }} </p>
                        <p>รอบประเมินที่ : {{ user.round_sys }} ปี {{ user.year_sys }} </p>
                    </v-card>
                    <v-row class="mt-2" v-for="(topic,index1) in topics" :key="topic.id_topic">
                        <v-col cols="12">
                            <h1 class="text-h6 font-weight-bold">{{ index1+1 }}.{{ topic.name_topic }}</h1>
                            <v-card class="pa-2">
                                <v-row v-for="(indicate,index2) in topic.indicates" :key="indicate.id_indicate">
                                    <v-col cols="12">
                                        <p>
                                            {{ index1+1 }}.{{ index2 }} {{ indicate.name_indicate }} น้ำหนักคะแนน : {{ indicate.point_indicate }} คะแนนเต็ม : {{ indicate.point_indicate*4 }} รายละเอียดตัวชี้วัด : {{ indicate.detail_indicate }}
                                        </p>
                                        <v-textarea label="คำอธิบายเพิ่มเติม(ถ้ามี)" v-model="indicate.detail_eva" rows="2"></v-textarea>
                                        <v-file-input label="ไฟล์" @change="onFileChange($event,topic.id_topic,indicate.id_indicate)" accept="image/*.pdf" ></v-file-input>
                                        <v-select v-if="indicate.check_indicate === 'y'" label="ใส่คะแนนประเมิน 1-4" v-model="indicate.score" :items="[1,2,3,4]"></v-select>
                                        <v-text-field v-else v-model="indicate.score" label="ใส่คะแนนประเมิน 1-4" type="number"></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-form>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import axios from 'axios'
import {eva} from '../API/api'
const user = ref({})
const topics = ref([])
const token = process.client ? localStorage.getItem('token') : null
const fetchUser = async () =>{
    try{
        const res = await axios.get(`${eva}/selfeva/user`,{headers:{Authorization:`Bearer ${token}`}})
        user.value = res.data
    }catch(err){
        console.error('Error Get User',err)
    }
}
const fetchTopic = async () =>{
    try{
        const res = await axios.get(`${eva}/selfeva/indicate`,{headers:{Authorization:`Bearer ${token}`}})
        topics.value = res.data
        console.log()
    }catch(err){
        console.error('Error Get Topic',err)
    }
}

onMounted(async () => {
    await Promise.all([fetchTopic(),fetchUser()])
})
const saveScore = async () =>{
    
}

</script>

<style scoped>

</style>