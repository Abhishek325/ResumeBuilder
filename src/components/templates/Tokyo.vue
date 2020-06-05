<template>
  <div
    class="card"
    id="resumeView"
    :style="{ transform: `scaleX(${scaleX}) scaleY(${scaleY})` }"
  >
    <div class="card-content" style="padding: 0 11px;">
      <div class="row">
        <div class="col s12 m12 header">
          <div class="row valign-wrapper">
            <div class="col s2">
              <img
                :src="formData.photo_url"
                alt=""
                class="circle responsive-img"
              />
            </div>
            <div class="col s10">
              <h5>{{ formData.first_name }} {{ formData.last_name }}</h5>
              <p class="font-italic title text-uppercase">
                {{ formData.job_title }}
              </p>
            </div>
          </div>
        </div>
        <div class="col s8 m8 content" style="padding-right:2px;">
          <!-- <div
            class="col s12 m12"
            style="margin-top:0.5rem;padding-bottom:1rem;"
          >
            <div class="col s5 m5 contact">
              <i class="material-icons">email</i> {{ formData.email }}
            </div>
            <div class="col s3 m3 contact">
              <i class="material-icons">location_on</i> {{ formData.pd_city }}
            </div>
            <div class="col s4 m4 contact">
              <i class="material-icons">phone</i> {{ formData.phone }}
            </div>
          </div> -->
          <div class="col s12 m12 section">
            <h6>Profile</h6>
            <p class="employment-summary" v-html="formData.summary"></p>
          </div>
          <div class="col s12 m12 section">
            <h6>Employment History</h6>
            <section
              v-for="(item, index) in formData.employment_history"
              :key="`employment-${index}`"
            >
              <p class="job-title black-text darken-2">
                {{ item.employment_history_job_title }}
              </p>
              <p class="job-duration">
                {{ item.employer }}, {{ item.city }} / {{ item.start_date }}
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
              <p class="employment-summary" v-html="item.education_summary"></p>
            </section>
          </div>
        </div>
        <div class="col s4 m4 sidebar">
          <h6>Details</h6>
          <p class="contact">{{ formData.pd_city }}</p>
          <p class="contact">{{ formData.phone }}</p>
          <p class="contact">
            {{ formData.email }}
          </p>
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
  background: #353cac;
  color: #fff;
  padding: 1.5rem 2rem 1rem 2rem;
}
.content > .section {
  padding-left: 1.5rem;
}
.card-content {
  background: #fff !important;
}
.content,
a {
  color: #000;
  background: #fff;
}
h5 {
  font-weight: 800;
  font-style: italic;
}
h6 {
  color: #222;
  font-weight: 600;
  font-style: italic;
}
.contact {
  margin-top: 0.5rem;
  font-size: 11px;
}
.sidebar > .contact {
  font-size: 13px;
}
.sidebar > p > a {
  font-size: 13px;
  text-decoration: underline;
}
.contact > i,
.skill {
  font-size: 12px;
  margin-bottom: 0.25rem !important;
}
.contact > i {
  color: #353cac;
  position: relative;
  top: 2px;
}
.sidebar {
  background: #fff;
  padding-top: 1.5rem;
  padding-left: 1rem;
  height: 269mm;
  color: #000 !important;
  border-left: 1px solid #eee;
}
.content {
  padding-top: 1.5rem;
}
.title {
  font-size: 12px;
  margin-top: -0.25rem !important;
}
.job-duration {
  color: #bbb;
  font-size: 13px;
  font-style: italic;
  margin-bottom: -0.75rem !important;
}
</style>
