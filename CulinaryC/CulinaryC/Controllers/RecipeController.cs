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
            List<Recipes> recipeList = db.Recipes.OrderByDescending(x => x.Score).ToList();
            return recipeList;
        }

        [HttpGet("id={userId}")]
        public List<Recipes> DisplayUserRecipes(int userId)
        {
            List<Recipes> userRecipes = db.Recipes.Where(x => x.UserId == userId).ToList();

            return userRecipes.OrderByDescending(x => x.Id).ToList();
        }

        [HttpPost("Add/T={title}&U={userId}")]

        public void AddNewRecipe(string title, int userId)
        {
            Recipes r = new Recipes
            {
                RecipeName = title,
                UserId = userId,
                Score = 0
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

        [HttpGet("IngName=${ing}")]
        public List<Ingredients> GetIngredientsByName(string ing)
        {

            List<Ingredients> ingNameList = db.Ingredients.Where(x => x.Item.ToLower() == ing.ToLower()).ToList();
            return ingNameList;
            
        }


[HttpGet("N={name}")]
        public Recipes GetRecipeByName(string name)
        {
            Recipes rec = new Recipes();

            rec = db.Recipes.Where(x => x.RecipeName.ToLower() == name.ToLower()).ToList().Last();

            return rec;
        }

        [HttpPost("Ingredients/Add")]
        public void AddIngredient(Ingredients ing)
        {
            db.Ingredients.Add(ing);
            db.SaveChanges();
        }

        [HttpPut("Update/N={name}/D={des}/S={serv}")]
        public void UpdateRecipe(string name, string des, int serv)
        {
            Recipes r = db.Recipes.Where(x => x.RecipeName == name).ToList().Last();
            r.Description = des;
            r.Servings = serv;
            db.Recipes.Update(r);
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
