<template>
  <div
    class="card z-depth-3"
    id="resumeView"
    :style="{ transform: `scaleX(${scaleX}) scaleY(${scaleY})` }"
  >
    <div class="card-content">
      <div class="col s12 center-align">
        <div class="col s8 offset-s2">
          <div class="center-align grey-text lighten-1">
            <h4 class="name">
              {{ formData.first_name }} {{ formData.last_name }}
            </h4>
            <p class="label">
              {{ formData.job_title }} | {{ formData.pd_city }} |
              {{ formData.phone }}
            </p>
          </div>
        </div>
      </div>
      <div class="row" style="margin-top:2.5rem">
        <div class="col m3 s3  quick-view">
          <h6 class="center-align" v-if="formData.phone || formData.email">
            Details
          </h6>
          <p>{{ formData.phone }}</p>
          <p>{{ formData.email }}</p>

          <p v-if="formData.dob" class="dob center-align">Date of birth</p>
          <p v-if="formData.dob">{{ formData.dob }}</p>

          <h6
            class="center-align"
            v-if="formData.links && formData.links.length > 0"
          >
            Links
          </h6>
          <p v-for="(item, index) in formData.links" :key="`link-${index}`">
            <a :href="item.link" target="_blank">{{ item.label }}</a>
          </p>

          <h6
            class="center-align"
            v-if="formData.skills && formData.skills.length > 0"
          >
            Skills
          </h6>
          <p v-for="(item, index) in formData.skills" :key="`skill-${index}`">
            {{ item }}
          </p>
        </div>
        <div
          class="col m9 s9 detailed-view"
          v-if="
            formData.employment_history &&
              formData.employment_history.length > 0
          "
        >
          <h6>Employment History</h6>
          <section
            v-for="(item, index) in formData.employment_history"
            :key="`employment-${index}`"
          >
            <p class="job-title black-text darken-2">
              {{ item.employment_history_job_title }} at {{ item.employer }},
              {{ item.city }}
            </p>
            <p class="job-duration grey-text lighten-2">
              {{ item.start_date }}
            </p>
            <p class="employment-summary" v-html="item.employment_summary"></p>
          </section>
        </div>
        <div
          class="col m9 s9 detailed-view"
          v-if="formData.education && formData.education.length > 0"
        >
          <h6>Education</h6>
          <section
            v-for="(item, index) in formData.education"
            :key="`education-${index}`"
          >
            <p class="job-title black-text darken-2">
              {{ item.degree }} at {{ item.school }}, {{ item.school_city }}
            </p>
            <p class="job-duration grey-text lighten-2">
              {{ item.school_start_date }} - {{ item.school_end_date }}
            </p>
            <p class="employment-summary" v-html="item.education_summary"></p>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    formData: Object,
    scaleX: String,
    scaleY: String,
  },
};
</script>
<style scoped>
.name {
  margin-top: 0;
  margin-bottom: 0.25rem;
  font-size: 18px;
  color: #000;
}
.label {
  font-size: 12px;
}
.quick-view {
  height: 100vh;
}
.quick-view > h6 {
  margin: 0.85rem 0 0.25rem 0;
  text-decoration: underline;
  font-size: 14px;
  font-weight: 600;
}
.quick-view > p {
  font-size: 12px;
  text-align: center;
  word-wrap: break-word;
  color: #666;
}
a {
  color: #666;
  text-decoration: underline;
}
.detailed-view > h6 {
  margin-bottom: 0;
}
.detailed-view > section {
  margin-bottom: -1rem;
  color: #666;
}
.dob {
  font-size: 12px !important;
  color: #aaa !important;
  text-transform: uppercase;
  margin-top: 0.5rem !important;
}
.job-title {
  padding-top: 0.65rem;
  font-weight: 600;
  font-size: 14px;
  margin: -0.25rem 0;
}
.job-duration {
  margin-top: 1rem;
  font-size: 12px;
}
.card {
  float: none;
  border-radius: 5px;
}
ul:not(.browser-default) > li {
  list-style-type: disc !important;
  margin-left: 1.125rem !important;
  font-size: 13px !important;
}
.employment-summary {
  line-height: 20px;
  font-size: 13px;
  margin-bottom: 1rem !important;
  margin-top: -0.75rem !important;
}
</style>
