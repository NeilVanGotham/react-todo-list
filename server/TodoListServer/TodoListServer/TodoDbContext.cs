using Microsoft.EntityFrameworkCore;

namespace TodoListServer;

public class Todo
{
    public string Id { get; set; } = default!;
    public string Text { get; set; } = default!;
    public bool Completed { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}

public class TodoDbContext(DbContextOptions<TodoDbContext> options) : DbContext(options)
{
    public DbSet<Todo> Todos => Set<Todo>();
}