using TutorialApp.Data;
using TutorialApp.Interfaces;
using TutorialApp.Models;

namespace TutorialApp.Implementation
{
    public class ToDoTasks : IToDoTasks
    {
        private readonly IWebHostEnvironment _environment;
        private readonly ApplicationDbContext _context;
        public ToDoTasks(ApplicationDbContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }
        public void AddTask(Items items, IFormFile image)
        {
            if (image != null && image.Length > 0)
            {
                items.Image = SaveImage(image);
            }
            _context.Items.Add(items);
            _context.SaveChanges();
            
        }

        public List<Items> GetAllItems()
        {
            return _context.Items.ToList();
        }

        public Items GetById(int id)
        {
            var itemId = _context.Items.Where(x => x.Id == id).FirstOrDefault();
            return itemId;
        }

        void IToDoTasks.DeleteTask(Items items)
        {
            _context.Items.Remove(items);
            _context.SaveChanges();
        }

        void IToDoTasks.UpdateTask(Items items, IFormFile image)
        {
            if (image != null && image.Length > 0)
            {
                DeleteExistingImage(items); // Optionally, delete the old image if necessary.
                items.Image = SaveImage(image);
            }
            _context.Items.Update(items);
            _context.SaveChanges();
        }

        private string SaveImage(IFormFile image)
        {
            var uploadsFolderPath = Path.Combine(_environment.WebRootPath, "uploads");
            if (!Directory.Exists(uploadsFolderPath))
                Directory.CreateDirectory(uploadsFolderPath);

            var uniqueFileName = Path.GetRandomFileName() + Path.GetExtension(image.FileName);
            var filePath = Path.Combine(uploadsFolderPath, uniqueFileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                image.CopyTo(stream);
            }

            // Return the relative path of the image, which can be saved in the database.
            return "/uploads/" + uniqueFileName;
        }

        // Helper method to delete an existing image when updating a task.
        private void DeleteExistingImage(Items items)
        {
            if (string.IsNullOrWhiteSpace(items.Image))
                return;

            var existingFilePath = Path.Combine(_environment.WebRootPath, items.Image.TrimStart('/'));
            if (System.IO.File.Exists(existingFilePath))
                System.IO.File.Delete(existingFilePath);
        }

    }
}
