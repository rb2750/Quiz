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
    public class IndexModel : PageModel
    {
        private readonly QuizDbContext _context;
        public List<Models.Quiz> quizzes = new();

        public IndexModel(QuizDbContext context)
        {
            _context = context;
        }

        public void OnGet()
        {
            //Load the quizzes to be displayed on the page.
            quizzes = _context.Quizzes.Include(quiz => quiz.Responses).ToList();
        }

        /**
         * Deletes a quiz given its ID
         */
        public ActionResult OnPostDeleteQuiz(int? quizId)
        {
            var quizInstance = _context.Quizzes.FirstOrDefault(q => q.ID == quizId);

            if (quizInstance == null)
            {
                return new JsonResult(new {success = false, message = "Could not find a quiz by that ID."});
            }

            _context.Quizzes.Remove(quizInstance);

            //If the database has been changed more than 0 times when saving
            if (_context.SaveChanges() > 0)
            {
                return new JsonResult(new {success = true});
            }

            return new JsonResult(new {success = false, message = "There was a problem when updating the database."});
        }

        /**
         * Creates a quiz given its name.
         */
        public ActionResult OnPostCreateQuiz(string name)
        {
            if (name.Length == 0)
            {
                return new JsonResult(new {success = false, message = "Quiz name cannot be empty."});
            }

            var quizInstance = _context.Quizzes.FirstOrDefault(q => q.Name.Equals(name, StringComparison.InvariantCultureIgnoreCase));

            if (quizInstance != null)
            {
                return new JsonResult(new {success = false, message = "A quiz already exists with that name."});
            }

            Models.Quiz quiz = new Models.Quiz
            {
                Name = name
            };

            _context.Quizzes.Add(quiz);

            //If the database has been changed more than 0 times when saving
            if (_context.SaveChanges() > 0)
            {
                return new JsonResult(new {success = true, redirect = Url.Page("EditQuiz", new {quizId = quiz.ID})});
            }

            return new JsonResult(new {success = false, message = "There was a problem when updating the database."});
        }
    }
}