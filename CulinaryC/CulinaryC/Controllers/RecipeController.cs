using CulinaryC.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CulinaryC.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RecipeController : Controller
    {
        //Create a Database object
        CookBookContext db = new CookBookContext();

        [HttpGet("All")]
        public List<Recipes> GetRecipes()
        {
            List<Recipes> recipeList = db.Recipes.ToList();
            return recipeList;
        }

        [HttpPost("Add/T={title}")]

        public void AddNewRecipe(string title)
        {
            Recipes r = new Recipes
            {
                RecipeName = title
            };
            db.Recipes.Add(r);
            db.SaveChanges();
        }

        [HttpGet("Ingredients/All")]
        public List<Ingredients> GetIngredients()
        {
            List<Ingredients> ingrList = db.Ingredients.ToList();
            return ingrList;
        }
        [HttpGet("N={name}")]
        public Recipes GetRecipeByName(string name)
        {
            Recipes rec = new Recipes();
            rec = db.Recipes.Where(x => x.RecipeName.ToLower() == name.ToLower()).Last();
            return rec;
        }

        [HttpPost("Ingredients/Add")]
        public void AddIngredient(Ingredients ing)
        {
            db.Ingredients.Add(ing);
            db.SaveChanges();
        }

        //used currently in details componet
        [HttpGet("FindRecipe/Id={id}")]
        public Recipes FindRecipeById(int id)
        {
           Recipes r = db.Recipes.Find(id);
           return r;
        }

        //need to test
        [HttpGet("Ingredients/Id={id}")]
        public Ingredients GetIngredientById(int id)
        {
            Ingredients ing = db.Ingredients.Find(id);
            return ing;
        }
    }
}
