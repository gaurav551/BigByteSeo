using System;
using BigByteSeo.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace BigByteSeo.Data
{
    public class ApplicationDbContext : IdentityDbContext
    {
         public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
        public DbSet<Contact> Contacts { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }

        internal object FirstOrDefault(Func<object, object> p)
        {
            throw new NotImplementedException();
        }
    }
}