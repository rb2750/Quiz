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
    public class EditModel : PageModel
    {
        private readonly QuizDbContext _context;
        public Models.Quiz quiz;

        public EditModel(QuizDbContext context)
        {
            _context = context;
        }

        public void OnGet(int quizId)
        {
            quiz = _context.Quizzes.FirstOrDefault(q => q.ID == quizId);
        }

        public ActionResult OnPostSaveQuiz(int quizId, List<QuizQuestion> questions)
        {
            //Remove all previous existing questions
            _context.QuizQuestion.RemoveRange(_context.QuizQuestion.Where(question => question.QuizID == quizId).ToList());

            //Insert the quiz id into each question.
            questions.ForEach(question => question.QuizID = quizId);

            //Insert all of the questions and answers
            _context.QuizQuestion.AddRange(questions);

            //Success if changes are made to the database
            return new JsonResult(new {success = _context.SaveChanges() > 0});
        }
    }
}