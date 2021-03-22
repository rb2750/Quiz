using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Quiz.Models
{
    public class QuizAnswer
    {
        [Key]
        [DatabaseGenerated((DatabaseGeneratedOption.Identity))]
        public int ID { get; set; }

        public int Order { get; set; }
        public string Answer { get; set; }

        public QuizQuestion Question { get; set; }
        
        [ForeignKey("Question")] public int QuestionID { get; set; }
    }
}