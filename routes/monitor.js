const router = require('express').Router();

router.get('/:job_id', (req, res) => {
    const { queue } = req;
    const { job_id } = req.params;
    if (queue.get(job_id)) {
        res.header('Location', `/result/${job_id}`);
        return res.status(201).json(queue.get(job_id));
    } else return res.status(200).json({ job_id: 'still working...', total: queue.size() });
});

module.exports = router;