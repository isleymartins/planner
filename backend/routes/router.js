const router  = require("express").Router();

const tripsRouter = require("./trips");

router.use("/",tripsRouter)

const activitiesRouter = require("./activities");

router.use("/",activitiesRouter)

/*const activityRouter = require("./activity");

router.use("/",activityRouter)*/
/*const arquivoRouter = require("./arquivo");

router.use("/",arquivoRouter)*/

module.exports = router;