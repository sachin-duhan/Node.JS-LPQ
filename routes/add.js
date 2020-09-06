const router = require('express').Router();

router.post('/', (req, res) => {
    const { queue } = req;
    const job_id = Math.random();
    res.header('Location', `/monitor/${job_id}`);
    queue.insert(`${job_id}`);
    return res.status(202).json(queue);
});

module.exports = router;