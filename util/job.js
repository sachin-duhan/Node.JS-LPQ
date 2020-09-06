class Job {
    constructor(job_id) {
        this.job_id = job_id;
        this.start_time = new Date();
        this.is_job_ended = false;
    }

    mark_job_ended() { this.is_job_ended = true; }

    update_job(job_id, start_time, is_job_ended) {
        this.job_id = job_id;
        this.start_time = start_time;
        this.is_job_ended = is_job_ended;
    }
}

module.exports = Job;