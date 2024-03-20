const GameService = require("../services/gameService.js")

class GameController {

    // List Games with filters
    static findAll = async (req, res, next) => {
        try {
           const games = await GameService.findAll(req.query);
           res.status(200).json(games);
        } catch(err) {
            next(err)
        }   
    }

    // Search game by id
    static findOne = async (req, res, next) => {
        try {
            const game = await GameService.findOne(req.params.id);
            res.status(200).json({
                data: game
            })
        } catch(err) {
            next(err)
        }
    }

    // create game
    static create = async (req, res, next) => {
        try {
            const game = await GameService.create(req.body);

            res.status(201).json({
                message: "Games added successfully",
                data: game
            })
        } catch(err) {
            next(err)
        }
    }

    // update game
    static update = async (req, res, next) => {
        try {
            const params = {
                id: req.params.id,
                body: req.body
            }
            
            await GameService.update(params);

            res.status(200).json({message: "Games updated successfully"})
        } catch(err) {
            next(err)
        }
    }

    static uploads = async (req, res, next) => {
        try {
            const url = await GameService.uploads(req.file);

            res.status(201).json({
                message: "Upload success",
                image_url: url
            })
        } catch(err) {
            next(err)
        }
    }

    // destroy
    static destroy = async (req, res, next) => {
        try {

            await GameService.destroy(req.params.id)

            res.status(200).json({message: "Game deleted successfully"});
        } catch(err) {
            next(err)
        }
    }
}

module.exports = GameController;