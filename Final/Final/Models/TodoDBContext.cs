using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using project4.Models;

namespace AngularApplication.Models
{
    public class TodoDBContext : IdentityDbContext<ApplicationUser>
    {
        public TodoDBContext(DbContextOptions<TodoDBContext> options) : base(options)
        {
        }

        public DbSet<Todo> Todo { get; set; }

        public virtual DbSet<Tag> Tags { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Todo>().ToTable("Todo");
        }
    }
}
