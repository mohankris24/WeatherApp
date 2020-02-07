const express = require('express');
const path = require('path');
const hbs = require('hbs');
const MainAPI = require('./MainAPI');
const jsonMerger = require('json-merger');

const render_object = {
        title: 'Perfect Weather',
        name: 'Mohan Krishna'
}

const webapp = express();
const port = process.env.PORT || 3000

// set access paths for express configuration
const publicDirectory = path.join(__dirname, '../public');
console.log(publicDirectory)
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
//const ScriptPath = path.join(__dirname, './fetch.js');


webapp.use(express.static(publicDirectory));

// Set up Handlebars engine and views folder
webapp.set('view engine','hbs');
webapp.set('views', viewPath);
hbs.registerPartials(partialsPath);

console.log(viewPath)
console.log(partialsPath)
//console.log(ScriptPath)


webapp.get('',(req, res) => {
    res.render('index', render_object)
});


webapp.get('/location', (req, res) => {
    console.log(req.query.address)
    if (!req.query.address) {
        return res.send({
            error: 'Please provide location information'
        })
    } else {
        console.log('req.query.address')
        const location = req.query.address
        console.log(location)
        MainAPI(location, (error, data) => {
        if (error) {
            res.send({error: error});
        } else {
            console.log('MainAPI: ' + data);
            var renderdata = jsonMerger.mergeObjects([render_object, data]); 
        //    res.render('location', renderdata)
            res.send(renderdata)
        }
        })       
    }
})

webapp.get('/location/*',(req, res) => {
    res.send('404 Page not found')
})

webapp.listen(port, () => {
    console.log('Server is up @port ' + port);
})