using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Quiz.Models
{
    public class QuizResponseItem
    {
        [Key]
        [DatabaseGenerated((DatabaseGeneratedOption.Identity))]
        public int ID { get; set; }

        public int Question { get; set; }
        public int Answer { get; set; }

        public QuizResponse QuizResponse { get; set; }

        [ForeignKey("QuizResponse")] public int QuizResponseId { get; set; }
    }
}