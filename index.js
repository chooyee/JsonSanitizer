/****************************************
 *** Required package for sanitize
*****************************************/
//https://github.com/apostrophecms/sanitize-html
const sanitizeHtml = require('sanitize-html');


/****************************************
*** Sample Json Object
****************************************/
const dirtyHarry = {
    first_name:"<script>Dirty('hello')</script>",
    last_name:"Harry",
    son:[{firs_name:"Harry", last_name:"potter"}, {firs_name:"peter", last_name:"potter"}, {firs_name:"<img>slytherin</img>", last_name:"potter"}]
};

const cleanOptions = {
    allowedAttributes: {},
    allowedTags: [],
}

//Clean the Json object
function sanitizeJson(JsonObj, cleanOptions= cleanOptions) {

    /** If json is not an object, return. */
    if (!JsonObj || typeof JsonObj !== 'object') {
        return;
    }

    for (const [key, value] of Object.entries(JsonObj)) {
        if (typeof value !== 'string') {
            sanitizeJson(value, cleanOptions);
        } else {
            JsonObj[key] = sanitizeHtml(value, cleanOptions)
        }
    }
}

/*********************************************************
 * Convert to string to simulate incoming json string
 *********************************************************/
const dirtyHarryString = JSON.stringify(dirtyHarry);
console.log(`Dirty Harry:\n${dirtyHarryString}`)
/*********************************************************
 * end convert
 *********************************************************/

//Parse the string to json object
const dirtyHarryJsonObj = JSON.parse(dirtyHarryString);

/*********************************************************
 * Clean Dirty Harry and his sons
**********************************************************/
sanitizeJson(dirtyHarryJsonObj, cleanOptions)
const cleanedEastwood = dirtyHarryJsonObj; // Pass Dirty Harry to CleanedEastwood
/*********************************************************
 * Cleaned
**********************************************************/
console.log(`Cleaned Eastwood:\n${JSON.stringify(cleanedEastwood)}`);
