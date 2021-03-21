﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Quiz.Models
{
    public class QuizQuestion
    {        
        [Key]
        [DatabaseGenerated((DatabaseGeneratedOption.Identity))]
        public int ID { get; set; }
        
        public string Question { get; set; }

        public Quiz Quiz { get; set; }

        [ForeignKey("Quiz")] public int QuizID { get; set; }
    }
}