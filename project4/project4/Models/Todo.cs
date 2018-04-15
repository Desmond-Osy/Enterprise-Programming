using project4.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularApplication.Models
{
    public class Todo
    {

        public int ID { get; set; }
        public string Desc { get; set; }
        public string Date { get; set; }

        public int WarnDay { get; set; }
        public int WarnHour { get; set; }
        public string State { get; set; }
        public ICollection<Tag> Tags { get; set; }
    }
}
