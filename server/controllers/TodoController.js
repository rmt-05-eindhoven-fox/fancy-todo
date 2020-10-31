const { Todo } = require("../models")

class TodoController {
  static getTodo(req, res, next) {
    Todo.findAll({
      order: [["id", "ASC"]],
      where: {
        UserId: req.loggedInUser.id
      }
    })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        next(err)
      })
  }

  static postTodo(req, res, next) {
    const { google } = require("googleapis")
    const { OAuth2 } = google.auth
    const oAuth2Client = new OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET)
    console.log(oAuth2Client)
    oAuth2Client.setCredentials({
      refresh_token: process.env.REFRESH_TOKEN
    })
    const calendar = google.calendar({ version: "v3", auth: oAuth2Client })
    const eventStartTime = new Date(req.body.due_date)
    const eventEndTime = new Date(req.body.due_date)
    eventEndTime.setMinutes(eventEndTime.getMinutes() + 60)

    const event = {
      summary: req.body.title,
      description: req.body.description,
      colorId: 6,
      start: {
        dateTime: eventStartTime,
      },
      end: {
        dateTime: eventEndTime,
      }
    }
    console.log(event)
    calendar.freebusy.query(
      {
        resource: {
          timeMin: eventStartTime,
          timeMax: eventEndTime,
          items: [{ id: "primary" }]
        },
      },
      (err, res) => {
        // Check for errors in our query and log them if they exist.
        if (err) return console.error('Free Busy Query Error: ', err)

        // Create an array of all events on our calendar during that time.
        const eventArr = res.data.calendars.primary.busy

        // Check if event array is empty which means we are not busy
        if (eventArr.length === 0) {
          // If we are not busy create a new calendar event.
          return calendar.events.insert(
            { calendarId: 'primary', resource: event },
            err => {
              // Check for errors and log them if they exist.
              if (err) return console.error('Error Creating Calender Event:', err)
              // Else log that the event was created.
              return console.log('Event created successfully.')
            })
        }
        // If event array is not empty log that we are busy.
        return console.log(`Sorry I'm busy for that time...`)
      }
    )
    // console.log(req.body)
    const data = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date,
      UserId: req.loggedInUser.id
    }
    Todo.create(data)
      .then(data => {
        res.status(201).json(data)
      })
      .catch(err => {
        next(err)
      })
  }

  static getTodoById(req, res, next) {
    Todo.findByPk(req.params.id)
      .then(data => {

        res.status(200).json(data)

      })
      .catch(err => {
        next(err)
      })
  }

  static putTodoById(req, res, next) {
    const { title, description, status, due_date } = req.body

    Todo.update({ title, description, status, due_date }, { where: { id: req.params.id }, returning: true })
      .then(data => {
        res.status(200).json(data[1][0])
      })
      .catch(err => {
        next(err)
      })
  }

  static patchTodoById(req, res, next) {
    const { status } = req.body

    Todo.update({ status }, { where: { id: req.params.id }, returning: true })
      .then(data => {
        res.status(200).json(data[1][0])
      })
      .catch(err => {
        next(err)
      })
  }

  static deleteTodoById(req, res, next) {
    Todo.destroy({ where: { id: req.params.id } })
      .then(data => {
        res.status(201).json({ message: "todo success to delete" })
      })
      .catch(err => {
        next(err)
      })
  }

}

module.exports = TodoController