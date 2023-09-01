const router = require('express');
const Movie = require("../moduls/movies");
const { model } = require('mongoose');
const movies = require('../moduls/movies');
const Moviess = require('../config/movies.json')

router("/hello", () => {
    console.log("Hello ");
})
router("/movies", async(req, res) =>{
    try {
        const page = parseInt(req.query.page) -1 || 0;
        const limit = parseInt(req.query.limit) || 5;
        const search = req.query.search || "";
        let sort = req.query.sort || "rating";
        let genre = req.query.genre || "All";

        const genreOptions = [
            "Action",
            "Romance",
            "Drama",
            "Crime",
            "Adventure",
            "Thriller",
            "Sci-fi",
            "music",
            "Family"
        ];
        genre === "All" ? (genre = [...genreOptions])
                        : (genre = req.query.genre.split(","));
        req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort])

        let sortBy = {};
        if(sort[1]){
            sortBy[sort[0]] = sort[1];
        }else{
            sortBy[sort[0] = "asc"];
        }
        //fine filter
        const movies = await Movie.find({ name :{ $regex: search, $options: "i"}})
        .where("genre")
        .in([...genre])
        .sort(sortBy)
        .skip(page*limit)
        .limit(limit);

        const total = await Movie.countDocuments({
            genre: { $in: [...genre]},
            name: {$regex: search, $options: "i"},
        });

        const response = {
            error: false,
            total,
            page: page +1,
            limit,
            genres: genreOptions,
            movies
        };
        res.status(200).json({
            response,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: true,
            message: "Internal Server Error",

        })
    }
})

// const insertMovies = async () =>{
//     try {
//         const doc = await Movie.insertMany(Moviess);
//         return Promise.resolve(doc);
//     } catch (error) {
//         return Promise.reject(error)
//     }
// }

// insertMovies()
// .then((docs) => {
//     console.log(docs);
// })
// .catch((err) => console.log(err));
 
module.exports = router;