function init() {
  addHelpers();
  addPartials();
  addFormTemplate();
  // addRecipeTemplate();
}

function addRecipeTemplate() {}

function addFormTemplate() {
  let template = document.getElementById("recipe-form-template").innerHTML;
  let fn = Handlebars.compile(template);
  let html = fn({ ingredients: Array(5).fill({ name: "" }) });
  document.querySelector("main").innerHTML = html;
}

function handleSubmit() {
  let recipe = recipeFromForm();
  let template = document.getElementById("recipe-template").innerHTML;
  let fn = Handlebars.compile(template);
  let html = fn(recipe);
  document.querySelector("main").innerHTML = html;
}

function displayEditForm() {
  let recipe = recipeFromTemplate()
  let template = document.getElementById("recipe-form-template").innerHTML;
  let fn = Handlebars.compile(template);
  let html = fn(recipe);
  document.querySelector("main").innerHTML = html;
}

function recipeFromTemplate() {
  let name = document.getElementById("recipeName").innerHTML;
  let description = document.getElementById("recipeDescription").innerHTML;

  let ingredients = [];
  let ingredientFields = document.querySelectorAll("[name=ingredients]");
  ingredientFields.forEach(i => {
    ingredients.push(i.innerHTML);
  });

  return { name: name, description: description, ingredients: ingredients };
}

function recipeFromForm() {
  let name = document.getElementById("name").value;
  let description = document.getElementById("description").value;

  let ingredients = [];
  let form = document.getElementById("recipe-form");
  let ingredientFields = form.querySelectorAll("input[name=ingredients]");
  ingredientFields.forEach(i => {
    if (i.value.length > 0) ingredients.push(i.value);
  });

  return { name: name, description: description, ingredients: ingredients };
}

function addPartials() {
  Handlebars.registerPartial(
    "recipeDetailsPartial",
    document.getElementById("recipe-details-partial").innerHTML
  );
  Handlebars.registerPartial(
    "displayIngredient",
    document.getElementById("ingredients-partial").innerHTML
  );
}

function addHelpers() {
  Handlebars.registerHelper("displayIngredient", function(ingredient) {
    return new Handlebars.SafeString(
      `<li name="ingredients">${ingredient}</li>`
    );
  });
}

document.addEventListener("DOMContentLoaded", function(event) {
  init();
  mocha.run();
});
