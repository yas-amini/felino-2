using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Felino.Api.Migrations
{
    /// <inheritdoc />
    public partial class UpdateEntitiesAndFixDecimals : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_Categories_CategoryId",
                table: "Products");

            migrationBuilder.DropIndex(
                name: "IX_Payments_OrderId",
                table: "Payments");

            migrationBuilder.AlterColumn<string>(
                name: "Slug",
                table: "Products",
                type: "nvarchar(120)",
                maxLength: 120,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AlterColumn<string>(
                name: "Sauce",
                table: "Products",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Products",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "ImageUrl",
                table: "Products",
                type: "nvarchar(300)",
                maxLength: 300,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "AltText",
                table: "Products",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Slug",
                table: "Categories",
                type: "nvarchar(120)",
                maxLength: 120,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Categories",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "ImageUrl",
                table: "Categories",
                type: "nvarchar(300)",
                maxLength: 300,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "Categories",
                type: "nvarchar(300)",
                maxLength: 300,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "ImageUrl",
                table: "Campaigns",
                type: "nvarchar(300)",
                maxLength: 300,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "AltText",
                table: "Campaigns",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Username = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Role = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false, defaultValue: "Admin"),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Campaigns",
                columns: new[] { "Id", "AltText", "Body", "EndDate", "ImageUrl", "StartDate", "Title" },
                values: new object[,]
                {
                    { 1, "Lunchpizza erbjudande", "Alla pizzor för 89 kr mellan 11–14!", new DateTime(2026, 12, 31, 0, 0, 0, 0, DateTimeKind.Unspecified), "/images/campaigns/lunch.png", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Luncherbjudande" },
                    { 2, "Familjepizza erbjudande", "2 pizzor + 2 dryck för endast 199 kr!", new DateTime(2026, 12, 31, 0, 0, 0, 0, DateTimeKind.Unspecified), "/images/campaigns/family.png", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Familjepaket" },
                    { 3, "Helgdeal burgare", "Valfri burgare + pommes + dryck för 129 kr!", new DateTime(2026, 12, 31, 0, 0, 0, 0, DateTimeKind.Unspecified), "/images/campaigns/weekend.png", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Helgdeal" },
                    { 4, "Studentrabatt", "10% rabatt på hela menyn med studentkort.", new DateTime(2026, 12, 31, 0, 0, 0, 0, DateTimeKind.Unspecified), "/images/campaigns/student.png", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Studentrabatt" }
                });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Description", "ImageUrl" },
                values: new object[] { "Klassiska pizzor med olika toppings.", "/images/products/pizzas.png" });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Description", "ImageUrl", "Name" },
                values: new object[] { "Hamburgare med klassiska och moderna tillbehör.", "/images/products/burgers.png", "Burger" });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "Description", "ImageUrl" },
                values: new object[] { "Kebab, gyros och rullar serverade med fräscha tillbehör.", "/images/products/kebab.png" });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "Description", "ImageUrl" },
                values: new object[] { "Pastarätter med smakrika såser och klassiska recept.", "/images/products/pasta.png" });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "Description", "ImageUrl" },
                values: new object[] { "Fräscha sallader med kyckling, ost, räkor och grönsaker.", "/images/products/sallad.png" });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 6,
                columns: new[] { "Description", "ImageUrl" },
                values: new object[] { "Grillrätter serverade med pommes och goda tillbehör.", "/images/products/grill.png" });

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "Description", "ImageUrl", "Name", "Slug" },
                values: new object[,]
                {
                    { 7, "Pommes, såser och andra tillbehör som passar till maten.", "/images/products/tillbehor.png", "Tillbehör", "tillbehor" },
                    { 8, "Läsk, vatten och andra drycker till maten.", "/images/products/dryck.png", "Dryck", "dryck" }
                });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "AltText", "CategoryId", "ImageUrl", "Ingredients", "Name", "Price", "Sauce", "Slug" },
                values: new object[,]
                {
                    { 4, "La Bussola pizza med skinka och räkor", 1, "/images/products/pizza-labussola.jpg", "[\"skinka\", \"räkor\"]", "La Bussola", 115.00m, null, "la-bussola" },
                    { 5, "Capricciosa pizza med skinka och champinjoner", 1, "/images/products/pizza-capricciosa.jpg", "[\"skinka\", \"champinjoner\"]", "Capricciosa", 105.00m, null, "capricciosa" },
                    { 6, "Ciao Ciao pizza med oxfilé", 1, "/images/products/pizza-ciaociao.jpg", "[\"oxfilé\", \"tomat\", \"champinjoner\"]", "Ciao Ciao", 129.00m, "bearnaisesås", "ciao-ciao" },
                    { 8, "Cheeseburgare", 2, "/images/products/b-cheeseburgare.jpg", "[\"ost\", \"sallad\", \"tomat\", \"gurka\"]", "Cheeseburgare", 99.00m, "dressing", "cheeseburgare" },
                    { 9, "Ost & Bacon burgare", 2, "/images/products/b-cheeseandbacon.jpg", "[\"bacon\", \"ost\", \"sallad\", \"tomat\"]", "Ost & Bacon", 109.00m, "bbq-sås", "ost-bacon" },
                    { 10, "Chili Jalapeño burgare", 2, "/images/products/b-chilijalapeno.jpg", "[\"ost\", \"jalapeños\", \"sallad\", \"tomat\"]", "Chili Jalapeño", 109.00m, "dressing", "chili-jalapeno" },
                    { 11, "Kycklingburgare", 2, "/images/products/b-kycklingburgare.jpg", "[\"panerad kyckling\", \"sallad\", \"tomat\"]", "Kycklingburgare", 109.00m, "majonnäs", "kycklingburgare" },
                    { 12, "Veggie burgare", 2, "/images/products/b-veggie.jpg", "[\"vegetarisk biff\", \"ost\", \"sallad\", \"tomat\"]", "Veggie", 105.00m, "dressing", "veggie" },
                    { 14, "Kebabrulle", 3, "/images/products/k-kebabrulle.jpg", "[\"kebabkött\", \"sallad\", \"lök\", \"tomat\"]", "Kebabrulle", 109.00m, null, "kebabrulle" },
                    { 15, "Kebab i bröd", 3, "/images/products/k-kebabibrod.jpg", "[\"kebabkött\", \"bröd\", \"sallad\"]", "Kebab i bröd", 99.00m, null, "kebab-i-brod" },
                    { 16, "Kycklingrulle", 3, "/images/products/k-kycklingrulle.jpg", "[\"kyckling\", \"sallad\", \"lök\", \"tomat\"]", "Kycklingrulle", 109.00m, null, "kycklingrulle" },
                    { 17, "Gyrostallrik med pommes", 3, "/images/products/k-gyrostallrik.jpg", "[\"gyros\", \"pommes\", \"sallad\"]", "Gyrostallrik", 119.00m, null, "gyrostallrik" },
                    { 18, "Falafelrulle", 3, "/images/products/k-falafelrulle.jpg", "[\"falafel\", \"sallad\", \"lök\", \"tomat\"]", "Falafelrulle", 99.00m, null, "falafelrulle" },
                    { 19, "Spaghetti Bolognese", 4, "/images/products/p-spaghettibolognese.jpg", "[\"köttfärssås\", \"tomat\", \"lök\", \"parmesan\"]", "Spaghetti Bolognese", 119.00m, null, "spaghetti-bolognese" },
                    { 20, "Pasta Carbonara", 4, "/images/products/p-carbonara.jpg", "[\"bacon\", \"ägg\", \"grädde\", \"ost\"]", "Carbonara", 119.00m, null, "carbonara" },
                    { 21, "Pasta Vegetariana", 4, "/images/products/p-vegetariana.jpg", "[\"svamp\", \"paprika\", \"lök\", \"tomat\"]", "Vegetariana", 109.00m, null, "vegetariana" },
                    { 22, "Pasta Puttanesca", 4, "/images/products/p-puttanesca.jpg", "[\"tomat\", \"sardeller\", \"oliver\", \"kapris\", \"vitlök\"]", "Puttanesca", 115.00m, null, "puttanesca" },
                    { 23, "Pasta Pollo", 4, "/images/products/p-pastapollo.jpg", "[\"kyckling\", \"grädde\", \"lök\", \"parmesan\"]", "Pasta Pollo", 129.00m, null, "pasta-pollo" },
                    { 24, "Pasta Arrabbiata", 4, "/images/products/p-arrabbiata.jpg", "[\"tomat\", \"chili\", \"vitlök\", \"persilja\"]", "Arrabbiata", 109.00m, null, "arrabbiata" },
                    { 25, "Grekisk Sallad", 5, "/images/products/s-greeksalad.jpg", "[\"sallad\", \"tomat\", \"gurka\", \"rödlök\", \"oliver\", \"fetaost\"]", "Grekisk Sallad", 109.00m, null, "grekisk-sallad" },
                    { 26, "Kycklingsallad", 5, "/images/products/s-chickensalad.jpg", "[\"kyckling\", \"sallad\", \"tomat\", \"gurka\"]", "Kycklingsallad", 115.00m, null, "kycklingsallad" },
                    { 27, "Räksallad", 5, "/images/products/s-shrimpsalad.jpg", "[\"räkor\", \"sallad\", \"ägg\", \"citron\", \"dill\"]", "Räksallad", 129.00m, null, "raksallad" },
                    { 28, "Caprese Sallad", 5, "/images/products/s-caprese.jpg", "[\"tomat\", \"mozzarella\", \"basilika\", \"olivolja\", \"balsamico\"]", "Caprese", 109.00m, null, "caprese" },
                    { 29, "Caesarsallad", 5, "/images/products/s-caesarsalad.jpg", "[\"romansallad\", \"kyckling\", \"krutonger\", \"parmesan\"]", "Caesarsallad", 125.00m, null, "caesarsallad" },
                    { 30, "Halloumisallad", 5, "/images/products/s-halloumisalad.jpg", "[\"grillad halloumi\", \"sallad\", \"tomat\", \"gurka\", \"rödlök\"]", "Halloumisallad", 115.00m, null, "halloumisallad" },
                    { 31, "Grillad fläskfilé med pommes", 6, "/images/products/g-flaskfile.jpg", "[\"fläskfilé\", \"pommes\"]", "Grillad Fläskfilé", 149.00m, null, "grillad-flaskfile" },
                    { 32, "Grillad oxfilé med pommes", 6, "/images/products/g-oxfile.jpg", "[\"oxfilé\", \"pommes\"]", "Grillad Oxfilé", 189.00m, null, "grillad-oxfile" },
                    { 33, "Grillad kyckling med pommes", 6, "/images/products/g-kycklingfile.jpg", "[\"kycklingfilé\", \"pommes\"]", "Grillad Kyckling", 139.00m, null, "grillad-kyckling" },
                    { 34, "Mixed grill med pommes", 6, "/images/products/g-mixedgrill.jpg", "[\"oxfilé\", \"fläskfilé\", \"kycklingfilé\", \"pommes\"]", "Mixed Grill", 199.00m, null, "mixed-grill" },
                    { 35, "Pommes frites", 7, "/images/products/pommes.png", "[\"pommes\"]", "Pommes Frites", 35.00m, null, "pommes-frites" },
                    { 36, "Sötpotatispommes", 7, "/images/products/sotpommes.png", "[\"sötpotatispommes\"]", "Sötpotatispommes", 45.00m, null, "sotpotatispommes" },
                    { 37, "Mozzarellasticks", 7, "/images/products/mozzarella.png", "[\"mozzarella\", \"panering\"]", "Mozzarellasticks", 49.00m, null, "mozzarellasticks" },
                    { 38, "Lökringar", 7, "/images/products/lokringar.png", "[\"lök\", \"panering\"]", "Lökringar", 39.00m, null, "lokringar" },
                    { 39, "Vitlöksbröd", 7, "/images/products/vitloksbrod.png", "[\"bröd\", \"vitlök\", \"smör\"]", "Vitlöksbröd", 35.00m, null, "vitloksbrod" },
                    { 40, "Pizzasallad", 7, "/images/products/pizzasallad.png", "[\"vitkål\", \"olja\", \"vinäger\"]", "Pizzasallad", 25.00m, null, "pizzasallad" },
                    { 41, "Coleslaw", 7, "/images/products/coleslaw.png", "[\"kål\", \"morot\", \"majonnäs\"]", "Coleslaw", 25.00m, null, "coleslaw" },
                    { 42, "Bearnaisesås", 7, "/images/products/bea.png", "[\"bearnaisesås\"]", "Bearnaisesås", 20.00m, null, "bearnaisesas" },
                    { 43, "Vitlökssås", 7, "/images/products/vitloksas.png", "[\"vitlökssås\"]", "Vitlökssås", 20.00m, null, "vitlokssas" },
                    { 44, "Chilisås", 7, "/images/products/chilisas.png", "[\"chilisås\"]", "Chilisås", 20.00m, null, "chilisas" },
                    { 45, "Cola Classic", 8, "/images/products/cola-classic.png", "[\"cola\"]", "Cola Classic", 20.00m, null, "cola-classic" },
                    { 46, "Limonade Spritz", 8, "/images/products/limonade-spritz.png", "[\"citrus soda\"]", "Limonade Spritz", 20.00m, null, "limonade-spritz" },
                    { 47, "Grape Sensation", 8, "/images/products/grape-sensation.png", "[\"grape soda\"]", "Grape Sensation", 20.00m, null, "grape-sensation" },
                    { 48, "Tropical Punch", 8, "/images/products/tropical-punch.png", "[\"tropical soda\"]", "Tropical Punch", 20.00m, null, "tropical-punch" },
                    { 49, "Dr. Cherry", 8, "/images/products/dr-cherry.png", "[\"cherry cola\"]", "Dr. Cherry", 20.00m, null, "dr-cherry" },
                    { 50, "Root Beer Tradition", 8, "/images/products/root-beer.png", "[\"root beer\"]", "Root Beer Tradition", 20.00m, null, "root-beer-tradition" },
                    { 51, "Cream Soda Delight", 8, "/images/products/cream-soda.png", "[\"cream soda\"]", "Cream Soda Delight", 20.00m, null, "cream-soda-delight" },
                    { 52, "Lemon Tea Refresh", 8, "/images/products/lemon-tea.png", "[\"lemon iced tea\"]", "Lemon Tea Refresh", 20.00m, null, "lemon-tea-refresh" },
                    { 53, "Ginger Ale Extra", 8, "/images/products/ginger-ale.png", "[\"ginger ale\"]", "Ginger Ale Extra", 20.00m, null, "ginger-ale-extra" },
                    { 54, "Orange Burst", 8, "/images/products/orange-burst.png", "[\"orange soda\"]", "Orange Burst", 20.00m, null, "orange-burst" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Payments_OrderId",
                table: "Payments",
                column: "OrderId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_OrderItems_ProductId",
                table: "OrderItems",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_Username",
                table: "Users",
                column: "Username",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_OrderItems_Products_ProductId",
                table: "OrderItems",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_Categories_CategoryId",
                table: "Products",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderItems_Products_ProductId",
                table: "OrderItems");

            migrationBuilder.DropForeignKey(
                name: "FK_Products_Categories_CategoryId",
                table: "Products");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Payments_OrderId",
                table: "Payments");

            migrationBuilder.DropIndex(
                name: "IX_OrderItems_ProductId",
                table: "OrderItems");

            migrationBuilder.DeleteData(
                table: "Campaigns",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Campaigns",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Campaigns",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Campaigns",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 11);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 12);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 14);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 15);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 16);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 17);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 18);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 19);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 20);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 21);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 22);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 23);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 24);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 25);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 26);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 27);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 28);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 29);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 30);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 31);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 32);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 33);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 34);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 35);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 36);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 37);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 38);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 39);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 40);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 41);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 42);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 43);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 44);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 45);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 46);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 47);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 48);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 49);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 50);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 51);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 52);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 53);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 54);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.AlterColumn<string>(
                name: "Slug",
                table: "Products",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(120)",
                oldMaxLength: 120);

            migrationBuilder.AlterColumn<string>(
                name: "Sauce",
                table: "Products",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(100)",
                oldMaxLength: 100,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Products",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(100)",
                oldMaxLength: 100);

            migrationBuilder.AlterColumn<string>(
                name: "ImageUrl",
                table: "Products",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(300)",
                oldMaxLength: 300,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "AltText",
                table: "Products",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(200)",
                oldMaxLength: 200,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Slug",
                table: "Categories",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(120)",
                oldMaxLength: 120);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Categories",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(100)",
                oldMaxLength: 100);

            migrationBuilder.AlterColumn<string>(
                name: "ImageUrl",
                table: "Categories",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(300)",
                oldMaxLength: 300,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "Categories",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(300)",
                oldMaxLength: 300);

            migrationBuilder.AlterColumn<string>(
                name: "ImageUrl",
                table: "Campaigns",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(300)",
                oldMaxLength: 300,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "AltText",
                table: "Campaigns",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(200)",
                oldMaxLength: 200,
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Description", "ImageUrl" },
                values: new object[] { "", null });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Description", "ImageUrl", "Name" },
                values: new object[] { "", null, "Burgare" });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "Description", "ImageUrl" },
                values: new object[] { "", null });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "Description", "ImageUrl" },
                values: new object[] { "", null });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "Description", "ImageUrl" },
                values: new object[] { "", null });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 6,
                columns: new[] { "Description", "ImageUrl" },
                values: new object[] { "", null });

            migrationBuilder.CreateIndex(
                name: "IX_Payments_OrderId",
                table: "Payments",
                column: "OrderId");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_Categories_CategoryId",
                table: "Products",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
