const router = require('express').Router();

router.get('/:job_id', (req, res, next) => {
    const { queue } = req;
    const job = queue.get(req.params.job_id);
    if (job) return res.status(200).json({ job });
    else return res.status(422).json({
        message: `job completed successfully!.`,
        remaining: queue.size()
    });
});

module.exports = router;