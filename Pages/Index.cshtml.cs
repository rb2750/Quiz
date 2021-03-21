using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Quiz.Context;

namespace Quiz.Pages
{
    public class IndexModel : PageModel
    {
        private readonly ILogger<IndexModel> _logger;
        private readonly QuizDbContext _context;
        public List<Models.Quiz> quizzes = new();

        public IndexModel(ILogger<IndexModel> logger, QuizDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        public void OnGet()
        {
            quizzes = _context.Quizzes.Include(quiz => quiz.Responses).ToList();
        }
    }
}