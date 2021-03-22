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
using Quiz.Models;

namespace Quiz.Pages
{
    public class QuizModel : PageModel
    {
        private readonly QuizDbContext _context;
        public Models.Quiz quiz;

        public QuizModel(QuizDbContext context)
        {
            _context = context;
        }

        public void OnGet(int quizId)
        {
            quiz = _context.Quizzes.Include(q => q.Questions).ThenInclude(q => q.Answers).FirstOrDefault(q => q.ID == quizId);
        }
    }
}