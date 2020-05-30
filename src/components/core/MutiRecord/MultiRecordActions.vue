<template>
  <div style="display:inline">
    <button
      class="btn-flat waves-effect waves-default right"
      v-if="editIndex !== index"
      @click="$emit('delete')"
    >
      <i class="material-icons">delete</i>
    </button>
    <button
      class="btn-flat waves-effect waves-default right"
      v-if="editIndex !== index"
      @click="$emit('edit')"
    >
      <i class="material-icons" title="Edit">edit</i>
    </button>
    <button
      class="btn-flat waves-effect waves-default right"
      v-if="editIndex === index"
      @click="$emit('close')"
    >
      <i class="material-icons" title="Done">check</i>
    </button>
  </div>
</template>
<script>
export default {
  props: {
    index: Number,
    editIndex: Number,
    sectionName: String,
  },
};
</script>
<style scoped>
button {
  margin-top: -1.2rem;
}
</style>
