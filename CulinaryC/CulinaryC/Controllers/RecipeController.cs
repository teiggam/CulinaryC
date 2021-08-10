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

        [HttpGet("GetRecipesByIngName={ingName}")]
        public List<Recipes> GetRecipesByIngName(string ingName)
        {

            List<Recipes> RList = db.Recipes.ToList();
            List<Ingredients> I = db.Ingredients.Where(x => x.Item.Contains(ingName)).ToList();
            List<Recipes> RFound = new List<Recipes>();
            foreach (Ingredients i in I)
            {
                foreach (Recipes r in RList)
                {
                    if (i.RecipeId == r.Id)
                    {
                        RFound.Add(r);
                    }
                }

            }
            return RFound;

        }

        [HttpPut("removescore={recipeId}")]
        public void removeRecipe(int recipeId)
        {
            Recipes r = db.Recipes.Where(x => x.Id == recipeId).ToList().First();
            Users u = db.Users.Find(r.UserId);

            u.Score = u.Score - 5;

            r.Score = r.Score - 10;

            db.Recipes.Update(r);
            db.Users.Update(u);
            db.SaveChanges();
        }

        [HttpPut("updateScore={recipeId}")]
        public void completeRecipe(int recipeId)
        {
            Recipes r = db.Recipes.Where(x => x.Id == recipeId).ToList().First();

            r.Score = r.Score + 10;

            db.Recipes.Update(r);
            db.SaveChanges();
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

        [HttpPut("Update/N={name}/D={desc}/S={serv}/I={image}")]
        public void UpdateRecipe(string name, string desc, int serv, string image)
        {
            Recipes r = db.Recipes.Where(x => x.RecipeName == name).ToList().Last();
            Users u = db.Users.Where(x => x.Id == r.UserId).ToList().First();
            string newPath = "Resources/Images/" + image; 
            u.Score = u.Score + 20;
            db.Users.Update(u);

            r.Description = desc;
            r.Servings = serv;
            r.Picture = newPath;
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

        [HttpDelete("deleteRecipe={id}")]
        public void DeleteRecipe(int id)
        {
            Recipes r = db.Recipes.Find(id);
            List<Ingredients> I = db.Ingredients.Where(x => x.RecipeId == r.Id).ToList();
            foreach(Ingredients ing in I)
            {
                db.Ingredients.Remove(ing);
            }

            db.Recipes.Remove(r);
            db.SaveChanges();
        }
    }
}
