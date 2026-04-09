using Felino.Api.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Felino.Api.Infrastructure.Persistence.Configurations
{
    public class ProductConfiguration : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            builder.ToTable("Products");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Name)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(x => x.Slug)
                .IsRequired()
                .HasMaxLength(120);

            builder.Property(x => x.Ingredients)
                .IsRequired()
                .HasMaxLength(2000);

            builder.Property(x => x.Price)
                .HasColumnType("decimal(18,2)");

            builder.Property(x => x.Sauce)
                .HasMaxLength(100);

            builder.Property(x => x.AltText)
                .HasMaxLength(200);

            builder.Property(x => x.ImageUrl)
                .HasMaxLength(300);

            builder.HasOne(x => x.Category)
                .WithMany(x => x.Products)
                .HasForeignKey(x => x.CategoryId)
                .IsRequired(false)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasIndex(x => x.Slug)
                .IsUnique();

            builder.HasData(
                // Pizza (CategoryId = 1)
                new Product { Id = 1, Name = "Margherita", Slug = "margherita", Ingredients = "ost", Price = 95.00m, ImageUrl = "/images/products/pizza-margherita.jpg", AltText = "Margherita pizza med ost", Sauce = null, CategoryId = 1 },
                new Product { Id = 2, Name = "Vesuvio", Slug = "vesuvio", Ingredients = "skinka", Price = 99.00m, ImageUrl = "/images/products/pizza-vesuvio.jpg", AltText = "Vesuvio pizza med skinka", Sauce = null, CategoryId = 1 },
                new Product { Id = 3, Name = "Hawaii", Slug = "hawaii", Ingredients = "skinka, ananas", Price = 105.00m, ImageUrl = "/images/products/pizza-hawaii.jpg", AltText = "Hawaii pizza med skinka och ananas", Sauce = null, CategoryId = 1 },
                new Product { Id = 4, Name = "La Bussola", Slug = "la-bussola", Ingredients = "skinka, räkor", Price = 115.00m, ImageUrl = "/images/products/pizza-labussola.jpg", AltText = "La Bussola pizza med skinka och räkor", Sauce = null, CategoryId = 1 },
                new Product { Id = 5, Name = "Capricciosa", Slug = "capricciosa", Ingredients = "skinka, champinjoner", Price = 105.00m, ImageUrl = "/images/products/pizza-capricciosa.jpg", AltText = "Capricciosa pizza med skinka och champinjoner", Sauce = null, CategoryId = 1 },
                new Product { Id = 6, Name = "Ciao Ciao", Slug = "ciao-ciao", Ingredients = "oxfilé, tomat, champinjoner", Price = 129.00m, ImageUrl = "/images/products/pizza-ciaociao.jpg", AltText = "Ciao Ciao pizza med oxfilé", Sauce = "bearnaisesås", CategoryId = 1 },

                // Burger (CategoryId = 2)
                new Product { Id = 7, Name = "Classic", Slug = "classic", Ingredients = "sallad, tomat, lök, gurka", Price = 95.00m, ImageUrl = "/images/products/b-classic.jpg", AltText = "Classic hamburgare", Sauce = "dressing", CategoryId = 2 },
                new Product { Id = 8, Name = "Cheeseburgare", Slug = "cheeseburgare", Ingredients = "ost, sallad, tomat, gurka", Price = 99.00m, ImageUrl = "/images/products/b-cheeseburgare.jpg", AltText = "Cheeseburgare", Sauce = "dressing", CategoryId = 2 },
                new Product { Id = 9, Name = "Ost & Bacon", Slug = "ost-bacon", Ingredients = "bacon, ost, sallad, tomat", Price = 109.00m, ImageUrl = "/images/products/b-cheeseandbacon.jpg", AltText = "Ost & Bacon burgare", Sauce = "bbq-sås", CategoryId = 2 },
                new Product { Id = 10, Name = "Chili Jalapeño", Slug = "chili-jalapeno", Ingredients = "ost, jalapeños, sallad, tomat", Price = 109.00m, ImageUrl = "/images/products/b-chilijalapeno.jpg", AltText = "Chili Jalapeño burgare", Sauce = "dressing", CategoryId = 2 },
                new Product { Id = 11, Name = "Kycklingburgare", Slug = "kycklingburgare", Ingredients = "panerad kyckling, sallad, tomat", Price = 109.00m, ImageUrl = "/images/products/b-kycklingburgare.jpg", AltText = "Kycklingburgare", Sauce = "majonnäs", CategoryId = 2 },
                new Product { Id = 12, Name = "Veggie", Slug = "veggie", Ingredients = "vegetarisk biff, ost, sallad, tomat", Price = 105.00m, ImageUrl = "/images/products/b-veggie.jpg", AltText = "Veggie burgare", Sauce = "dressing", CategoryId = 2 },

                // Kebab (CategoryId = 3)
                new Product { Id = 13, Name = "Kebabtallrik", Slug = "kebabtallrik", Ingredients = "kebabkött, pommes, sallad", Price = 119.00m, ImageUrl = "/images/products/k-kebabtallrik.jpg", AltText = "Kebabtallrik med pommes", Sauce = null, CategoryId = 3 },
                new Product { Id = 14, Name = "Kebabrulle", Slug = "kebabrulle", Ingredients = "kebabkött, sallad, lök, tomat", Price = 109.00m, ImageUrl = "/images/products/k-kebabrulle.jpg", AltText = "Kebabrulle", Sauce = null, CategoryId = 3 },
                new Product { Id = 15, Name = "Kebab i bröd", Slug = "kebab-i-brod", Ingredients = "kebabkött, bröd, sallad", Price = 99.00m, ImageUrl = "/images/products/k-kebabibrod.jpg", AltText = "Kebab i bröd", Sauce = null, CategoryId = 3 },
                new Product { Id = 16, Name = "Kycklingrulle", Slug = "kycklingrulle", Ingredients = "kyckling, sallad, lök, tomat", Price = 109.00m, ImageUrl = "/images/products/k-kycklingrulle.jpg", AltText = "Kycklingrulle", Sauce = null, CategoryId = 3 },
                new Product { Id = 17, Name = "Gyrostallrik", Slug = "gyrostallrik", Ingredients = "gyros, pommes, sallad", Price = 119.00m, ImageUrl = "/images/products/k-gyrostallrik.jpg", AltText = "Gyrostallrik med pommes", Sauce = null, CategoryId = 3 },
                new Product { Id = 18, Name = "Falafelrulle", Slug = "falafelrulle", Ingredients = "falafel, sallad, lök, tomat", Price = 99.00m, ImageUrl = "/images/products/k-falafelrulle.jpg", AltText = "Falafelrulle", Sauce = null, CategoryId = 3 },

                // Pasta (CategoryId = 4)
                new Product { Id = 19, Name = "Spaghetti Bolognese", Slug = "spaghetti-bolognese", Ingredients = "köttfärssås, tomat, lök, parmesan", Price = 119.00m, ImageUrl = "/images/products/p-spaghettibolognese.jpg", AltText = "Spaghetti Bolognese", Sauce = null, CategoryId = 4 },
                new Product { Id = 20, Name = "Carbonara", Slug = "carbonara", Ingredients = "bacon, ägg, grädde, ost", Price = 119.00m, ImageUrl = "/images/products/p-carbonara.jpg", AltText = "Pasta Carbonara", Sauce = null, CategoryId = 4 },
                new Product { Id = 21, Name = "Vegetariana", Slug = "vegetariana", Ingredients = "svamp, paprika, lök, tomat", Price = 109.00m, ImageUrl = "/images/products/p-vegetariana.jpg", AltText = "Pasta Vegetariana", Sauce = null, CategoryId = 4 },
                new Product { Id = 22, Name = "Puttanesca", Slug = "puttanesca", Ingredients = "tomat, sardeller, oliver, kapris, vitlök", Price = 115.00m, ImageUrl = "/images/products/p-puttanesca.jpg", AltText = "Pasta Puttanesca", Sauce = null, CategoryId = 4 },
                new Product { Id = 23, Name = "Pasta Pollo", Slug = "pasta-pollo", Ingredients = "kyckling, grädde, lök, parmesan", Price = 129.00m, ImageUrl = "/images/products/p-pastapollo.jpg", AltText = "Pasta Pollo", Sauce = null, CategoryId = 4 },
                new Product { Id = 24, Name = "Arrabbiata", Slug = "arrabbiata", Ingredients = "tomat, chili, vitlök, persilja", Price = 109.00m, ImageUrl = "/images/products/p-arrabbiata.jpg", AltText = "Pasta Arrabbiata", Sauce = null, CategoryId = 4 },

                // Sallad (CategoryId = 5)
                new Product { Id = 25, Name = "Grekisk Sallad", Slug = "grekisk-sallad", Ingredients = "sallad, tomat, gurka, rödlök, oliver, fetaost", Price = 109.00m, ImageUrl = "/images/products/s-greeksalad.jpg", AltText = "Grekisk Sallad", Sauce = null, CategoryId = 5 },
                new Product { Id = 26, Name = "Kycklingsallad", Slug = "kycklingsallad", Ingredients = "kyckling, sallad, tomat, gurka", Price = 115.00m, ImageUrl = "/images/products/s-chickensalad.jpg", AltText = "Kycklingsallad", Sauce = null, CategoryId = 5 },
                new Product { Id = 27, Name = "Räksallad", Slug = "raksallad", Ingredients = "räkor, sallad, ägg, citron, dill", Price = 129.00m, ImageUrl = "/images/products/s-shrimpsalad.jpg", AltText = "Räksallad", Sauce = null, CategoryId = 5 },
                new Product { Id = 28, Name = "Caprese", Slug = "caprese", Ingredients = "tomat, mozzarella, basilika, olivolja, balsamico", Price = 109.00m, ImageUrl = "/images/products/s-caprese.jpg", AltText = "Caprese Sallad", Sauce = null, CategoryId = 5 },
                new Product { Id = 29, Name = "Caesarsallad", Slug = "caesarsallad", Ingredients = "romansallad, kyckling, krutonger, parmesan", Price = 125.00m, ImageUrl = "/images/products/s-caesarsalad.jpg", AltText = "Caesarsallad", Sauce = null, CategoryId = 5 },
                new Product { Id = 30, Name = "Halloumisallad", Slug = "halloumisallad", Ingredients = "grillad halloumi, sallad, tomat, gurka, rödlök", Price = 115.00m, ImageUrl = "/images/products/s-halloumisalad.jpg", AltText = "Halloumisallad", Sauce = null, CategoryId = 5 },

                // Grill (CategoryId = 6)
                new Product { Id = 31, Name = "Grillad Fläskfilé", Slug = "grillad-flaskfile", Ingredients = "fläskfilé, pommes", Price = 149.00m, ImageUrl = "/images/products/g-flaskfile.jpg", AltText = "Grillad fläskfilé med pommes", Sauce = null, CategoryId = 6 },
                new Product { Id = 32, Name = "Grillad Oxfilé", Slug = "grillad-oxfile", Ingredients = "oxfilé, pommes", Price = 189.00m, ImageUrl = "/images/products/g-oxfile.jpg", AltText = "Grillad oxfilé med pommes", Sauce = null, CategoryId = 6 },
                new Product { Id = 33, Name = "Grillad Kyckling", Slug = "grillad-kyckling", Ingredients = "kycklingfilé, pommes", Price = 139.00m, ImageUrl = "/images/products/g-kycklingfile.jpg", AltText = "Grillad kyckling med pommes", Sauce = null, CategoryId = 6 },
                new Product { Id = 34, Name = "Mixed Grill", Slug = "mixed-grill", Ingredients = "oxfilé, fläskfilé, kycklingfilé, pommes", Price = 199.00m, ImageUrl = "/images/products/g-mixedgrill.jpg", AltText = "Mixed grill med pommes", Sauce = null, CategoryId = 6 },

                // Tillbehör (CategoryId = 7)
                new Product { Id = 35, Name = "Pommes Frites", Slug = "pommes-frites", Ingredients = "pommes", Price = 35.00m, ImageUrl = "/images/products/pommes.png", AltText = "Pommes frites", Sauce = null, CategoryId = 7 },
                new Product { Id = 36, Name = "Sötpotatispommes", Slug = "sotpotatispommes", Ingredients = "sötpotatispommes", Price = 45.00m, ImageUrl = "/images/products/sotpommes.png", AltText = "Sötpotatispommes", Sauce = null, CategoryId = 7 },
                new Product { Id = 37, Name = "Mozzarellasticks", Slug = "mozzarellasticks", Ingredients = "mozzarella, panering", Price = 49.00m, ImageUrl = "/images/products/mozzarella.png", AltText = "Mozzarellasticks", Sauce = null, CategoryId = 7 },
                new Product { Id = 38, Name = "Lökringar", Slug = "lokringar", Ingredients = "lök, panering", Price = 39.00m, ImageUrl = "/images/products/lokringar.png", AltText = "Lökringar", Sauce = null, CategoryId = 7 },
                new Product { Id = 39, Name = "Vitlöksbröd", Slug = "vitloksbrod", Ingredients = "bröd, vitlök, smör", Price = 35.00m, ImageUrl = "/images/products/vitloksbrod.png", AltText = "Vitlöksbröd", Sauce = null, CategoryId = 7 },
                new Product { Id = 40, Name = "Pizzasallad", Slug = "pizzasallad", Ingredients = "vitkål, olja, vinäger", Price = 25.00m, ImageUrl = "/images/products/pizzasallad.png", AltText = "Pizzasallad", Sauce = null, CategoryId = 7 },
                new Product { Id = 41, Name = "Coleslaw", Slug = "coleslaw", Ingredients = "kål, morot, majonnäs", Price = 25.00m, ImageUrl = "/images/products/coleslaw.png", AltText = "Coleslaw", Sauce = null, CategoryId = 7 },
                new Product { Id = 42, Name = "Bearnaisesås", Slug = "bearnaisesas", Ingredients = "bearnaisesås", Price = 20.00m, ImageUrl = "/images/products/bea.png", AltText = "Bearnaisesås", Sauce = null, CategoryId = 7 },
                new Product { Id = 43, Name = "Vitlökssås", Slug = "vitlokssas", Ingredients = "vitlökssås", Price = 20.00m, ImageUrl = "/images/products/vitloksas.png", AltText = "Vitlökssås", Sauce = null, CategoryId = 7 },
                new Product { Id = 44, Name = "Chilisås", Slug = "chilisas", Ingredients = "chilisås", Price = 20.00m, ImageUrl = "/images/products/chilisas.png", AltText = "Chilisås", Sauce = null, CategoryId = 7 },

                // Dryck (CategoryId = 8)
                new Product { Id = 45, Name = "Cola Classic", Slug = "cola-classic", Ingredients = "cola", Price = 20.00m, ImageUrl = "/images/products/cola-classic.png", AltText = "Cola Classic", Sauce = null, CategoryId = 8 },
                new Product { Id = 46, Name = "Limonade Spritz", Slug = "limonade-spritz", Ingredients = "citrus soda", Price = 20.00m, ImageUrl = "/images/products/limonade-spritz.png", AltText = "Limonade Spritz", Sauce = null, CategoryId = 8 },
                new Product { Id = 47, Name = "Grape Sensation", Slug = "grape-sensation", Ingredients = "grape soda", Price = 20.00m, ImageUrl = "/images/products/grape-sensation.png", AltText = "Grape Sensation", Sauce = null, CategoryId = 8 },
                new Product { Id = 48, Name = "Tropical Punch", Slug = "tropical-punch", Ingredients = "tropical soda", Price = 20.00m, ImageUrl = "/images/products/tropical-punch.png", AltText = "Tropical Punch", Sauce = null, CategoryId = 8 },
                new Product { Id = 49, Name = "Dr. Cherry", Slug = "dr-cherry", Ingredients = "cherry cola", Price = 20.00m, ImageUrl = "/images/products/dr-cherry.png", AltText = "Dr. Cherry", Sauce = null, CategoryId = 8 },
                new Product { Id = 50, Name = "Root Beer Tradition", Slug = "root-beer-tradition", Ingredients = "root beer", Price = 20.00m, ImageUrl = "/images/products/root-beer.png", AltText = "Root Beer Tradition", Sauce = null, CategoryId = 8 },
                new Product { Id = 51, Name = "Cream Soda Delight", Slug = "cream-soda-delight", Ingredients = "cream soda", Price = 20.00m, ImageUrl = "/images/products/cream-soda.png", AltText = "Cream Soda Delight", Sauce = null, CategoryId = 8 },
                new Product { Id = 52, Name = "Lemon Tea Refresh", Slug = "lemon-tea-refresh", Ingredients = "lemon iced tea", Price = 20.00m, ImageUrl = "/images/products/lemon-tea.png", AltText = "Lemon Tea Refresh", Sauce = null, CategoryId = 8 },
                new Product { Id = 53, Name = "Ginger Ale Extra", Slug = "ginger-ale-extra", Ingredients = "ginger ale", Price = 20.00m, ImageUrl = "/images/products/ginger-ale.png", AltText = "Ginger Ale Extra", Sauce = null, CategoryId = 8 },
                new Product { Id = 54, Name = "Orange Burst", Slug = "orange-burst", Ingredients = "orange soda", Price = 20.00m, ImageUrl = "/images/products/orange-burst.png", AltText = "Orange Burst", Sauce = null, CategoryId = 8 }
            );
        }
    }
}