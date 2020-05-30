import { v4 as uuidv4 } from "uuid";

const STORAGE_SERVICE = {
  getResumeList() {
    return JSON.parse(localStorage.getItem("resumeList"));
  },
  getResumeById(id) {
    const resumeList = this.getResumeList();
    return resumeList.find((x) => x.id === id);
  },
  duplicateResume(resume) {
    const resumeList = this.getResumeList() || [];
    resume.id = uuidv4();
    resume.created_at = new Date();
    delete resume.updated_at;
    resumeList.push(resume);
    localStorage.setItem("resumeList", JSON.stringify(resumeList));
  },
  saveResume(resume) {
    var resumeList = this.getResumeList() || [];
    if (resume.id && resumeList.length > 0) {
      resume.updated_at = new Date();
      const index = resumeList.findIndex((x) => x.id === resume.id);
      resumeList[index] = resume;
    } else {
      resume.id = uuidv4();
      resume.name = resume.name || "Untitled";
      resume.resume_template = resume.resume_template || "NewYork";
      resume.created_at = new Date();
      resumeList.push(resume);
    }
    localStorage.setItem("resumeList", JSON.stringify(resumeList));
  },
  deleteResume(resumeId) {
    var resumeList = this.getResumeList();
    resumeList = resumeList.filter((x) => x.id !== resumeId);
    localStorage.setItem("resumeList", JSON.stringify(resumeList));
  },
};
export default STORAGE_SERVICE;
