using Microsoft.EntityFrameworkCore.Migrations;

namespace CulinaryC.Migrations
{
    public partial class Kitchen : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK__Favorite__Recipe__5FB337D6",
                table: "Favorite");

            migrationBuilder.DropForeignKey(
                name: "FK__Favorite__UserId__60A75C0F",
                table: "Favorite");

            migrationBuilder.DropForeignKey(
                name: "FK__Group__UserId__6E01572D",
                table: "Group");

            migrationBuilder.DropForeignKey(
                name: "FK__Ingredien__Recip__66603565",
                table: "Ingredients");

            migrationBuilder.DropForeignKey(
                name: "FK__Recipes__UserId__5CD6CB2B",
                table: "Recipes");

            migrationBuilder.DropForeignKey(
                name: "FK__UserGroup__Group__59FA5E80",
                table: "UserGroup");

            migrationBuilder.DropForeignKey(
                name: "FK__UserGroup__UserI__59063A47",
                table: "UserGroup");

            migrationBuilder.DropForeignKey(
                name: "FK__Users__LoginId__5535A963",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_LoginId",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Favorite_RecipeId",
                table: "Favorite");

            migrationBuilder.AddColumn<string>(
                name: "Aisle",
                table: "Ingredients",
                maxLength: 50,
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Friends",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(nullable: true),
                    FriendId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Friends", x => x.id);
                    table.ForeignKey(
                        name: "FK__Friends__UserId__1DB06A4F",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Friends_UserId",
                table: "Friends",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK__Favorite__UserId__17036CC0",
                table: "Favorite",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK__Group__UserId__07C12930",
                table: "Group",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK__Ingredien__Recip__19DFD96B",
                table: "Ingredients",
                column: "RecipeId",
                principalTable: "Recipes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK__Recipes__UserId__0D7A0286",
                table: "Recipes",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK__UserGroup__Group__0A9D95DB",
                table: "UserGroup",
                column: "GroupId",
                principalTable: "Group",
                principalColumn: "GroupId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK__UserGroup__UserI__09A971A2",
                table: "UserGroup",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK__Favorite__UserId__17036CC0",
                table: "Favorite");

            migrationBuilder.DropForeignKey(
                name: "FK__Group__UserId__07C12930",
                table: "Group");

            migrationBuilder.DropForeignKey(
                name: "FK__Ingredien__Recip__19DFD96B",
                table: "Ingredients");

            migrationBuilder.DropForeignKey(
                name: "FK__Recipes__UserId__0D7A0286",
                table: "Recipes");

            migrationBuilder.DropForeignKey(
                name: "FK__UserGroup__Group__0A9D95DB",
                table: "UserGroup");

            migrationBuilder.DropForeignKey(
                name: "FK__UserGroup__UserI__09A971A2",
                table: "UserGroup");

            migrationBuilder.DropTable(
                name: "Friends");

            migrationBuilder.DropColumn(
                name: "Aisle",
                table: "Ingredients");

            migrationBuilder.CreateIndex(
                name: "IX_Users_LoginId",
                table: "Users",
                column: "LoginId");

            migrationBuilder.CreateIndex(
                name: "IX_Favorite_RecipeId",
                table: "Favorite",
                column: "RecipeId");

            migrationBuilder.AddForeignKey(
                name: "FK__Favorite__Recipe__5FB337D6",
                table: "Favorite",
                column: "RecipeId",
                principalTable: "Recipes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK__Favorite__UserId__60A75C0F",
                table: "Favorite",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK__Group__UserId__6E01572D",
                table: "Group",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK__Ingredien__Recip__66603565",
                table: "Ingredients",
                column: "RecipeId",
                principalTable: "Recipes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK__Recipes__UserId__5CD6CB2B",
                table: "Recipes",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK__UserGroup__Group__59FA5E80",
                table: "UserGroup",
                column: "GroupId",
                principalTable: "Group",
                principalColumn: "GroupId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK__UserGroup__UserI__59063A47",
                table: "UserGroup",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK__Users__LoginId__5535A963",
                table: "Users",
                column: "LoginId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
