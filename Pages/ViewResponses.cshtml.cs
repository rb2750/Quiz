using System.Linq;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using Quiz.Context;

namespace Quiz.Pages
{
    public class ViewResponses : PageModel
    {
        private readonly QuizDbContext _context;
        public Models.Quiz quiz;

        public ViewResponses(QuizDbContext context)
        {
            _context = context;
        }

        public void OnGet(int quizId)
        {
            quiz = _context.Quizzes.Include(q => q.Responses).FirstOrDefault(q => q.ID == quizId);
        }
    }
}