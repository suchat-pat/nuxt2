<template>
    <v-container fluid class="fill-height bg-gray-4">
        <v-row justify="center" align="center">
            <v-card elevation="12" rounded="lg" class="bg"></v-card>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false
})
</script>

<style scoped>
.bg{
    background-color: #7d0c14;
}
</style>