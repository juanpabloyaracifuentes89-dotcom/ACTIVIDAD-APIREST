const { Router } = require("express");

const {
    getMedias,
    createMedia,
    updateMedia,
    deleteMedia
} = require("../controllers/mediacontrollers");

const router = Router();

router.get("/", getMedias);

router.post("/", createMedia);

router.put("/:id", updateMedia);

router.delete("/:id", deleteMedia);

module.exports = router;