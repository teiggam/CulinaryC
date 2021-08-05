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

        [HttpGet("GetRecipesByIngName={ingName}")]
        public List<Recipes> GetRecipesByIngName(string ingName)
        { 
            //Creating a list to store Ingredient matches
            List<Ingredients> IngMatch = new List<Ingredients>();
            //Creating a list of Ingredients
            List<Ingredients> IngNameList = db.Ingredients.ToList();
            //Creating a list of all the Recipes
            List<Recipes> RecipeList = db.Recipes.ToList();
            //Creating a list to store all the Recipes found
            List<Recipes> RecipesFound = new List<Recipes>();

            foreach (Ingredients Ing in IngNameList)
            {
                if (Ing.Item.ToLower().Contains(ingName.ToLower()))
                {
                    IngMatch.Add(Ing);
                    Console.WriteLine("Found");
                }
            }
            foreach (Ingredients Ing in IngMatch)
            {
                Recipes Rec = new Recipes();
                Rec = db.Recipes.Where(x => x.Id == Ing.RecipeId).ToList().Last();
                RecipesFound.Add(Rec);
            }

            return RecipesFound;
        }

        // Need to switch to contains
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
            Users u = db.Users.Where(x => x.Id == r.UserId).ToList().First();

            u.Score = u.Score + 20;
            db.Users.Update(u);

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

        [HttpGet("Ingredients/Id={id}")]
        public Ingredients GetIngredientById(int id)
        {
            Ingredients ing = db.Ingredients.Find(id);
            return ing;

        }
    }
}
