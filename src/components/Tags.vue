<template>
  <p class="w-full overflow-clip overflow-hidden mx-auto mt-auto border rounded text-sm align-text-bottom" :class="`border-${color}-700 ${plus}`">{{ text }}</p>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: "green"
    },
    text: String,
    plus: {
      type: String,
      required: false,
    }
  }
}
</script>