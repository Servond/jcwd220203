require("dotenv/config")
const express = require("express")
const cors = require("cors")
const { join } = require("path")
const db = require("../models")
const { verifyToken } = require("../middlewares/authMiddleware")

const fs = require("fs")

// Import Routes
const profileRoute = require("../routes/profileRoute")
const authRoute = require("../routes/authRoute")
const warehouseRoute = require("../routes/warehouseRoute.js")
const userDataRoute = require("../routes/userDataRoute")
const adminRoute = require("../routes/adminRoute")
const productRoute = require("../routes/productRoute")
const addressRoute = require("../routes/addressRoute")
const adminProductRoute = require("../routes/adminProductRoute.js")
const adminTransactionRoute = require("../routes/adminTransactionRoute")
const PORT = process.env.PORT || 8000
const app = express()
app.use(
    cors()
    //     {
    //     origin: [
    //         process.env.WHITELISTED_DOMAIN &&
    //             process.env.WHITELISTED_DOMAIN.split(","),
    //     ],
    // }
)

app.use(express.json())

//#region API ROUTES

// ===========================
// NOTE : Add your routes here
app.use("/admin", adminRoute)

app.use("/warehouse", warehouseRoute)
app.use("/userData", userDataRoute)
app.use("/product", productRoute)
app.use("/admin/transaction", adminTransactionRoute)
app.use("/auth", authRoute)

app.use("/profile", verifyToken, profileRoute)
app.use(
    "/admin/product",
    // verifyToken,
    adminProductRoute
)

app.use("/public", express.static("public"))
app.use("/address", addressRoute)

app.use("/product", productRoute)

app.use("/product", productRoute)

app.use("/product", productRoute)

app.use("/product", productRoute)

app.use("/product", productRoute)

app.get("/api", (req, res) => {
    res.send(`Hello, this is my API`)
})

app.get("/api/greetings", (req, res, next) => {
    res.status(200).json({
        message: "Hello, Student !",
    })
})

// ===========================

// not found
app.use((req, res, next) => {
    if (req.path.includes("/api/")) {
        res.status(404).send("Not found !")
    } else {
        next()
    }
})

// error
app.use((err, req, res, next) => {
    if (req.path.includes("/api/")) {
        console.error("Error : ", err.stack)
        res.status(500).send("Error !")
    } else {
        next()
    }
})

//#endregion

//#region CLIENT
const clientPath = "../../client/build"
app.use(express.static(join(__dirname, clientPath)))

// Serve the HTML page
app.get("*", (req, res) => {
    res.sendFile(join(__dirname, clientPath, "index.html"))
})

//#endregion

app.listen(PORT, (err) => {
    if (err) {
        console.log(`ERROR: ${err}`)
    } else {
        db.sequelize.sync({ alter: true })
        if (!fs.existsSync("public")) {
            fs.mkdirSync("public")
        }
        console.log(`APP RUNNING at ${PORT} ✅`)
    }
})
