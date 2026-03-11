using Microsoft.EntityFrameworkCore;
using Felino.Api.Domain.Entities;
using Felino.Api.Domain.Enums;

namespace Felino.Api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Product> Products { get; set; } = null!;
        public DbSet<Category> Categories { get; set; } = null!;
        public DbSet<Order> Orders { get; set; } = null!;
        public DbSet<OrderItem> OrderItems { get; set; } = null!;
        public DbSet<Table> Tables { get; set; } = null!;
        public DbSet<Reservation> Reservations { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure Slugs to be unique
            modelBuilder.Entity<Product>()
                .HasIndex(p => p.Slug)
                .IsUnique();

            modelBuilder.Entity<Category>()
                .HasIndex(c => c.Slug)
                .IsUnique();

            // Seed Categories
            modelBuilder.Entity<Category>().HasData(
                new Category { Id = 1, Name = "Pizza", Slug = "pizza" },
                new Category { Id = 2, Name = "Burgare", Slug = "burger" },
                new Category { Id = 3, Name = "Kebab", Slug = "kebab" },
                new Category { Id = 4, Name = "Pasta", Slug = "pasta" },
                new Category { Id = 5, Name = "Sallad", Slug = "sallad" },
                new Category { Id = 6, Name = "Grill", Slug = "grill" }
            );

            // Seed Tables
            modelBuilder.Entity<Table>().HasData(
                new Table { TableId = 1, Name = "Bord 1", Seats = 2, Location = "Inne" },
                new Table { TableId = 2, Name = "Bord 2", Seats = 4, Location = "Inne" },
                new Table { TableId = 3, Name = "Bord 3", Seats = 4, Location = "Inne" },
                new Table { TableId = 4, Name = "Bord 4", Seats = 6, Location = "Inne" },
                new Table { TableId = 5, Name = "Bord 5", Seats = 2, Location = "Ute" },
                new Table { TableId = 6, Name = "Bord 6", Seats = 4, Location = "Ute" },
                new Table { TableId = 7, Name = "Bord 7", Seats = 4, Location = "Ute" },
                new Table { TableId = 8, Name = "Bord 8", Seats = 6, Location = "Ute" }
            );

            // Seed a few sample products to match the old SQL
            modelBuilder.Entity<Product>().HasData(
                new Product { Id = 1, Name = "Margherita", Slug = "margherita", CategoryId = 1, Ingredients = "[\"ost\"]", Price = 95.00m, Image = "/images/products/pizza-margherita.jpg", AltText = "Margherita pizza med ost" },
                new Product { Id = 2, Name = "Vesuvio", Slug = "vesuvio", CategoryId = 1, Ingredients = "[\"skinka\"]", Price = 99.00m, Image = "/images/products/pizza-vesuvio.jpg", AltText = "Vesuvio pizza med skinka" },
                new Product { Id = 3, Name = "Hawaii", Slug = "hawaii", CategoryId = 1, Ingredients = "[\"skinka\", \"ananas\"]", Price = 105.00m, Image = "/images/products/pizza-hawaii.jpg", AltText = "Hawaii pizza med skinka och ananas" },
                new Product { Id = 7, Name = "Classic", Slug = "classic", CategoryId = 2, Ingredients = "[\"sallad\", \"tomat\", \"lök\", \"gurka\"]", Price = 95.00m, Image = "/images/products/b-classic.jpg", AltText = "Classic hamburgare", Sauce = "dressing" },
                new Product { Id = 13, Name = "Kebabtallrik", Slug = "kebabtallrik", CategoryId = 3, Ingredients = "[\"kebabkött\", \"pommes\", \"sallad\"]", Price = 119.00m, Image = "/images/products/k-kebabtallrik.jpg", AltText = "Kebabtallrik med pommes" }
            );
        }
    }
}
