using TutorialApp.Models;

namespace TutorialApp.Interfaces
{
    public interface IToDoTasks
    {
        List<Items> GetAllItems();
        Items GetById(int id);
        void AddTask(Items items,IFormFile image);
        void UpdateTask(Items items, IFormFile image);
        void DeleteTask(Items items);

    }
}
