import express from 'express'

const router = express.Router()

router.get('/', async (req, res) => {
    req.logger.debug("Debug");
    req.logger.http("Http");
    req.logger.warning("Info");
    req.logger.warning("Warning");
    req.logger.warning("Error");
    req.logger.warning("Fatal");
    res.send({ message: "Test logger" })
})

export default router;