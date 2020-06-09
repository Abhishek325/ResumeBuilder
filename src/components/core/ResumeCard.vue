<template>
  <div class="col m6 s12">
    <div class="card horizontal">
      <div class="card-stacked">
        <div class="card-content">
          <h5
            class="truncate"
            :title="resume.resume_title"
            @click="editMode = true"
            v-if="!editMode"
          >
            {{ resume.resume_title }}
            <i class="material-icons" @click="editMode = true">mode_edit</i>
          </h5>
          <div
            class="row"
            v-if="editMode"
            style="margin-bottom: -2.5rem;margin-top: -1rem;"
          >
            <div class="input-field col s10" style="margin-bottom:0;">
              <input
                type="text"
                @keydown.esc="editMode = false"
                @blur="editMode = false"
                v-model="resume.resume_title"
              />
              <label class="active">Resume Name</label>
            </div>
            <div class="col s2">
              <button
                class="btn-flat waves-effect waves-default"
                style="margin-top: 2rem;right: 1rem;"
                @click="updateResumeTitle()"
              >
                <i class="material-icons">check</i>
              </button>
            </div>
          </div>
          <span
            class="grey-text lighten-1 truncate"
            :title="auditText"
            style="font-size:12px"
            >{{ auditText }}</span
          >
          <p class="left">
            <span
              class="new badge"
              v-for="(tag, index) in tags"
              :key="index"
              :data-badge-caption="`${tag.count} ${tag.label}`"
            >
              <i
                class="material-icons"
                style="font-size: 14px;position: relative;top: 1.5px;"
                >{{ tag.icon }}</i
              >
            </span>
          </p>
        </div>
        <div class="card-action" style="border-top: none;">
          <span class="icon-placeholder right"></span>
          <span class="icon-placeholder right"></span>
          <span class="icon-placeholder right"></span>
          <a class="link right circle waves-effect" @click="deleteResume()">
            <i class="material-icons">delete</i>
          </a>
          <a
            class="link right circle waves-effect"
            title="Duplicate"
            @click="duplicateResume()"
          >
            <i class="material-icons">content_copy</i>
          </a>
          <router-link
            class="link right circle waves-effect"
            title="Edit"
            :to="`/resume/edit/${resume.id}`"
          >
            <i class="material-icons">edit</i></router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import STORAGE_SERVICE from "../../services/persistence";
export default {
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
  data() {
    return {
      editMode: false,
      tags: [],
    };
  },
  mounted() {
    // Employment
    this.tags.push({
      icon: "work",
      label: "Employment",
      count: (this.resume[5] || []).length,
    });
    //Education
    this.tags.push({
      icon: "school",
      label: "Education",
      count: (this.resume[6] || []).length,
    });
    // Skills
    this.tags.push({
      icon: "star",
      label: "Skills",
      count: (this.resume[7] || []).length,
    });
    //links
    this.tags.push({
      icon: "insert_link",
      label: "Links",
      count: (this.resume[8] || []).length,
    });
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
    updateResumeTitle() {
      STORAGE_SERVICE.saveResume(this.resume);
      this.editMode = false;
    },
  },
};
</script>
<style scoped>
.card {
  height: 220px;
}
.row,
.col.m6 {
  height: 100%;
}
.link {
  visibility: hidden;
  cursor: pointer;
}
.card:hover .link {
  visibility: visible;
}
.link > i {
  color: #757575;
  padding: 0.5rem;
  font-size: 1.25rem;
}
.card
  .card-action
  a:not(.btn):not(.btn-large):not(.btn-small):not(.btn-large):not(.btn-floating) {
  margin-right: 15px;
}
span.badge.new {
  margin-top: 0.75rem;
  margin-right: 0.5rem;
  margin-left: 0;
  float: left;
}
.btn-flat {
  position: absolute;
  right: 0;
}
.icon-placeholder:before {
  content: "\25CF";
  font-size: 1.5rem;
  color: #ccc;
  margin-right: 30px;
}
.card:hover .icon-placeholder {
  display: none;
}
h5 > i {
  top: 2px;
  color: #999;
  font-size: 20px;
  cursor: pointer;
  position: relative;
  visibility: hidden;
}
h5:hover > i {
  visibility: visible;
}
</style>
<style>
.link:hover {
  background: rgba(0, 0, 0, 0.2);
}
</style>
