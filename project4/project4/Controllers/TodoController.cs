using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AngularApplication.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using project4.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AngularApplication.Controllers
{
    [Route("api/[controller]")]
    public class TodoController : Controller
    {
        private TodoDBContext dbContext;

        public TodoController(TodoDBContext TodoDBContext)
        {
            this.dbContext =  TodoDBContext;
        }

        // GET: api/<controller>
        [HttpGet]
        public IActionResult Get()
        {
            var todos = this.dbContext.Todo;

            if (todos == null)
            {
                return StatusCode(404);
            }
            else
            {
                return new ObjectResult(todos);
            }
      
            
        }

        // GET api/<controller>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var todo = this.dbContext.Todo.SingleOrDefault(t => t.ID == id);
            IEnumerable<Tag> tags = new List<Tag>();
            tags = this.dbContext.Tags;

            foreach (Tag tag in tags)
            {
               if (tag.TodoId == todo.ID)
               {
                    todo.Tags.Add(tag);
               }
            }
            return new ObjectResult(todo);
        }

        // POST api/<controller>
        [HttpPost]
        public IActionResult Post([FromBody]JObject value)
        {

            Todo myTask = new Todo();
            myTask.Desc = value["desc"].ToString();
            myTask.Date = value["date"].ToString();

            List<string> tags = value["tags"].ToObject<List<string>>();
            List<Tag> tagList = new List<Tag>();
            for (int i = 0; i < tags.Count; i++)
            {
                tagList.Add(new Tag() { Name = tags[i] });
            }
            myTask.Tags = tagList;
            dbContext.Todo.Add(myTask);

            dbContext.SaveChanges();
            return new ObjectResult(myTask);
        }

        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]Todo value)
        {
            var result = dbContext.Todo.SingleOrDefault(b => b.ID == id);

            if(result != null)
            {
                dbContext.Todo.SingleOrDefault(b => b.ID == id).Desc = value.Desc;
                dbContext.Todo.SingleOrDefault(b => b.ID == id).Date = value.Date;
                dbContext.Todo.SingleOrDefault(b => b.ID == id).WarnDay = value.WarnDay;
                dbContext.Todo.SingleOrDefault(b => b.ID == id).WarnHour = value.WarnHour;
                dbContext.Todo.SingleOrDefault(b => b.ID == id).State = value.State;
                dbContext.Todo.SingleOrDefault(b => b.ID == id).Tags = value.Tags;
                dbContext.SaveChanges();
                return StatusCode(201);
            }else
            {
                return StatusCode(404);
            }
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var todo = dbContext.Todo.SingleOrDefault(t => t.ID == id);
            if (todo == null)
            {
                return StatusCode(404);
            }
            dbContext.Todo.Remove(todo);
            dbContext.SaveChanges();

            return StatusCode(201);
        }
    }
}
