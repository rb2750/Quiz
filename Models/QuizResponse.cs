using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Quiz.Models
{
    public class QuizResponse
    {
        [Key]
        [DatabaseGenerated((DatabaseGeneratedOption.Identity))]
        public int ID { get; set; }

        public Quiz Quiz { get; set; }

        [ForeignKey("Quiz")] public int QuizID { get; set; }
        public ICollection<QuizResponseItem> Answers { get; set; }
    }
}