using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace CulinaryC.Models
{
    public partial class Users
    {
        public Users()
        {
            Favorite = new HashSet<Favorite>();
            Friends = new HashSet<Friends>();
            Group = new HashSet<Group>();
            Recipes = new HashSet<Recipes>();
        }

        public int Id { get; set; }
        public string LoginId { get; set; }
        public string Name { get; set; }
        public int? Score { get; set; }

        public virtual ICollection<Favorite> Favorite { get; set; }
        public virtual ICollection<Friends> Friends { get; set; }
        public virtual ICollection<Group> Group { get; set; }
        public virtual ICollection<Recipes> Recipes { get; set; }
    }
}
