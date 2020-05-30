<template>
  <div class="col m6 s12">
    <div class="card hoverable medium">
      <div class="row">
        <button class="btn-flat" @click="deleteResume()">
          <i class="material-icons">close</i>
        </button>
        <div
          class="col m6 s12 valign-wrapper blur hide-on-med-and-down"
          style="background:#dedede;"
        >
          <component
            :formData="formData"
            scaleX="0.9"
            scaleY="0.23"
            :is="'NewYork'"
            style="max-height: 380%;overflow-y: hidden;"
          ></component>
        </div>
        <div class="col m6 s12 valign-wrapper">
          <div class="card-content">
            <h5 class="truncate" :title="resume.resume_title">
              {{ resume.resume_title }}
            </h5>
            <span
              class="grey-text lighten-1 truncate"
              :title="auditText"
              style="font-size:12px"
              >{{ auditText }}</span
            >
            <router-link class="link" :to="`/resume/edit/${resume.id}`"
              ><h6>
                <i class="material-icons">edit</i>
                Edit
              </h6></router-link
            >
            <button class="link" @click="duplicateResume()">
              <h6>
                <i class="material-icons">content_copy</i>
                Duplicate
              </h6>
            </button>
            <router-link class="link" to="/edit/1"
              ><h6>
                <i class="material-icons">file_download</i> Download PDF
              </h6></router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import STORAGE_SERVICE from "../../services/persistence";
import NewYork from "../templates/NewYork";
export default {
  components: {
    NewYork,
  },
  computed: {
    auditText() {
      const text = this.resume.updated_at ? "Updated" : "Created";
      const auditDate = this.resume.updated_at || this.resume.created_at;
      const dateString = new Date(auditDate).toLocaleString();
      return `${text} ${dateString}`;
    },
    formData() {
      return STORAGE_SERVICE.getResumeById(this.resume.id);
    },
  },
  props: {
    resume: Object,
  },
  methods: {
    duplicateResume() {
      STORAGE_SERVICE.duplicateResume(this.resume);
      this.$emit("resumeListUpdate");
    },
    deleteResume() {
      if (confirm("Are you sure?")) {
        STORAGE_SERVICE.deleteResume(this.resume.id);
        this.$emit("resumeListUpdate");
      }
    },
  },
};
</script>
<style scoped>
.row,
.col.m6 {
  height: 100%;
}
.material-icons {
  font-size: 15px;
}
.link {
  color: #000;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
}
.link:hover {
  color: #039be5;
}
.btn-flat {
  position: absolute;
  right: 0;
}
.blur {
  -webkit-filter: blur(1.5px);
  -moz-filter: blur(1.5px);
  -o-filter: blur(1.5px);
  -ms-filter: blur(1.5px);
  filter: blur(1.5px);
  user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -o-user-select: none;
}
</style>
