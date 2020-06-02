<template>
  <div
    :style="{ 'margin-top': (fullMode ? marginTop : 0) + 'rem' }"
    class="hide-on-small-only"
    style="width:100%"
  >
    <component
      class="scale-transition"
      :formData="formData"
      :scaleX="fullMode ? '1' : scaleX"
      :scaleY="fullMode ? '1' : scaleY"
      :is="template"
      v-if="!templateView"
    ></component>
    <keep-alive>
      <TemplateList
        :formData="formData"
        v-if="templateView"
        @selected="onTemplateSelected($event)"
      />
    </keep-alive>
    <div class="fixed-action-btn ">
      <a class="btn-floating z-depth-3 btn-large">
        <i class="large material-icons">menu</i>
      </a>
      <ul>
        <li>
          <button
            class="btn-floating waves-effect waves-light"
            title="Toggle template"
            @click="templateView = !templateView"
          >
            <i class="material-icons">gradient</i>
          </button>
        </li>
        <li>
          <button
            class="btn-floating waves-effect waves-light"
            title="Print"
            @click="fullMode = true"
            v-print="'#resumeView'"
          >
            <i class="material-icons">print</i>
          </button>
        </li>
        <li>
          <button
            v-if="!fullMode"
            :disabled="templateView"
            class="btn-floating waves-effect waves-light"
            title="Fit to width"
            @click="
              fullMode = true;
              $emit('fullModeActivated');
            "
          >
            <i class="material-icons">fullscreen</i>
          </button>
          <button
            v-if="fullMode"
            title="Fit to page"
            :disabled="templateView"
            class="btn-floating waves-effect waves-light"
            @click="
              fullMode = false;
              $emit('fullModeDeactivated');
            "
          >
            <i class="material-icons">fullscreen_exit</i>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import TemplateList from "./Template/TemplateList";
export default {
  components: {
    TemplateList,
  },
  props: {
    scaleX: String,
    scaleY: String,
  },
  computed: {
    marginTop() {
      switch (this.template) {
        case "NewYork":
          return 11.5;
        case "Sydney":
          return 5;
      }
      return 0;
    },
  },
  data() {
    return {
      template: "NewYork",
      templateView: false,
      fullMode: false,
      formData: {},
    };
  },
  created() {
    const vm = this;
    // eslint-disable-next-line no-unused-vars
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === "setStoreValues") {
        Object.keys(mutation.payload).forEach((key) => {
          vm.$set(
            vm.formData,
            this.getListNamebyId(key),
            mutation.payload[key]
          );
          this.template = vm.formData.resume_template;
        });
        // Object.assign(vm.formData, mutation.payload);
      } else if (mutation.type === "setFieldValue") {
        vm.$set(vm.formData, mutation.payload.fieldId, mutation.payload.value);
      } else if (
        mutation.type === "setNewMultiRecord" ||
        mutation.type === "updateMultiRecord" ||
        mutation.type === "setListOrder"
      ) {
        vm.$set(
          vm.formData,
          this.getListNamebyId(mutation.payload.sectionSchema.id),
          vm.$store.state.resume[mutation.payload.sectionSchema.id]
        );
      } else if (mutation.type === "setResumeTemplate") {
        this.$emit("onTemplateUpdate");
      }
    });
  },
  methods: {
    onTemplateSelected(templateComponentName) {
      this.template = templateComponentName;
      this.templateView = false;
    },
    getListNamebyId(id) {
      switch (parseInt(id)) {
        case 5:
          return "employment_history";
        case 6:
          return "education";
        case 7:
          return "skills";
        case 8:
          return "links";
        default:
          return id;
      }
    },
  },
};
</script>
<style scoped>
.mt {
  margin-top: 5rem;
}
.fixed-action-btn {
  right: 30px;
  bottom: 1.5rem;
}
.fixed-action-btn:hover ul {
  visibility: visible;
}
</style>
<style>
#resumeView {
  height: 100%;
}
@media print {
  .card {
    box-shadow: none !important;
    border: none !important;
    border-radius: 0 !important;
    margin: 0;
  }
}
</style>
