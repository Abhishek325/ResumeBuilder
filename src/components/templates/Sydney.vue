<template>
  <div
    class="card"
    id="resumeView"
    :style="{ transform: `scaleX(${scaleX}) scaleY(${scaleY})` }"
  >
    <div class="card-content" style="padding: 0 9px 0 9px;">
      <div class="row" style="width:104%;margin-top: -0.4rem;">
        <div class="col s12 m12 content" style="padding-right:0">
          <div class="col s8 m8 content" style="padding-top:1rem;">
            <div class="col s12 section">
              <div class="row valign-wrapper">
                <div class="col s3">
                  <img
                    :src="formData.photo_url"
                    alt=""
                    class="circle responsive-img"
                  />
                </div>
                <div class="col s9">
                  <h5>{{ formData.first_name }} {{ formData.last_name }}</h5>
                  <p class="font-italic title text-uppercase">
                    {{ formData.job_title }}
                  </p>
                </div>
              </div>
            </div>
            <div class="col s12 m12 section" style="margin-bottom: 1rem;">
              <h6>Profile</h6>
              <p class="employment-summary" v-html="formData.summary"></p>
            </div>
            <div class="col s12 m12 section">
              <h6>Employment history</h6>
              <section
                v-for="(item, index) in formData.employment_history"
                :key="`employment-${index}`"
              >
                <p class="job-title black-text darken-2">
                  {{ item.employment_history_job_title }}, {{ item.employer }},
                  {{ item.city }}
                </p>
                <p class="job-duration text-uppercase">
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
            <h6>Details</h6>
            <p class="contact">{{ formData.pd_city }}</p>
            <p class="contact">{{ formData.phone }}</p>
            <p class="contact">
              {{ formData.email }}
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
}
a {
  text-decoration: underline;
}
h6 {
  text-transform: capitalize;
  font-weight: 600;
  color: #222;
}
.content,
h5 {
  color: #222;
}
.sidebar > h6,
a {
  color: #fff;
}
.card-content {
  background: #fff !important;
}
.job-title {
  font-size: 15px;
}
.title {
  font-size: 12px;
  margin-top: -0.5rem !important;
}
.job-duration {
  color: #c3c7cd;
  font-size: 13px;
  margin-bottom: -0.75rem !important;
}
.employment-summary > p {
  padding-top: 1rem !important;
}
.sidebar {
  background: #082a4d;
  color: #eee;
  padding-top: 5.15rem;
  padding-left: 1.5rem;
  height: 304mm;
}
.dob {
  margin-top: 1rem !important;
  text-transform: uppercase;
  font-size: 11px;
  color: #445e78 !important;
}
</style>
