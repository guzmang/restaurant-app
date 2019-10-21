## Restaurant App

Welcome! This is an app that simulates our location and search the restaurants those are near us.

Please clone the repository and don't forget execute the next command line to download the dependencies into the project:

```
npm install
```

The next step is start the server, so run:

```
node index
```

Once the server is up, you can make a GET request. The setting for the port is 3000. For example:

```
http://localhost:3000/api/
```

This request responds a message with the total number of restaurants we have written in the data.json

But if you want to provide the coordinates and how many restaurants you would like to visit, this is the url:

```
http://localhost:3000/api/search?coor_x=-4&coor_y=3&results=2
```

Additionally, we have a criteria to have a restaurant list by alphabetical (value: name) order or by rating (value: rating):

```
http://localhost:3000/api/search?coor_x=-4&coor_y=3&results=2&criteria=name
```

## Testing

If you provide:
- An invalid criteria, the response won't order by using one.
- Negative results: discounts over the total restaurants near us. If its module is greater than the total restaurants we have near, the response will have 0 restaurants in the list.
- A results number greater than the total : returns the total restaurants in the list.
- A string as results: doesn't return any restaurants.
- An invalid coordinate or both: just returns the restaurants according the specified results (and if it is a valid one).

## Upgrading

We consider MongoDB is a good option to persist the information because we have a JSON data as database and this no relational database works well with this object type, so in a future it would be great install the dependency mongoose to connect MongoDB using this ORM:

```
npm install mongoose --save
```

After that, modify the index.js (the entry point of our application):

```
'use strict'

require('./config/config');
const app = require('./app');
const mongoose = require('mongoose');
const database = 'test';                // or any valid database name we have in MongoDB

mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://localhost:27017/${database}`, { useNewUrlParser: true })
		.then(() => {
			console.log("Connection to the database established successfully...");

			// Create server
            app.listen(process.env.PORT, () => {
                console.log(`Server correctly running on port ${ process.env.PORT }`);
            });
		})
		.catch(
			err => console.log(err)
		);
```

We can modify our model too, restaurant.js ('models' folder) to specify the Documents to save into the database's Collections:

```
'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const entity = 'Restaurant';

let RestaurantSchema = Schema({
    id: Number,
    name: String,
    rating: Number,
    coor_x: Number,
    coor_y: Number
});

module.exports = mongoose.model(entity, RestaurantSchema);
```

User interface: we are using a MVC pattern, so we could add a user interface with Handlebars for example. For now this works as a REST API.

Routing: we are not contemplating the possibility of making a request to an invalid URL.

## To end

We upload our app on Heroku to a fast test. Please visit:

https://restaurant-the-fork.herokuapp.com/api/

And use the parameters (coor_x, coor_y, results, criteria) for example:

https://restaurant-the-fork.herokuapp.com/api/search?coor_x=-4&coor_y=3&results=2&criteria=name