namespace TutorialApp.Models
{
    public class Items
    {
        public int Id { get; set; } 
        public string Title { get; set; } = null!;
        public string Description { get; set; } = null!;
        public string Priority { get; set; } = null!;
        public string Image { get; set; } = null!;
    }
}
