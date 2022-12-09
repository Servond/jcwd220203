const db = require("../models")
const { Op } = require("sequelize")
const bcrypt = require("bcrypt")
const fs = require("fs")

const User = db.User

const profileController = {
    getUserProfileById: async (req, res) => {
        try {
            const { id } = req.params

            const findUserById = await User.findByPk(id)

            return res.status(200).json({
                message: "Get user by id",
                data: findUserById,
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                message: "Server Error",
            })
        }
    },

    editUserProfile: async (req, res) => {
        const path = "public/"
        const fileName = await User.findOne({
            where: {
                id: req.params.id,
            },
        })
        try {
            if (req.file) {
                req.body.profile_picture = req.file.filename
            }

            const { username, phone_number, profile_picture, email } = req.body

            await User.update(
                {
                    username,
                    email,
                    profile_picture,
                    phone_number,
                },
                { where: { id: req.user.id } }
            )

            fs.unlinkSync(path + fileName.profile_picture)

            const findUserById = await User.findByPk(req.user.id)
            return res.status(200).json({
                message: "Data updated",
                data: findUserById,
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                message: "Server Error",
            })
        }
    },

    editPassword: async (req, res) => {
        try {
            const { password } = req.body
            const findUserById = await User.findByPk(req.user.id)

            const hashedPassword = bcrypt.hashSync(password, 5)

            await User.update(
                { password: hashedPassword },
                { where: { id: req.user.id } }
            )

            return res.status(200).json({
                message: "Password Updated",
                data: findUserById,
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                message: "Server Error",
            })
        }
    },
}

module.exports = profileController
