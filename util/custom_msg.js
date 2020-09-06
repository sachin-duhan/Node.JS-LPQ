// this is just the custom message that I'm using when '/' route loaded!

const message = (req, res) => {
    const _baseURL = req.protocol + '://' + req.get('host');
    const msg = {
        status: 'ok',
        message: 'Long-running process Queue by Sachin Duhan',
        author: {
            name: 'Sachin Duhan',
            details: 'http://sachinduhan.me',
            github: 'https://github.com/sachin-duhan26'
        },
        routes: [{
                method: 'POST',
                path: `${_baseURL}/add`,
                role: 'List of jobs currently in queue. This route also add a new job to the in memory queue.'
            },
            {
                method: 'GET',
                path: `${_baseURL}/result/:job_id`,
                role: 'sends back the result of the job in the queue.'
            },
            {
                method: 'GET',
                path: `${_baseURL}/monitor/:job_id`,
                role: 'sends back the monitor result of the job in the queue.'
            },
            {
                method: 'PUT',
                path: `${_baseURL}/jobs/remove/:job_id`,
                role: 'updates the status of the job in the queue!'
            },
            {
                method: 'GET',
                path: `${_baseURL}/jobs`,
                role: 'return the current list of the jobs in the queue!'
            },
        ]
    };
    return msg;
};

module.exports = message;