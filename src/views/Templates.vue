<template>
  <div class="container">
    <div class="row">
      <div class="col m12">
        <h5>Templates</h5>
      </div>
      <div
        class="col m6"
        v-for="(template, index) in templateList"
        :key="index"
      >
        <div class="card horizontal">
          <div class="card-image">
            <img :src="`img/templates/${template.imagePath}`" />
          </div>
          <div class="card-stacked">
            <div class="card-content">
              <h5>{{ template.name }}</h5>
              <p>{{ template.description }}</p>
              <br />
              <small>Author : Abhishek</small>
            </div>
            <div class="card-action">
              <button
                class="btn-flat btn-sm z-depth-3 waves-effect waves-default right"
                @click="
                  setResumeTemplate(template.name);
                  $router.push('/resume/add');
                "
              >
                Use template <i class="material-icons right">chevron_right</i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TemplatesConfig from "../model/templatesConfig.json";
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      templateList: [],
    };
  },
  mounted() {
    this.templateList = TemplatesConfig;
  },
  methods: {
    ...mapMutations(["setResumeTemplate"]),
  },
};
</script>
<style scoped>
button > i {
  position: relative;
  top: 0px;
}
</style>
