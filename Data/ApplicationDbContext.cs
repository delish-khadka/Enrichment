using Microsoft.EntityFrameworkCore;
using TutorialApp.Models;

namespace TutorialApp.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<Items> Items { get; set; }
    }
}
