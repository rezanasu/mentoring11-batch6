const {Game} = require("../models")

class GameRepository {

    static findAll = async (params) => {
        try {
            const {count, rows} = await Game.findAndCountAll(params);
            return {
                count,
                rows
            };
        } catch(err) {
            throw err;
        }
    }

    static findOne = async (params) => {
        try {
            const game = await Game.findOne(params);
            return game;
        } catch(err) {
            throw err;
        }
    }

    static create = async (params) => {
        try {
            const game = await Game.create(params, {
                returning: true
            })

            return game;
        } catch(err) {
            throw err;
        }
    }

    static update = async (id, body) => {
        try {
            const game = await Game.findOne({
                where: {
                    id
                }
            })

            if(!game)
                throw {name: "ErrorNotFound", message: "Game not found"}

            await game.update(body)
        } catch(err) {
            throw err;
        }
    }

    static destroy = async (params) => {
        try {
            const game = await Game.findOne(params)

            if(!game)
                throw {name: "ErrorNotFound", message: "Game not found"}

            await game.destroy()
        } catch(err) {
            throw err;
        }
    }
}

module.exports = GameRepository;