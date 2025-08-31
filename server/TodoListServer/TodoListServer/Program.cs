using Microsoft.EntityFrameworkCore;
using TodoListServer;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<TodoDbContext>(options =>
    options.UseSqlite("Data Source=todos.db"));

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

app.UseHttpsRedirection();
app.UseCors("AllowAll");

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<TodoDbContext>();
    db.Database.EnsureCreated();
}

app.MapGet("/todos", async (TodoDbContext db) =>
    await db.Todos.AsNoTracking().ToListAsync());

app.MapPost("/todos", async (TodoDbContext db, Todo todo) =>
{
    todo.Id = Guid.NewGuid().ToString();
    todo.CreatedAt = DateTime.UtcNow;
    todo.UpdatedAt = DateTime.UtcNow;
    db.Todos.Add(todo);
    await db.SaveChangesAsync();
    return Results.Created($"/todos/{todo.Id}", todo);
});

app.MapPut("/todos/{id}", async (TodoDbContext db, string id, Todo updated) =>
{
    var todo = await db.Todos.FindAsync(id);
    if (todo is null) return Results.NotFound();
    todo.Text = updated.Text;
    todo.Completed = updated.Completed;
    todo.UpdatedAt = DateTime.UtcNow;
    await db.SaveChangesAsync();
    return Results.Ok(todo);
});

app.MapDelete("/todos/{id}", async (TodoDbContext db, string id) =>
{
    var todo = await db.Todos.FindAsync(id);
    if (todo is null) return Results.NotFound();
    db.Todos.Remove(todo);
    await db.SaveChangesAsync();
    return Results.NoContent();
});

app.Run();
