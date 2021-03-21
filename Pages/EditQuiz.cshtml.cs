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

            _context.Quizzes.Add(new Models.Quiz
            {
                Name = name
            });

            //If the database has been changed more than 0 times when saving
            if (_context.SaveChanges() > 0)
            {
                return new JsonResult(new {success = true});
            }

            return new JsonResult(new {success = false, message = "There was a problem when updating the database."});
        }
    }
}