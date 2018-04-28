using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularApplication.Models
{
    public static class DbInitializer
    {
        public static async Task InitializeAsync(TodoDBContext context, UserManager<ApplicationUser> userManager)
        {
            context.Database.EnsureCreated();

            if (await userManager.FindByEmailAsync("mbockus@uco.edu") == null)
            {
                ApplicationUser newUser = new ApplicationUser()
                {
                    Email = "mbockus@uco.edu",
                    UserName = "mbockus"
                };
                var result = await userManager.CreateAsync(newUser, "P&ssw0rd");
                ApplicationUser newUser2 = new ApplicationUser()
                {
                    Email = "joebob@gmail.com",
                    UserName = "joebob"
                };
                var result2 = await userManager.CreateAsync(newUser2, "P&ssw0rd");
            }
            // Look for any todo.
            if (context.Todo.Any())
            {
                return;   // DB has been seeded
            }

            var todos = new Todo[]
            {
             //new Todo{height=4, Name="Bulbasaur", Trainer="mbockus"},
             //new Pokemon{height=5, Name="Charmander", Trainer="joebob"}
            };
            foreach (Todo todo in todos)
            {
                context.Todo.Add(todo);
            }
            context.SaveChanges();
        }
    }
}
