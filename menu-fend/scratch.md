# Scratch

This document exists to outline items I am planning or working out the implementation of and is subject to change during testing.

## Data Structures for data from the API Database

### Allergen

The simplest of the structures, the `JSON` object from the API will suffice
```typescript
{
  "name": String,
  "_id": Number
}
```

### Ingredient

Another simple `JSON` structure, holds its own name and an optional brand name as well as an array of allergens

```typescript
{
  "_id": Number,
  "name": String,
  "brandName": String,
  "allergens": [<Allergen>]
}
```

### FoodComponent

A structure for holding what are essentially sub recipes that go into a larger item, such as a salsa or sides like mashed potatoes that are pre-made/consistent and may be a part of other recipes

```typescript
{
  "id": Number,
  "name": String,
  "fixedIngredients": [<Ingredient>],
  "fixedFoodComponents": [<FoodComponent>],
  "optionalIngredients": [<Ingredient>],
  "optionalFoodComponents": [<FoodComponent>]

}
```

### BaseList/IngredientList

An extendable class for storing the simple lists of the above structures

```typescript
{
  "_id": Number,
  "name": Number,
  "allItems": [<Ingredient/FoodComponent/Recipe>],
  "shownItems": [<Ingredient/FoodComponent/Recipe>],
  "allAllergens": [<Allergen>],
  "shownAllergens": [<Allergen],
  // Some tracking for age of an entry
  "lastModified": Date,
  "created": Date,
  "createdBy": String,
  "lastModifiedBy": String,

  // Complete unfiltered list
  "getAllItems": Function,
  // Items after any filters are applied
  "getShownItems": Function,
  // Add one or many allergens to the list. Populate "shownItems" with ingredients that do not include allergens
  "applyFilter": Function([Allergen]),
  // Remove one or all allergens and rebuild shownItems
  "removeFilter": Function([Allergen...]),
  // Return filters applied to the list
  "getFilters": Function,

  "countAllItems": Function,
  "countShownItems": Function,
  // Return a list of all allergens associated with items in the list
  "getAllAllergens": Function,
  // Return a list of the allergens still present in the filtered list of ingredients
  "getShownAllergens": Function
}
```

### FoodComponentList extends <Baselist\>

Uses its own implementation `<BaseList>` methods for retrieving data from multiple lists. The `<FoodComponentList>` will be created and populated client side from the data in the API as it may take several API calls to get all of the required references

```typescript
{
  "fixedIngredients": <BaseList>,
  "optionalIngredients": <BaseList>,
  "fixedComponents": <ComponentList>,
  "optionalComponents": <ComponentList>,
}
```

### Recipe extends <FoodComponentList\>

The most complex structure, it includes all of the previous ones into a collection of parts including other recipes and condenses information where possible using modified implementations of the `<Baselist>` and `<FoodComponentList>` methods.

```typescript
{
  "fixedRecipes": [<Recipe>],
  "optionalRecipes": [<Recipe>]
}
```
