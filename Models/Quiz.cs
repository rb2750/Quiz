using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Quiz.Models
{
    public class Quiz
    {
        [Key]
        [DatabaseGenerated((DatabaseGeneratedOption.Identity))]
        public int ID { get; set; }
        public string Name { get; set; }
        
        public ICollection<QuizResponse> Responses { get; set; }
    }
}