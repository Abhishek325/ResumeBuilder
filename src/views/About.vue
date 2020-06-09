<template>
  <div class="row" :class="{ container: !embedded }">
    <div class="col m8" v-if="!embedded">
      <h5>About this project</h5>
    </div>
    <div class="col m12">
      <div class="card medium">
        <div class="card-content">
          <div class="col m6">
            <span class="card-title"
              >Get started with your resume creation in simple steps:
            </span>
            <ol>
              <li>Select a template from the library</li>
              <li>Build your resume providing the necessary details</li>
              <li>Print/Download your resume and get it ready to send</li>
            </ol>
            <p>
              Click
              <router-link to="/resume/add">here</router-link> to start filling
              in the details.
            </p>
          </div>
          <div class="col m6">
            <span class="card-title">Current features</span>
            <ol>
              <li>
                Regulary updated templates library
              </li>
              <li>Re-order skills and profile links</li>
              <li>Switch themes - <b>Dark mode</b> included!</li>
              <li>Duplicate an existing resume for last minute tweaks!</li>
              <li>Just in time validations!</li>
            </ol>
          </div>
          <div class="col m12">
            <blockquote>
              An Open-Source resume maker to build your profile! No more "Get
              premium" popups for fancy templates, no more "Create account to
              get started", Just fill and save!
            </blockquote>
          </div>
          <div class="col m12">
            <a
              href="https://github.com/Abhishek325/ResumeBuilder"
              target="_blank"
              rel="noopener noreferrer"
              >Github repository <i class="material-icons">open_in_new</i></a
            >
            <p style="margin-top:0.75rem">
              Built with <code>vue.js</code> ,
              <code>materializecss</code> framework!
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
    embedded: Boolean,
  },
};
</script>
<style scoped>
.card {
  height: auto;
}
i {
  position: relative;
  font-size: 18px;
  top: 0.25rem;
}
</style>
