const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    auth: {
        user:'root',
        password:'minou'
    },
    authSource:"admin",
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});



const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i < 50; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/220381/1600x900',
            description: 'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Quisque et mauris viverra, efficitur mi quis, fermentum leo. Aenean dictum erat ut nibh eleifend, nec posuere nunc pharetra. Nunc molestie ac dolor sed luctus. Sed efficitur consectetur suscipit. Aliquam at mollis magna. Pellentesque ut nibh nec leo dictum placerat id quis arcu. Nullam mollis eros non magna lacinia aliquet. Donec ac massa vitae libero semper elementum faucibus nec nisl. Vestibulum maximus mattis ligula vitae vestibulum.',
            price
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})