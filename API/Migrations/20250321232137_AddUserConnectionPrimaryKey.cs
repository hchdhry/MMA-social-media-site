using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class AddUserConnectionPrimaryKey : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "944a1fd7-68a0-4e66-b764-6bc218dd512a");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "daae597e-ec41-46d7-9a77-c9768c35f3db");

            migrationBuilder.CreateTable(
                name: "UserConnections",
                columns: table => new
                {
                    ConnectionId = table.Column<string>(type: "text", nullable: false),
                    EventName = table.Column<string>(type: "text", nullable: false),
                    UserName = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserConnections", x => x.ConnectionId);
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "9dba8c30-735e-4b66-91ae-02eaba12e336", null, "User", "USER" },
                    { "f43b3865-ec0a-4995-a09a-67404c0bfb8f", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserConnections");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9dba8c30-735e-4b66-91ae-02eaba12e336");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f43b3865-ec0a-4995-a09a-67404c0bfb8f");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "944a1fd7-68a0-4e66-b764-6bc218dd512a", null, "User", "USER" },
                    { "daae597e-ec41-46d7-9a77-c9768c35f3db", null, "Admin", "ADMIN" }
                });
        }
    }
}
