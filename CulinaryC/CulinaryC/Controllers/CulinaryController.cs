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

        

        //-------------- LIST ALL Recipes --------------------
        [HttpGet("Recipe")]
        public List<Recipes> GetRecipes()
        {
            List<Recipes> recipeList = db.Recipes.ToList();
            return recipeList;
        }

        //------------- USERs ------------------
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

        //get all users
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

        [HttpGet("UserId={id}")]
        public Users GetUsersById(int id)
        {
            Users u = db.Users.Where(x => x.Id == id).ToList().First();
            return u;
        }

        [HttpGet("Login={email}")]
        public Users GetUsersById(string email)
        {
            Users u = db.Users.Where(x => x.LoginId.ToLower() == email.ToLower()).ToList().First();
            return u;
        }

        //-----------------Group-------------------------------
        //display group to a user
        //displaying own groups
        [HttpGet("GetGroup/userId={id}")]
        public List<Group> GetGroupsByUser(int id)
        {

            List<Group> groups = new List<Group>();

            groups = db.Group.Where(x => x.UserId == id).ToList();

            return groups;
        }

        [HttpGet("GetGroup/GroupName={name}")]
        public List<Group> GetGroups(string name)
        {

            List<Group> groups = new List<Group>();

            groups = db.Group.Where(x => x.GroupName.ToLower() == name.ToLower()).ToList();

            return groups;
        }

        [HttpGet("GetGroup/Id={id}")]
        public Group GetGroupById(int id)
        {
            Group g = db.Group.Where(x => x.UserId == id).ToList().First();

            return g;
        }

        //--------------- Need to test This!! ------------------
        //Add user to a group
        //on accepting an invitation
        [HttpPost("AddUserToGroup/e={email}&gn={groupName}")]
        public void AddUserToGroup(string email, string groupName)
        {
            //create a new group object
            Group g = new Group();
            //find a user by the email 
            Users u = db.Users.Where(x => x.LoginId.ToLower() == email.ToLower()).ToList().First();
            //get the user id to the group id
            g.UserId = u.Id;
            //update groupName through paremeter
            g.GroupName = groupName;
            //update and save changes to DB
            db.Group.Add(g);
            db.SaveChanges();
        }

        //creating group
        //adding group will be on the profile page
        //inside the group page is where you can find the button to invite users
        [HttpPost("CreateGroup/gname={name}&userId={id}")]
        public void CreateGroup(string name, int id)
        {
            Group g = new Group();
            g.GroupName = name;
            g.UserId = id;
            List<Group> groups = db.Group.Where(x => x.GroupName == name).ToList();
            if(groups.Count == 0)
            {
                db.Group.Add(g);
                db.SaveChanges();
            }
        }

        //delete user from group
        [HttpDelete("removeuser={id}&n={groupName}")]
        public void RemoveUserFromGroup(int id, string groupName)
        {
            List<Group> groups = db.Group.Where(x => x.GroupName == groupName).ToList();
            Group user = groups.Where(x => x.UserId == id).ToList().First();

            db.Group.Remove(user);
            db.SaveChanges();
        }

        //only viewable to the user who created the group
        [HttpDelete("removegroup/gname={name}")]
        public void RemoveGroup(string name)
        {
            List<Group> groups = db.Group.Where(x => x.GroupName == name).ToList();
            foreach(Group g in groups)
            {
                db.Group.Remove(g);
            }
            db.SaveChanges();
        }

        //------------------------Favorites-----------------------------------

    }
}
