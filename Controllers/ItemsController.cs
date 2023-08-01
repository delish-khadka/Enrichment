using Microsoft.AspNetCore.Mvc;
using TutorialApp.Interfaces;
using TutorialApp.Models;

namespace TutorialApp.Controllers
{
    public class ItemsController : Controller
    {
        private readonly IToDoTasks _toDoTasks;
        public ItemsController(IToDoTasks toDoTasks)
        {
            _toDoTasks=toDoTasks;
        }
        public IActionResult Index()
        {
            var allItems = _toDoTasks.GetAllItems();
            return View(allItems);
        }

        [HttpGet]
        public IActionResult AddItems() {
            return View();
        }

        [HttpPost]
        public IActionResult AddItems(Items items, IFormFile image)
        {
           _toDoTasks.AddTask(items,image);
           return RedirectToAction("Index");
        }

        [HttpGet]
        public IActionResult UpdateItems(int id) {
            var itemToUpdate = _toDoTasks.GetById(id);
            return View(itemToUpdate);
        }

        [HttpPost]
        public IActionResult UpdateItems(Items items, IFormFile image)
        {
            _toDoTasks.UpdateTask(items, image);
            return RedirectToAction("Index");
        }

        [HttpPost]
        public IActionResult Delete(int id)
        {
            var itemToDelete = _toDoTasks.GetById(id);
            _toDoTasks.DeleteTask(itemToDelete);
            return RedirectToAction("Index");
        }

    }
}
