const { Workout } = require("../models");

module.exports = function(app) {
  // this route should find all workouts in the table and display them as JSON
  app.get("/api/workouts", (req, res) => {
    Workout.find({})
      .then(workout => {
        res.json(workout);
      })
      .catch(err => {
        res.json(err);
      });
  });

  app.put("/api/workouts/:id", function(req, res) {
    const id = req.params.id;
    Workout.findByIdAndUpdate(id, {
      $push: { exercises: req.body }
    })
      .then(workout => {
        res.json(workout);
      })
      .catch(err => {
        res.json(err);
      });
  });

  app.post("/api/workouts/", (req, res) => {
    Workout.create(req.body)
      .then(workout => {
        res.json(workout);
      })
      .catch(err => {
        res.json(err);
      });
  });

  app.get("/api/workouts/range", (req, res) => {
    Workout.find({})
      .then(workout => {
        res.json(workout);
      })
      .catch(err => {
        res.json(err);
      });
  });
};