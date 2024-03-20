const GameRepository = require("../repositories/gameRepository.js")
const { Op } = require("sequelize");
const DEFAULT_LIMIT = 10;
const DEFAULT_PAGE = 1;

class GameService {

    // Business Logic
    // filter
    // pagination
    // array
    static findAll = async (params) => {
        try {

            let {title, categories, platforms, year, limit, page} = params;

            let filterOptions = {
                where: {}
            } 

            let titleFilter = {}
            let categoriesFilter = {}
            let platformsFilter = {}
            let yearFilter = {}

            if(title) 
                titleFilter = {
                    title: {
                        [Op.iLike]: `%${title}%`
                    }
                }

            if(categories) 
                categoriesFilter = {
                    categories: {
                        [Op.iLike]: `%${categories}%`
                    }
                }

            if(platforms) 
                platformsFilter = {
                    platforms: {
                        [Op.iLike]: `%${platforms}%`
                    }
                }

            if(year) 
                yearFilter = {
                    year: +year
                }

            
            filterOptions.where = {
                ...titleFilter,
                ...categoriesFilter,
                ...platformsFilter,
                ...yearFilter
            }


            limit = +limit || DEFAULT_LIMIT;
            page = +page || DEFAULT_PAGE;
            const offset = (page - 1) * limit;

            filterOptions.limit = limit;
            filterOptions.offset = offset;

            const {count, rows} = await GameRepository.findAll(filterOptions);

            let totalPages = Math.ceil(count / limit)
            let nextPage = (page + 1) < totalPages ? page + 1 : null
            let prevPage = (page - 1) > 0 ? page - 1 : null
            let currentPage = page

            return {
                data: rows,
                totalData: count,
                totalPages,
                currentPage,
                nextPage,
                prevPage
            };
        } catch(err) {
            throw err
        }
    }

    static findOne = async (id) => {
        try {
            const filterOptions = {
                where: {
                    id
                }
            }

            const game = await GameRepository.findOne(filterOptions);
            if(!game) 
                throw {name: "ErrorNotFound", message: "Game Not Found"}
            
            
            return game;
        } catch(err) {
            throw err
        }


    }

    static create = async (params) => {
        try {
            const game = await GameRepository.create(params);
            return game;
        } catch(err) {
            throw err;
        }
    }

    static uploads = async (file) => {
        try {
            if(file) {
                // create url
                const url = `${process.env.BASE_URL}/api/images/${file.filename}`

                return url;
            } else {
                throw {name: "MissingFile"}
            }
        } catch(err) {
            throw err;
        }
    }

    static update = async (params) => {
        try {
            const {id, body} = params;

            await GameRepository.update(id, body);
        } catch(err) {
            throw err;
        }
    }

    static destroy = async (id) => {
        try {
            const filterOptions = {
                where: {
                    id
                }
            }
            await GameRepository.destroy(filterOptions)
        } catch(err) {
            throw err;
        }
    }
}

module.exports = GameService;