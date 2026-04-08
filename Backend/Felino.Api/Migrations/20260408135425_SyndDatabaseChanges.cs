using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Felino.Api.Migrations
{
    /// <inheritdoc />
    public partial class SyndDatabaseChanges : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                column: "Ingredients",
                value: "ost");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2,
                column: "Ingredients",
                value: "skinka");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 3,
                column: "Ingredients",
                value: "skinka, ananas");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 4,
                column: "Ingredients",
                value: "skinka, räkor");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 5,
                column: "Ingredients",
                value: "skinka, champinjoner");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 6,
                column: "Ingredients",
                value: "oxfilé, tomat, champinjoner");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 7,
                column: "Ingredients",
                value: "sallad, tomat, lök, gurka");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 8,
                column: "Ingredients",
                value: "ost, sallad, tomat, gurka");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 9,
                column: "Ingredients",
                value: "bacon, ost, sallad, tomat");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 10,
                column: "Ingredients",
                value: "ost, jalapeños, sallad, tomat");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 11,
                column: "Ingredients",
                value: "panerad kyckling, sallad, tomat");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 12,
                column: "Ingredients",
                value: "vegetarisk biff, ost, sallad, tomat");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 13,
                column: "Ingredients",
                value: "kebabkött, pommes, sallad");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 14,
                column: "Ingredients",
                value: "kebabkött, sallad, lök, tomat");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 15,
                column: "Ingredients",
                value: "kebabkött, bröd, sallad");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 16,
                column: "Ingredients",
                value: "kyckling, sallad, lök, tomat");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 17,
                column: "Ingredients",
                value: "gyros, pommes, sallad");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 18,
                column: "Ingredients",
                value: "falafel, sallad, lök, tomat");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 19,
                column: "Ingredients",
                value: "köttfärssås, tomat, lök, parmesan");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 20,
                column: "Ingredients",
                value: "bacon, ägg, grädde, ost");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 21,
                column: "Ingredients",
                value: "svamp, paprika, lök, tomat");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 22,
                column: "Ingredients",
                value: "tomat, sardeller, oliver, kapris, vitlök");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 23,
                column: "Ingredients",
                value: "kyckling, grädde, lök, parmesan");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 24,
                column: "Ingredients",
                value: "tomat, chili, vitlök, persilja");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 25,
                column: "Ingredients",
                value: "sallad, tomat, gurka, rödlök, oliver, fetaost");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 26,
                column: "Ingredients",
                value: "kyckling, sallad, tomat, gurka");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 27,
                column: "Ingredients",
                value: "räkor, sallad, ägg, citron, dill");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 28,
                column: "Ingredients",
                value: "tomat, mozzarella, basilika, olivolja, balsamico");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 29,
                column: "Ingredients",
                value: "romansallad, kyckling, krutonger, parmesan");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 30,
                column: "Ingredients",
                value: "grillad halloumi, sallad, tomat, gurka, rödlök");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 31,
                column: "Ingredients",
                value: "fläskfilé, pommes");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 32,
                column: "Ingredients",
                value: "oxfilé, pommes");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 33,
                column: "Ingredients",
                value: "kycklingfilé, pommes");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 34,
                column: "Ingredients",
                value: "oxfilé, fläskfilé, kycklingfilé, pommes");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 35,
                column: "Ingredients",
                value: "pommes");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 36,
                column: "Ingredients",
                value: "sötpotatispommes");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 37,
                column: "Ingredients",
                value: "mozzarella, panering");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 38,
                column: "Ingredients",
                value: "lök, panering");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 39,
                column: "Ingredients",
                value: "bröd, vitlök, smör");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 40,
                column: "Ingredients",
                value: "vitkål, olja, vinäger");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 41,
                column: "Ingredients",
                value: "kål, morot, majonnäs");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 42,
                column: "Ingredients",
                value: "bearnaisesås");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 43,
                column: "Ingredients",
                value: "vitlökssås");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 44,
                column: "Ingredients",
                value: "chilisås");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 45,
                column: "Ingredients",
                value: "cola");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 46,
                column: "Ingredients",
                value: "citrus soda");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 47,
                column: "Ingredients",
                value: "grape soda");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 48,
                column: "Ingredients",
                value: "tropical soda");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 49,
                column: "Ingredients",
                value: "cherry cola");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 50,
                column: "Ingredients",
                value: "root beer");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 51,
                column: "Ingredients",
                value: "cream soda");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 52,
                column: "Ingredients",
                value: "lemon iced tea");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 53,
                column: "Ingredients",
                value: "ginger ale");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 54,
                column: "Ingredients",
                value: "orange soda");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                column: "Ingredients",
                value: "[\"ost\"]");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2,
                column: "Ingredients",
                value: "[\"skinka\"]");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 3,
                column: "Ingredients",
                value: "[\"skinka\", \"ananas\"]");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 4,
                column: "Ingredients",
                value: "[\"skinka\", \"räkor\"]");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 5,
                column: "Ingredients",
                value: "[\"skinka\", \"champinjoner\"]");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 6,
                column: "Ingredients",
                value: "[\"oxfilé\", \"tomat\", \"champinjoner\"]");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 7,
                column: "Ingredients",
                value: "[\"sallad\", \"tomat\", \"lök\", \"gurka\"]");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 8,
                column: "Ingredients",
                value: "[\"ost\", \"sallad\", \"tomat\", \"gurka\"]");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 9,
                column: "Ingredients",
                value: "[\"bacon\", \"ost\", \"sallad\", \"tomat\"]");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 10,
                column: "Ingredients",
                value: "[\"ost\", \"jalapeños\", \"sallad\", \"tomat\"]");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 11,
                column: "Ingredients",
                value: "[\"panerad kyckling\", \"sallad\", \"tomat\"]");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 12,
                column: "Ingredients",
                value: "[\"vegetarisk biff\", \"ost\", \"sallad\", \"tomat\"]");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 13,
                column: "Ingredients",
                value: "[\"kebabkött\", \"pommes\", \"sallad\"]");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 14,
                column: "Ingredients",
                value: "[\"kebabkött\", \"sallad\", \"lök\", \"tomat\"]");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 15,
                column: "Ingredients",
                value: "[\"kebabkött\", \"bröd\", \"sallad\"]");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 16,
                column: "Ingredients",
                value: "[\"kyckling\", \"sallad\", \"lök\", \"tomat\"]");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 17,
                column: "Ingredients",
                value: "[\"gyros\", \"pommes\", \"sallad\"]");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 18,
                column: "Ingredients",
                value: "[\"falafel\", \"sallad\", \"lök\", \"tomat\"]");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 19,
                column: "Ingredients",
                value: "[\"köttfärssås\", \"tomat\", \"lök\", \"parmesan\"]");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 20,
                column: "Ingredients",
                value: "[\"bacon\", \"ägg\", \"grädde\", \"ost\"]");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 21,
                column: "Ingredients",
                value: "[\"svamp\", \"paprika\", \"lök\", \"tomat\"]");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 22,
                column: "Ingredients",
                value: "[\"tomat\", \"sardeller\", \"oliver\", \"kapris\", \"vitlök\"]");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 23,
                column: "Ingredients",
                value: "[\"kyckling\", \"grädde\", \"lök\", \"parmesan\"]");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 24,
                column: "Ingredients",
                value: "[\"tomat\", \"chili\", \"vitlök\", \"persilja\"]");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 25,
                column: "Ingredients",
                value: "[\"sallad\", \"tomat\", \"gurka\", \"rödlök\", \"oliver\", \"fetaost\"]");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 26,
                column: "Ingredients",
                value: "[\"kyckling\", \"sallad\", \"tomat\", \"gurka\"]");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 27,
                column: "Ingredients",
                value: "[\"räkor\", \"sallad\", \"ägg\", \"citron\", \"dill\"]");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 28,
                column: "Ingredients",
                value: "[\"tomat\", \"mozzarella\", \"basilika\", \"olivolja\", \"balsamico\"]");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 29,
                column: "Ingredients",
                value: "[\"romansallad\", \"kyckling\", \"krutonger\", \"parmesan\"]");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 30,
                column: "Ingredients",
                value: "[\"grillad halloumi\", \"sallad\", \"tomat\", \"gurka\", \"rödlök\"]");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 31,
                column: "Ingredients",
                value: "[\"fläskfilé\", \"pommes\"]");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 32,
                column: "Ingredients",
                value: "[\"oxfilé\", \"pommes\"]");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 33,
                column: "Ingredients",
                value: "[\"kycklingfilé\", \"pommes\"]");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 34,
                column: "Ingredients",
                value: "[\"oxfilé\", \"fläskfilé\", \"kycklingfilé\", \"pommes\"]");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 35,
                column: "Ingredients",
                value: "[\"pommes\"]");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 36,
                column: "Ingredients",
                value: "[\"sötpotatispommes\"]");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 37,
                column: "Ingredients",
                value: "[\"mozzarella\", \"panering\"]");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 38,
                column: "Ingredients",
                value: "[\"lök\", \"panering\"]");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 39,
                column: "Ingredients",
                value: "[\"bröd\", \"vitlök\", \"smör\"]");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 40,
                column: "Ingredients",
                value: "[\"vitkål\", \"olja\", \"vinäger\"]");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 41,
                column: "Ingredients",
                value: "[\"kål\", \"morot\", \"majonnäs\"]");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 42,
                column: "Ingredients",
                value: "[\"bearnaisesås\"]");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 43,
                column: "Ingredients",
                value: "[\"vitlökssås\"]");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 44,
                column: "Ingredients",
                value: "[\"chilisås\"]");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 45,
                column: "Ingredients",
                value: "[\"cola\"]");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 46,
                column: "Ingredients",
                value: "[\"citrus soda\"]");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 47,
                column: "Ingredients",
                value: "[\"grape soda\"]");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 48,
                column: "Ingredients",
                value: "[\"tropical soda\"]");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 49,
                column: "Ingredients",
                value: "[\"cherry cola\"]");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 50,
                column: "Ingredients",
                value: "[\"root beer\"]");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 51,
                column: "Ingredients",
                value: "[\"cream soda\"]");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 52,
                column: "Ingredients",
                value: "[\"lemon iced tea\"]");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 53,
                column: "Ingredients",
                value: "[\"ginger ale\"]");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 54,
                column: "Ingredients",
                value: "[\"orange soda\"]");
        }
    }
}
