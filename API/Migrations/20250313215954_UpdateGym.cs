using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class UpdateGym : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1212f2f2-2524-4a57-a6f1-285764afa7bd");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "d565fb2b-a9a5-464b-aee6-fdabb453c2f2");

            migrationBuilder.DropColumn(
                name: "Fighter",
                table: "Gym");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "944a1fd7-68a0-4e66-b764-6bc218dd512a", null, "User", "USER" },
                    { "daae597e-ec41-46d7-9a77-c9768c35f3db", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "944a1fd7-68a0-4e66-b764-6bc218dd512a");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "daae597e-ec41-46d7-9a77-c9768c35f3db");

            migrationBuilder.AddColumn<string>(
                name: "Fighter",
                table: "Gym",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "1212f2f2-2524-4a57-a6f1-285764afa7bd", null, "Admin", "ADMIN" },
                    { "d565fb2b-a9a5-464b-aee6-fdabb453c2f2", null, "User", "USER" }
                });
        }
    }
}
