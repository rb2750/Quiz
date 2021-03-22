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
        public Models.QuizResponse response;

        public QuizModel(QuizDbContext context)
        {
            _context = context;
        }

        public void OnGet(int quizId, int? quizResponseId)
        {
            quiz = _context.Quizzes.Include(q => q.Questions).ThenInclude(q => q.Answers).FirstOrDefault(q => q.ID == quizId);

            if (quizResponseId != null) response = _context.QuizResponses.Include(qr => qr.Answers).FirstOrDefault(r => r.ID == quizResponseId);
        }

        public JsonResult OnPostSubmitQuiz(int quizId, List<QuizResponseItem> answers)
        {
            int changesMade = 0;

            var quizResponse = new QuizResponse {QuizID = quizId};

            _context.QuizResponses.Add(quizResponse);
            changesMade += _context.SaveChanges();

            answers.ForEach(answer => answer.QuizResponseId = quizResponse.ID);

            //Insert all the responses into the database.
            _context.QuizResponseItems.AddRange(answers);
            changesMade += _context.SaveChanges();

            return new JsonResult(new {success = changesMade > 0, message = changesMade > 0 ? null : "There was an error modifying the database."});
        }
    }
}