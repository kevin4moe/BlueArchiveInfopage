<template>
  <div class="flex flex-col">
    <h4 class="text-center font-bold text-sm">{{ title }}</h4>
    <tags :color="color" :text="content" :plus="'text-center'" />
  </div>
</template>

<script>
import Tags from '@/components/Tags.vue'

export default {
  components: {
    Tags,
  },
  props: {
    title: String,
    content: [String, Boolean],
    color: String,
  }
}
</script>