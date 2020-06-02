<template>
  <div class="container">
    <div class="row">
      <div class="col m8">
        <h5>Resumes</h5>
      </div>
      <div class="col m4">
        <router-link
          class="btn-flat waves-effect waves-default right"
          to="/resume/add"
          ><i class="material-icons left">add</i>Create new</router-link
        >
      </div>
      <AboutInfo :embedded="true" v-if="resumeList.length == 0" />
      <ResumeCard
        v-for="(resume, index) in resumeList"
        :key="index"
        :resume="resume"
        @resumeListUpdate="onResumeListUpdate"
      />
    </div>
   
  </div>
</template>

<script>
// @ is an alias to /src
import AboutInfo from "./About";
import ResumeCard from "@/components/core/ResumeCard";
import STORAGE_SERVICE from "../services/persistence";

export default {
  components: {
    ResumeCard,
    AboutInfo,
  },
  data() {
    return {
      resumeList: [],
    };
  },
  created() {
    this.resumeList = STORAGE_SERVICE.getResumeList();
  },
  methods: {
    onResumeListUpdate() {
      this.resumeList = STORAGE_SERVICE.getResumeList();
    },
  },
};
</script>
<style scoped>
.btn-flat {
  margin-top: 1rem;
}
.container {
  height: auto;
}
</style>
<style>
.btn,
.btn-large,
.btn-floating,
.btn-small,
nav {
  background-color: #4a148c;
}
.btn:hover,
.btn-large:hover,
.btn-small:hover,
.btn-floating:hover,
.btn:focus,
.btn-large:focus,
.btn-small:focus,
.btn-floating:focus {
  background-color: #6a1b9a;
}
.btn-floating[disabled] {
  background-color: #4a148c !important;
}
body {
  background: #f1f1f1;
}
</style>
