using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularApplication.Models
{
    public static class DbInitializer
    {
        public static void Initialize(TodoDBContext context)
        {
            context.Database.EnsureCreated();

            // Look for any students.
            if (context.Todo.Any())
            {
                return;   // DB has been seeded
            }

            var todos = new Todo[]
            {
            //new Todo{DateTime=DateTime.Now, Desc="Bulbasaur"},
            //new Todo{DateTime=DateTime.Now, Desc="Charmander"}
            };
            foreach (Todo todo in todos)
            {
                context.Todo.Add(todo);
            }
            context.SaveChanges();
        }
    }
}
