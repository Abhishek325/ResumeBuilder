<template>
  <div class="container">
    <div class="row">
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
            </div>
            <div class="card-action">
              <small>Author : Abhishek</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TemplatesConfig from "../model/templatesConfig.json";

export default {
  data() {
    return {
      templateList: [],
    };
  },
  mounted() {
    this.templateList = TemplatesConfig;
  },
};
</script>
<style scoped></style>
