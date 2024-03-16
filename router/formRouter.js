const express = require("express");
const { Courses } = require('../db/model');
const router = express.Router();

router.post("/course", async (req, res) => {
  try {
    const newCourse = new Courses({
      name: req.body.name,
      description: req.body.description,
      enrollment: Number.parseFloat(req.body.enrollment),
      price: Number.parseFloat(req.body.price),
      duration: Number.parseFloat(req.body.duration),
      contactNumber: req.body.contactNumber,
    });
    const resp = await newCourse.save();
    res.send(newCourse);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.get("/course/:id", async (req, res) => {
  try {
    Courses.findOne({ id: req.params.id }).then(course => {
      res.send(course);
    }).catch(error => {
      console.log(error);
      res.status(500).send(error);
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.get("/courses", (req, res) => {
  const isHidden = req.query.hidden;
  const isBookmarked = req.query.bookmarked;
  const isReported = req.query.reported;
  let filter = { isHidden: false }
  if ((String(isHidden).toLowerCase() === 'true')) {
    filter.isHidden = true;
  }
  if ((String(isBookmarked).toLowerCase() === 'true')) {
    filter.isBookmarked = true;
  }
  if ((String(isReported).toLowerCase() === 'true')) {
    filter.isReported = true;
  }
  if (req.query.sortby) {
    let sortObject = {};
    let stype = req.query.sortby;
    let sdir = req.query.sortorder;
    sortObject[stype] = sdir;
    Courses.find(filter).sort(sortObject).then(courses => {
      res.send(courses);
    }).catch(error => {
      console.log(error);
      res.status(500).send(error);
    });
  } else
    Courses.find(filter).then(courses => {
      res.send(courses);
    }).catch(error => {
      console.log(error);
      res.status(500).send(error);
    });
});

router.patch('/courses/:id', (req, res) => {
  console.log(req.body)
  Courses.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  ).then(course => {
    res.send({ course, mesg: "Succesfully updated" });
  }).catch(err => {
    console.log("Error is: " + err);
    res.status(500).send(error);
  });
})

module.exports = router;
