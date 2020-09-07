import axios from "axios";
import { userId } from "./serverConfigs";
import { api } from "./serverConfigs";
// import UserId from "./serverConfigs";

// const userId = localStorage.getItem('userID');
const user=localStorage.getItem("userType")
const Axios = axios.create({
  baseURL: api
});
// const userId = UserId();
export default class API {
  //registration
  static signUp(model) {
    return Axios.put("/user/sign-up", model);
  }

  //login
  static userLogin(loginModel) {
    return Axios.post("/user/login", loginModel);
  }

  //fetch All Employers
  static fetchAllEmlployers() {
    return Axios.get("/employer/all");
  }

  //fetch All jobseekers
  static fetchAlljobseekers() {
    return Axios.get("/jobseeker/all");
  }


  //profile
  static fetchProfile() {
    
    return Axios({
      url: `/jobseeker/profile?id=${userId}`
    })

  }
  static fetchPerfomance(){
   return Axios({
     url: `/jobseeker/performance?id=${userId}`
   })
  }

  static uploadImage(formData) {
    return Axios.post(`/${user}/upload?id=${userId}`, formData)
  }

  static editProfile(model) {
    return Axios.patch("/jobseeker/edit", model)
  }

  static fetchQualification() {
    return Axios({
      url: `jobseeker/fetch-qualification?id=${userId}`
    })
  }


  static editQualification(model) {
    return Axios.patch(`/jobseeker/edit-qualification`, model);
  }

  //Jobfair

  static fetchJobFairs(offSet) {
    return Axios({
      url: `/jobFair/all?page=${offSet + 1}&count=9`
    });
  }
  static fetchJobFairCount() {
    return Axios({
      url: `/jobFair/count`
    });
  }

  static fetchJobFair(id) {
    return Axios({
      url: `/jobFair/fetch?id=${id}`
    });
  }


  static fetchCandidate(model){
    return Axios.post(`/employer/fetch-jobseeker-detail`,model)
  }

  static appeared(userId,jobFairId,jobId){
    return Axios.patch(`/employer/appeared?jobFairId=${jobFairId}&jobId=${jobId}&userId=${userId}`)
  }

  static selected(userId,jobFairId,jobId){
    return Axios.patch(`/employer/selected?jobFairId=${jobFairId}&jobId=${jobId}&userId=${userId}`)
  }
  //jobs

  static fetchCompanyJobs(jobFairId, email) {
    return Axios({
      url: `jobFair/view-openings/?jobFairId=${jobFairId}&email=${email}`
    });
  }

   static fetchJobs(jobFairId) {
    return Axios({
      url: `/jobseeker/all-openings?jobFairId=${jobFairId}`
    });
  }

  static fetchDescription(model){
    return Axios.post(`/employer/company-description`,model);
  }

  static fetchMatchingJobs(jobFairId){
    return Axios({
      url: `/jobseeker/matched-openings/?jobseekerId=${userId}&jobFairId=${jobFairId}`
    });
  }
  static applyJob(jobId, jobFairId) {
    return Axios.patch(`jobseeker/apply?jobId=${jobId}&userId=${userId}&jobFairId=${jobFairId}`);
  }

  static searchLocation(model){
    return Axios.post(`/jobFair/search`,model);
  }
static fetchCandidate
  // logout 
  static logout() {
    const userId = localStorage.getItem('userID');
    return Axios({
      url: `/user/logout?id=${userId}`
    })
  }

 //Employer
  static fetchEmployer(){
    return Axios({
      url : `/employer/profile?id=${userId}`
    })
  }

  // // fetch openings 
  // static fetchOpenings() {
  //   const jobFareEmail = localStorage.getItem('email');
  //   return Axios({
  //     url: `/jobFair/view-openings?jobFairId=${jobFareID}&email=${jobFareEmail}`
  //   })
  // }

  // fetch Join openings 
  static fetchJoinOpenings(jobFareId) {
    const jobFareEmail = localStorage.getItem('email');
    return Axios({
      url: `/jobFair/view-openings?jobFairId=${jobFareId}&email=${jobFareEmail}`
    })
  }

  static deleteOpening(jobFairId,JobId) {
    if (jobFairId === null){
      jobFairId = localStorage.getItem('jobFareID')
    } 
    const jobFareEmail = localStorage.getItem('email');
    return Axios.delete(`/employer/delete-opening?jobFairId=${jobFairId}&jobId=${JobId}&email=${jobFareEmail}`)
  }

  // fetch applied Candidates
  static fetchCandidates(jobId) {
    return Axios({
      url: `/employer/applied-candidates?jobId=${jobId}`
    })
  }


}
