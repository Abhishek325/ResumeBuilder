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
      <div class="fixed-action-btn">
        <router-link
          class="btn-floating btn-large z-depth-3 waves-effect waves-light"
          :class="{ pulse: resumeList.length === 0 }"
          to="/resume/add"
          ><i class="material-icons left">add</i>Create new</router-link
        >
      </div>
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
.detailed-view * {
  color: #000;
}
.text-uppercase {
  text-transform: uppercase !important;
}
.font-italic {
  font-style: italic !important;
}
.A4-height {
  /* width: 210mm; */
  height: 296mm;
}
::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.25);
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.3);
}
</style>
