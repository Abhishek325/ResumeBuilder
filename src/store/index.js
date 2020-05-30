import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    resume_title: "",
    resume_template: "",
    job_title: "",
    photo_url: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    dob: "",
    pd_city: "",
    summary: "",
    employment_history: [],
    education: [],
    links: [],
    skills: [],
  },
  mutations: {
    setFieldValue(state, payload) {
      state[payload.fieldId] = payload.value;
    },
    setNewMultiRecord(state, payload) {
      switch (payload.type) {
        case "employment history":
          if (
            state.employment_history_job_title &&
            state.employer &&
            state.start_date &&
            state.city &&
            state.employment_summary
          ) {
            state.employment_history.push({
              employment_history_job_title: state.employment_history_job_title,
              employer: state.employer,
              start_date: state.start_date,
              city: state.city,
              employment_summary: state.employment_summary,
            });
            delete state.employment_history_job_title;
            delete state.employer;
            delete state.start_date;
            delete state.city;
            delete state.employment_summary;
          }
          break;
        case "education":
          if (
            state.school &&
            state.degree &&
            state.school_start_date &&
            state.school_end_date &&
            state.school_city &&
            state.education_summary
          ) {
            state.education.push({
              school: state.school,
              degree: state.degree,
              school_start_date: state.school_start_date,
              school_end_date: state.school_end_date,
              school_city: state.school_city,
              education_summary: state.education_summary,
            });
            delete state.school;
            delete state.degree;
            delete state.school_start_date;
            delete state.school_end_date;
            delete state.school_city;
            delete state.education_summary;
          }
          break;
        case "website and social links":
          if (state.label && state.link) {
            state.links.push({
              label: state.label,
              link: state.link,
            });
            delete state.label;
            delete state.link;
          }
          break;
        case "skills":
          if (state.skill) {
            if (state.skill.includes(",")) {
              state.skill.split(",").forEach((s) => {
                if (s.trim()) state.skills.push(s.trim());
              });
            } else state.skills.push(state.skill);
            delete state.skill;
          }
          break;
      }
    },
    updateMultiRecord(state, payload) {
      switch (payload.type) {
        case "employment history":
          state.employment_history[payload.index][payload.fieldId] =
            payload.value;
          delete state.employment_history_job_title;
          delete state.employer;
          delete state.start_date;
          delete state.city;
          delete state.employment_summary;
          break;
        case "education":
          state.education[payload.index][payload.fieldId] = payload.value;
          delete state.school;
          delete state.degree;
          delete state.school_start_date;
          delete state.school_end_date;
          delete state.school_city;
          delete state.education_summary;
          break;
      }
    },
    deleteMultiRecord(state, payload) {
      switch (payload.type) {
        case "employment history":
          state.employment_history.splice(payload.index, 1);
          break;
        case "education":
          state.education.splice(payload.index, 1);
          break;
        case "website and social links":
          state.links.splice(payload.index, 1);
          break;

        case "skills":
          state.skills.splice(payload.index, 1);
          break;
      }
    },
    setStoreValues(state, payload) {
      Object.assign(state, payload);
    },
    // eslint-disable-next-line no-unused-vars
    clearStoreValues(state) {
      delete state.id;
      delete state.created_at;
      delete state.udpated_at;
      state.resume_title = "";
      state.job_title = "";
      state.first_name = "";
      state.last_name = "";
      state.email = "";
      state.phone = "";
      state.dob = "";
      state.pd_city = "";
      state.summary = "";
      state.employment_history = [];
      state.education = [];
      state.links = [];
      state.skills = [];
    },
    setListOrder(state, payload) {
      state[payload.type] = payload.value;
    },
    setResumeTemplate(state, template) {
      state.resume_template = template;
    },
  },
  actions: {},
  modules: {},
});
