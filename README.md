## Server API

### Get products info
  * GET `/api/products/:id`

**Path Parameters:**
  * `id` products id

**Success Status Code:** `200`

**Returns:** JSON

```json
    {
      "id": "String",
      "name": "String",
      "colletion_name": "String",
      "review_count": "Number",
      "review_average": "Number",
      "colors": "Array"
    }
```

### Add color to products
  * POST `/api/products/:productsId/colors`

**Path Parameters:**

  * `productsId` products id

**Success Status Code:** `201`

**Request Body**: Expects JSON with the following keys.

```json
    {
      "color_id": "id Number",
      "product_id": "id String",
      "url": "color URL",
      "name": "String",
      "list_price": "Number",
      "sale_price": "Number",
      "inventory": "Array"
    }
```


### Update products info
  * PUT `/api/products/:id`

**Path Parameters:**
  * `id` products id

**Success Status Code:** `204`

**Request Body**: Expects JSON with any of the following keys (include only keys to be updated)

```json
    {
      "name": "String",
      "collection_name": "String",
      "review_count": "Number",
      "review_average": "Number",
      "colors": "Array"
    }
```

### Delete products
  * DELETE `/api/products/:id`

**Path Parameters:**
  * `id` products id

**Success Status Code:** `204`

