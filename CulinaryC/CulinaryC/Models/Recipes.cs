﻿using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace CulinaryC.Models
{
    public partial class Recipes
    {
        public Recipes()
        {
            Favorite = new HashSet<Favorite>();
            Ingredients = new HashSet<Ingredients>();
        }

        public int Id { get; set; }
        public int? UserId { get; set; }
        public int? Score { get; set; }
        public string Description { get; set; }
        public string RecipeName { get; set; }

        public virtual Users User { get; set; }
        public virtual ICollection<Favorite> Favorite { get; set; }
        public virtual ICollection<Ingredients> Ingredients { get; set; }
    }
}
