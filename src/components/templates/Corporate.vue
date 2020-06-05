<template>
  <div
    class="card"
    id="resumeView"
    :style="{ transform: `scaleX(${scaleX}) scaleY(${scaleY})` }"
  >
    <div class="card-content" style="padding: 0 9px 0 9px;">
      <div class="row">
        <div class="col s12 m12 center-align header">
          <h5 class="name text-uppercase">
            {{ formData.first_name }} {{ formData.last_name }}
          </h5>
          <p class="font-italic">{{ formData.job_title }}</p>
        </div>
        <div class="col s12 m12 content" style="padding-right:2px">
          <div class="col s8 m8" style="padding-top:1rem;">
            <div class="col s12 m12 section">
              <h6>Career Objective</h6>
              <p class="employment-summary" v-html="formData.summary"></p>
            </div>
            <div class="col s12 m12 section">
              <h6>Professional Experience</h6>
              <section
                v-for="(item, index) in formData.employment_history"
                :key="`employment-${index}`"
              >
                <p class="job-title black-text darken-2">
                  {{ item.employment_history_job_title }}
                </p>
                <p class="job-duration">
                  {{ item.employer }}, {{ item.city }} /
                  <span v-if="item.start_date">
                    {{ item.start_date }}
                  </span>
                  <span v-if="item.start_date && item.to_date"> - </span>
                  <span v-if="item.to_date">
                    {{ item.to_date }}
                  </span>
                </p>
                <p
                  class="employment-summary"
                  v-html="item.employment_summary"
                ></p>
              </section>
            </div>
            <div class="col s12 m12 section">
              <h6>Education</h6>
              <section
                v-for="(item, index) in formData.education"
                :key="`education-${index}`"
              >
                <p class="job-title black-text darken-2">
                  {{ item.degree }} at {{ item.school }}, {{ item.school_city }}
                </p>
                <p class="job-duration">
                  {{ item.school_start_date }} - {{ item.school_end_date }}
                </p>
                <p
                  class="employment-summary"
                  v-html="item.education_summary"
                ></p>
              </section>
            </div>
          </div>
          <div class="col s4 m4 sidebar">
            <p class="contact">
              <i class="material-icons">email</i> {{ formData.email }}
            </p>
            <p class="contact">
              <i class="material-icons">phone</i> {{ formData.phone }}
            </p>
            <p class="contact">
              <i class="material-icons">location_on</i> {{ formData.pd_city }}
            </p>
            <p class="dob">Date of birth</p>
            <p class="contact">{{ formData.dob }}</p>
            <br />
            <h6 v-if="formData.links && formData.links.length > 0">
              Links
            </h6>
            <p v-for="(item, index) in formData.links" :key="`link-${index}`">
              <a :href="item.link" target="_blank">{{ item.label }}</a>
            </p>
            <br />
            <h6 v-if="formData.skills && formData.skills.length > 0">
              Skills
            </h6>
            <p
              class="skill"
              v-for="(item, index) in formData.skills"
              :key="`skill-${index}`"
            >
              {{ item }}
            </p>
          </div>
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
.header {
  background: #353f58;
  color: #fff;
  padding-bottom: 1rem;
}
a,
.contact,
.skill {
  font-size: 12px;
  margin-bottom: 0.25rem !important;
}
.content,
a {
  color: #222;
}
a {
  text-decoration: underline;
}
h6 {
  text-transform: uppercase;
  font-style: italic;
  font-weight: 600;
  color: #222;
}
.card-content {
  background: #fff !important;
}
.job-title {
  font-weight: 600;
}
.job-duration {
  color: #666;
  font-size: 13px;
  font-style: italic;
  margin-bottom: -0.75rem !important;
}
.employment-summary > p > span {
  display: block;
  margin-top: 1rem;
}
.sidebar {
  background: #eee;
  padding-top: 1.85rem;
  padding-left: 1rem;
  height: 269mm;
}
.sidebar > p > i {
  font-size: 12px;
  position: relative;
  top: 3px;
  margin-right: 0.25rem;
}
.dob {
  margin-top: 1rem !important;
  text-transform: uppercase;
  font-size: 11px;
  color: #353f58 !important;
}
</style>
