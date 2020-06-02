# Server API

## Products
### Get products info
  * GET `/api/products/:product_id`

**Path Parameters:**
  * `id` products id

**Success Status Code:** `200`

**Returns:** JSON

```json
    {
      "product_id": "Number",
      "product_name": "String",
      "colletion_name": "String",
      "review_count": "Number",
      "review_average": "Number",
      "colors": "Array"
    }
```

### Add color to products
  * POST `/api/products`

**Success Status Code:** `201`

**Request Body**: Expects JSON with the following keys.

```json
    {
      "product_id": "Number",
      "product_name": "String",
      "collection_name": "String",
      "review_count": "Number",
      "review_average": "Number"
    }
```
### Update products info
  * PUT `/api/products/:product_id`

**Path Parameters:**
  * `id` products id

**Success Status Code:** `204`

**Request Body**: Expects JSON with any of the following keys (include only keys to be updated)

```json
    {
      "product_name": "String",
      "collection_name": "String",
      "review_count": "Number",
      "review_average": "Number",
      "colors": "Array"
    }
```

### Delete products
  * DELETE `/api/products/:product_id`

**Path Parameters:**
  * `id` products id

**Success Status Code:** `204`


### Add color to products
  * POST `/api/products/:products_id/colors`

**Path Parameters:**

  * `productsId` products id

**Success Status Code:** `201`

**Request Body**: Expects JSON with the following keys.

```json
    {
      "color_id": "Number",
      "product_id": "Number",
      "color_url": "String",
      "color_name": "String",
      "list_price": "Number",
      "sale_price": "Number",
      "inventory": "Array"
    }
```


## Colors
### Get colors info
  * GET `/api/products/:product_id/colors/:color_id`

**Path Parameters:**
  * `product_id` products product_id
  * `color_id` colors color_id

**Success Status Code:** `200`

**Returns:** JSON

```json
    {
      "color_id": "Number",
      "color_name": "String",
      "color_url": "String",
      "list_price": "Number",
      "sale_price": "Number"
    }
```

### Add color to products
  * POST `/api/products/:product_id/colors`

**Path Parameters:**
  * `product_id` products product_id

**Success Status Code:** `201`

**Request Body**: Expects JSON with the following keys.

```json
    {
      "color_name": "String",
      "color_url": "String",
      "list_price": "Number",
      "sale_price": "Number"
    }
```
### Update color info
  * PUT `/api/products/:product_id/color/:color_id`

**Path Parameters:**
  * `product_id` products product_id
  * `color_id` colors color_id

**Success Status Code:** `204`

**Request Body**: Expects JSON with any of the following keys (include only keys to be updated)

```json
    {
      "color_name": "String",
      "color_url": "String",
      "list_price": "Number",
      "sale_price": "Number"
    }
```

### Delete color from product
  * DELETE `/api/products/:product_id/color/:color_id`

**Path Parameters:**
  * `product_id` products product_id
  * `color_id` colors color_id

**Success Status Code:** `204`



## Inventory
### Get inventory info
  * GET `/api/products/:product_id/colors/:color_id/inventory/:inventory_id`

**Path Parameters:**
  * `product_id` products product_id
  * `color_id` colors color_id
  * `inventory_id` inventory inventory_id

**Success Status Code:** `200`

**Returns:** JSON

```json
    {
      "product_id": "Number",
      "inventory_id": "Number",
      "color_id": "Number",
      "size": "String",
      "quantity": "Number"
    }
```

### Add Inventory to specific color
  * POST `/api/products/:product_id/colors/:color_id/inventory/`

**Path Parameters:**
  * `product_id` products product_id
  * `color_id` colors color_id

**Success Status Code:** `201`

**Request Body**: Expects JSON with the following keys.

```json
    {
      "size": "String",
      "quantity": "Number"
    }
```
### Update Inventory info
  * PUT `/api/products/:product_id/color/:color_id/inventory/:inventory_id`

**Path Parameters:**
  * `product_id` products product_id
  * `color_id` colors color_id
  * `inventory_id` inventory inventory_id

**Success Status Code:** `204`

**Request Body**: Expects JSON with any of the following keys (include only keys to be updated)

```json
    {
      "size": "String",
      "quantity": "Number"
    }
```

### Delete inventory record
  * DELETE `/api/products/:product_id/color/:color_id/inventory/:inventory_id`

**Path Parameters:**
  * `product_id` products product_id
  * `color_id` colors color_id
  * `inventory_id` inventory inventory_id

**Success Status Code:** `204`


## Photos
### Get photo info
  * GET `/api/products/:product_id/colors/:color_id/photo/:photo_id`

**Path Parameters:**
  * `product_id` products product_id
  * `color_id` colors color_id
  * `photo_id` photos photo_id

**Success Status Code:** `200`

**Returns:** JSON

```json
    {
      "photo_id": "Number",
      "color_id": "Number",
      "photo_url": "String",
    }
```

### Add photo to color
  * POST `/api/products/:product_id/colors/:color_id`

**Path Parameters:**
  * `product_id` products product_id
  * `color_id` colors color_id

**Success Status Code:** `201`

**Request Body**: Expects JSON with the following keys.

```json
    {
      "photo_url": "String",
    }
```
### Update photo
  * PUT `/api/products/:product_id/color/:color_id/photo/:photo_id`

**Path Parameters:**
  * `product_id` products product_id
  * `color_id` colors color_id
  * `photo_id` photo photo_id

**Success Status Code:** `204`

**Request Body**: Expects JSON with any of the following keys (include only keys to be updated)

```json
    {
      "photo_url": "String",
    }
```

### Delete photo
  * DELETE `/api/products/:product_id/color/:color_id/photo/:photo_id`

**Path Parameters:**
  * `product_id` products product_id
  * `color_id` colors color_id
  * `photo_id` photo photo_id

**Success Status Code:** `204`