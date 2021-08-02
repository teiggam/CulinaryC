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
    public class CulinaryController : ControllerBase
    {
        //Create a Database object
        CookBookContext db = new CookBookContext();

        //-------------- GET ALL USERS ----------------------
        [HttpGet("Leaderboard")]
        public List<Users> GetUsers()
        {
            List<Users> usersList = new List<Users>();
            foreach (Users u in db.Users)
            {
                usersList.Add(u);
            }

            return usersList;
        }

        //-------------- LIST ALL Recipes --------------------
        [HttpGet("Recipe")]
        public List<Recipes> GetRecipes()
        {
            List<Recipes> recipeList = db.Recipes.ToList();
            return recipeList;
        }

        //------------- ADD NEW USER ------------------
        //When you register a new user, grab the email from Identity and add it to a users object
        [HttpPost("GetEmail/e={email}")]
        public void AddUser(string email)
        {
            AspNetUsers a = db.AspNetUsers.Where(x => x.Email == email).ToList().First();

            Users u = new Users();
            
            u.LoginId = a.Email;

            u.Name = "Null";
            u.Score = 0;

            db.Users.Add(u);
            db.SaveChanges();
        }

        //display group to a user
        [HttpGet("GetGroup/userId={id}")]
        public List<Group> GetGroups(int id)
        {

            List<Group> groups = new List<Group>();

            groups = db.Group.Where(x => x.UserId == id).ToList();

            return groups;
        }

        //--------------- Need to test This!! ------------------
        //Add user to a group
        [HttpPost("AddUserToGroup/e={email}&gn={groupName}")]
        public void AddUserToGroup(string email, string groupName)
        {
            //create a new group object
            Group g = new Group();
            //find a user by the email 
            Users u = db.Users.Where(x => x.LoginId == email).ToList().First();
            //get the user id to the group id
            g.UserId = u.Id;
            //update groupName through paremeter
            g.GroupName = groupName;
            //update and save changes to DB
            db.Group.Add(g);
            db.SaveChanges();
        }

    }
}
