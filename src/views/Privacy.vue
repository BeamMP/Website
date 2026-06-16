<script setup>
import { ref, onMounted } from 'vue'
import { marked } from 'marked'

const content = ref('')
const isLoading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    const res = await fetch('/docs/privacy_policy.md')
    if (!res.ok) throw new Error('Failed to load privacy policy')
    const text = await res.text()
    content.value = marked.parse(text)
  } catch (e) {
    error.value = e.message
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <section class="max-w-4xl mx-auto px-4 py-10">
    <div v-if="isLoading" class="text-center py-20 text-muted-foreground">Loading...</div>
    <div v-else-if="error" class="text-center py-20 text-destructive">{{ error }}</div>
    <article v-else class="prose prose-neutral dark:prose-invert max-w-none" v-html="content" />
  </section>
</template>
