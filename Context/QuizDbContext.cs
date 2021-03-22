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
        public DbSet<Models.QuizQuestion> QuizQuestion { get; set; }
        public DbSet<Models.QuizAnswer> QuizAnswer { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Models.Quiz>()
                .HasMany(q => q.Questions)
                .WithOne(q => q.Quiz)
                .HasForeignKey(q => q.QuizID)
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<Models.QuizQuestion>()
                .HasMany(q => q.Answers)
                .WithOne(q => q.Question)
                .HasForeignKey(q => q.QuestionID)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}