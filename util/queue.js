const Job = require('./job');

class Queue {
    constructor() {
        this.queue = [];
    }

    size() {
        return this.queue.length;
    }

    insert(id) {
        if (this.get(id) == null) {
            this.queue.push(new Job(id));
            console.log(`[INSERT] - ${id} inserted into queue`);
        }
    }

    remove(id) {
        this.queue.forEach((job, i) => {
            if (job.job_id == id) this.queue.splice(i, 1);
        });
    }

    get(id) {
        this.queue.forEach(job => {
            if (job.job_id == id) return job;
        });
        return null;
    }
}

module.exports = Queue;