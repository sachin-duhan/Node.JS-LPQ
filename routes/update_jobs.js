const router = require('express').Router();

router.get('/', (req, res) => {
    const { queue } = req;
    return res.status(200).json(queue);
});

router.put('/complete/:job_id', (req, res, next) => {
    const { queue } = req;
    queue.remove(job_id);
    return res.status(200).json({ jobs: queue });
});

module.exports = router;