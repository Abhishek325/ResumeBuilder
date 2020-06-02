<template>
  <div
    class="card z-depth-3"
    id="resumeView"
    :style="{ transform: `scaleX(${scaleX}) scaleY(${scaleY})` }"
  >
    <div class="card-content" style="padding:0;">
      <div class="row" style="width:102%;">
        <div class="col m8 s8">
          <div
            class="row valign-wrapper"
            style="padding:1rem;margin-bottom:-0.5rem"
          >
            <div class="col s3">
              <img
                :src="formData.photo_url"
                alt=""
                class="circle responsive-img"
              />
            </div>
            <div class="col s9">
              <h5>{{ formData.first_name }} {{ formData.last_name }}</h5>
              <p class="title">{{ formData.job_title }}</p>
            </div>
          </div>
          <div class="col m12 s12 detailed-view" v-if="formData.summary">
            <h6>Profile</h6>
            <p class="employment-summary" v-html="formData.summary"></p>
          </div>
          <div
            class="col m12 s12 detailed-view"
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
              <p
                class="employment-summary"
                v-html="item.employment_summary"
              ></p>
            </section>
          </div>
          <div
            class="col m12 s12 detailed-view"
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
        <div class="col m4 s4 quick-view">
          <h6 class="left-align" v-if="formData.phone || formData.email">
            Details
          </h6>
          <p>{{ formData.phone }}</p>
          <p>{{ formData.email }}</p>

          <p v-if="formData.dob" class="dob">Date of birth</p>
          <p v-if="formData.dob">{{ formData.dob }}</p>

          <h6 v-if="formData.links && formData.links.length > 0">
            Links
          </h6>
          <p v-for="(item, index) in formData.links" :key="`link-${index}`">
            <a :href="item.link" target="_blank">{{ item.label }}</a>
          </p>

          <h6 v-if="formData.skills && formData.skills.length > 0">
            Skills
          </h6>
          <p v-for="(item, index) in formData.skills" :key="`skill-${index}`">
            {{ item }}
          </p>
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
.card {
  float: none;
  border-radius: 5px;
}
.title {
  margin-top: -0.25rem !important;
  text-transform: uppercase;
  font-size: 10px;
  font-weight: 600;
}
.quick-view {
  background: #1a212f;
  color: #eee;
  min-height: 100vh;
  font-size: 11px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  padding: 6.65rem 2rem;
}
.quick-view > h6 {
  margin-top: 1.5rem;
}
a {
  color: #eee;
  text-decoration: underline;
}
.detailed-view {
  padding-left: 2rem;
}
.detailed-view > h6 {
  font-weight: 600;
}
.detailed-view > section > p {
  font-size: 12px;
  text-align: justify;
}
.dob {
  margin-top: 1rem !important;
  text-transform: uppercase;
  font-size: 9px;
  color: #666;
}
.job-title {
  font-size: 15px !important;
}
.job-duration {
  font-size: 10px;
  text-transform: uppercase;
}
.employment-summary {
  margin-top: 0.25rem !important;
  font-size: 12px;
}
</style>
