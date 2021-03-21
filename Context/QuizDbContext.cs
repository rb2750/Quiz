using Microsoft.EntityFrameworkCore;

namespace Quiz.Context
{
    public class QuizDbContext : DbContext
    {
        public QuizDbContext(DbContextOptions<QuizDbContext> options) : base(options)
        {
        }

        public DbSet<Models.Quiz> Quizzes { get; set; }
        public DbSet<Models.QuizResponse> QuizResponses { get; set; }
    }
}