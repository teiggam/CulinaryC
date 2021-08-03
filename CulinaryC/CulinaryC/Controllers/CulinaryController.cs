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

        //if they 'complete' someone else recipe
        [HttpPut("completed/u={id}")]
        public void Completed(int id)
        {
            Users u = db.Users.Find(id);
            //this is an honor system we hope no one exploits it lol

            u.Score = u.Score + 15;


            //posting a recipe will be 20
            db.Users.Update(u);
            db.SaveChanges();
        }


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

            u.Name = null;
            u.Score = 0;

            db.Users.Add(u);
            db.SaveChanges();
        }

        [HttpPut("newname={name}&id={id}")]
        public void UpdateName(string name, int id)
        {
            //adds 5 points if its the first time changing name
            Users u = db.Users.Find(id);
            if (u.Name == null)
            {
                u.Score = u.Score + 5;
            }

            u.Name = name;

            db.Users.Update(u);
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

        //Need to test
        [HttpGet("UserEmail={email}")]
        public Users GetUserByEmail(string email)
        {
            Users u = db.Users.Where(x => x.LoginId == email).ToList().First();
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
        //for joining
        [HttpPost("AddUserToGroup/e={email}&gn={groupName}")]
        public void AddUserToGroup(string email, string groupName)
        {
            //create a new group object
            Group g = new Group();
            //find a user by the email 
            Users u = db.Users.Where(x => x.LoginId.ToLower() == email.ToLower()).ToList().First();

            //you can only join 5 groups at a time
            List<Group> groups = db.Group.Where(x => x.UserId == u.Id).ToList();
            if (groups.Count < 5)
            {
                //adding 5 points for joing a group
                u.Score = u.Score + 5;
                db.Users.Update(u);

                //get the user id to the group id

                g.UserId = u.Id;
                //update groupName through paremeter
                g.GroupName = groupName;
                //update and save changes to DB
                db.Group.Add(g);
                db.SaveChanges();
            }

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

            Users u = db.Users.Find(id);
            List<Group> groups = db.Group.Where(x => x.GroupName == name).ToList();

            List<Group> userGroups = db.Group.Where(x => x.UserId == id).ToList();
            if (groups.Count == 0)
            {
                //if they are in five groups they cannot make a group
                if (userGroups.Count < 5)
                {
                    u.Score = u.Score + 10;

                    db.Users.Update(u);
                    db.Group.Add(g);
                    db.SaveChanges();
                }
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
            foreach (Group g in groups)
            {
                db.Group.Remove(g);
            }
            db.SaveChanges();
        }

        //------------------------Favorites-----------------------------------

        [HttpGet("userfavorites={id}")]
        public List<Recipes> GetFavorites(int id)
        {
            List<Recipes> rList = db.Recipes.ToList();

            List<Favorite> favorites = db.Favorite.Where(x => x.UserId == id).ToList();
            List<Recipes> recipes = new List<Recipes>();

            foreach (Favorite f in favorites)
            {
                foreach (Recipes r in rList)
                {
                    if (f.RecipeId == r.Id)
                    {
                        recipes.Add(r);
                    }
                }
            }
            return recipes;
        }

        [HttpPost("addfav/u={userid}&r={recipeid}")]
        public void AddFavorite(int userid, int recipeid)
        {
            Favorite f = new Favorite();
            f.RecipeId = recipeid;
            f.UserId = userid;

            db.Favorite.Add(f);
            db.SaveChanges();
        }

        [HttpDelete("removefav/u={userid}&r={recipeid}")]
        public void RemoveFavorite(int userid, int recipeid)
        {
            Favorite f = new Favorite();
            f.RecipeId = recipeid;
            f.UserId = userid;

            db.Favorite.Remove(f);
            db.SaveChanges();
        }

        //----------------------FriendsList---------------
        [HttpGet("friends={id}")]
        public List<Users> GetFriends(int id)
        {
            List<Users> uList = db.Users.ToList();

            List<Friends> friends = db.Friends.Where(x => x.UserId == id).ToList();
            List<Users> users = new List<Users>();

            foreach (Friends f in friends)
            {
                foreach (Users r in uList)
                {
                    if (f.FriendId == r.Id)
                    {
                        users.Add(r);
                    }
                }
            }
            return users;
        }

        //maybe this would be easier with an email and then finding the user(friend) to that email
        [HttpPost("newfriend/u={userid}&f={friendid}")]
        public void AddFriend(int userid, int friendid)
        {
            Users u = db.Users.Find(userid);

            u.Score = u.Score + 5;

            Friends f = new Friends();
            f.UserId = userid;
            f.FriendId = friendid;

            db.Users.Update(u);
            db.Friends.Add(f);
            db.SaveChanges();
        }

        [HttpDelete("removefriend/u={userid}&f={friendid}")]
        public void RemoveFriend(int userid, int friendid)
        {
            Friends f = new Friends();
            f.FriendId = friendid;
            f.UserId = userid;

            db.Friends.Remove(f);
            db.SaveChanges();
        }
    }
}