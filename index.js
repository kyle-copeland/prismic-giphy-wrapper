const express = require('express');
const app = express();
const rp = require('request-promise');

app.get('/', (req, res) => {

    rp('http://api.giphy.com/v1/gifs/search?api_key=VU0MWvV9PyOQln4z3PtKGbHUDiwfZAtm&q=tracer&limit=5&rating=pg')
    .then(data => {
        const json = JSON.parse(data);
        const results = json.data.map(gif => {
            return {
                id: gif.id,
                title:  gif.title,
                description: gif.slug,
                image_url: gif.images.fixed_width_small_still.url,
                last_update: 0,
                blob: gif
            }
        });
        res.send({
            results_size: json.data.length,
            results: results
          }); 
    });
     

});


app.listen(process.env.PORT || 3000);