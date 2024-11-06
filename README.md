---

# JSON Sanitizer with `sanitize-html`

This project demonstrates how to sanitize JSON objects by removing any unsafe HTML tags and attributes from the values of a JSON structure. We use the `sanitize-html` package to clean the data while retaining the JSON structure. This is especially useful for cleaning user inputs to prevent XSS (Cross-Site Scripting) attacks.

## Requirements

The `sanitize-html` library is required for sanitizing HTML in JSON values. You can install it via npm:

```bash
npm install sanitize-html
```

- [sanitize-html documentation](https://github.com/apostrophecms/sanitize-html)

## Usage

This example includes:

1. A sample JSON object, `dirtyHarry`, that contains potentially unsafe HTML.
2. A recursive function, `sanitizeJson`, which sanitizes all string values in a JSON object.
3. Conversion to and from JSON strings to simulate data being received as a string and parsed into an object.

### Sample JSON Object

The `dirtyHarry` object simulates a JSON structure with unsafe HTML elements:

```javascript
const dirtyHarry = {
    first_name: "<script>Dirty('hello')</script>",
    last_name: "Harry",
    son: [
        { first_name: "Harry", last_name: "potter" },
        { first_name: "peter", last_name: "potter" },
        { first_name: "<img>slytherin</img>", last_name: "potter" }
    ]
};
```

### Sanitize Options

The `cleanOptions` object specifies the settings for `sanitize-html`, where we define:
- `allowedTags`: An empty array to allow no HTML tags.
- `allowedAttributes`: An empty object to allow no attributes.

```javascript
const cleanOptions = {
    allowedAttributes: {},
    allowedTags: []
};
```

### Sanitization Function

The `sanitizeJson` function recursively processes each value in the JSON structure:
- If a value is a string, it uses `sanitize-html` to clean it.
- If a value is an object or array, it continues recursively.

```javascript
function sanitizeJson(JsonObj, cleanOptions = cleanOptions) {
    if (!JsonObj || typeof JsonObj !== 'object') {
        return;
    }

    for (const [key, value] of Object.entries(JsonObj)) {
        if (typeof value !== 'string') {
            sanitizeJson(value, cleanOptions);
        } else {
            JsonObj[key] = sanitizeHtml(value, cleanOptions);
        }
    }
}
```

### Example Workflow

1. The `dirtyHarry` object is converted to a JSON string, `dirtyHarryString`, to simulate incoming data.
2. The JSON string is parsed back into a JSON object, `dirtyHarryJsonObj`.
3. The `sanitizeJson` function is called on `dirtyHarryJsonObj`.
4. The sanitized object, `cleanedEastwood`, is logged.

```javascript
// Convert to JSON string
const dirtyHarryString = JSON.stringify(dirtyHarry);
console.log(`Dirty Harry:\n${dirtyHarryString}`);

// Parse JSON string back to object
const dirtyHarryJsonObj = JSON.parse(dirtyHarryString);

// Sanitize the JSON object
sanitizeJson(dirtyHarryJsonObj, cleanOptions);
const cleanedEastwood = dirtyHarryJsonObj;

// Output the cleaned JSON
console.log(`Cleaned Eastwood:\n${JSON.stringify(cleanedEastwood)}`);
```

### Sample Output

#### Original (Unsanitized) JSON:

```json
{
    "first_name": "<script>Dirty('hello')</script>",
    "last_name": "Harry",
    "son": [
        { "first_name": "Harry", "last_name": "potter" },
        { "first_name": "peter", "last_name": "potter" },
        { "first_name": "<img>slytherin</img>", "last_name": "potter" }
    ]
}
```

#### Cleaned JSON:

```json
{
    "first_name": "Dirty('hello')",
    "last_name": "Harry",
    "son": [
        { "first_name": "Harry", "last_name": "potter" },
        { "first_name": "peter", "last_name": "potter" },
        { "first_name": "slytherin", "last_name": "potter" }
    ]
}
```

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

---

