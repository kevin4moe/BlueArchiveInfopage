<template>
  <div class="flex flex-col">
    <h4 class="text-center font-bold text-sm">{{ title }}</h4>
    <p
      class="w-full overflow-clip overflow-hidden mx-auto mt-auto border rounded text-sm align-text-bottom"
      :class="`border-${color}-700 text-center`"
    >
      {{ content }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    content: [String, Boolean],
    color: {
      type: String,
      default: "green",
    },
  },
};
</script>
