<template>
  <div class="container-fluid">
    <div class="row my-2">
      <button
        @click="$emit('change-control', 'temperature')"
        class="btn btn-block"
        :class="control == 'temperature' ? 'btn-primary' : 'btn-secondary'"
      >
        Temperature
      </button>
    </div>
    <div class="row my-2">
      <button
        @click="$emit('change-control', 'precipitation')"
        class="btn btn-block"
        :class="control == 'precipitation' ? 'btn-primary' : 'btn-secondary'"
      >
        Precipitation
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["control"]
};
</script>

<style></style>
