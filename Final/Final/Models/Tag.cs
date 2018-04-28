
using AngularApplication.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace project4.Models
{
    public class Tag
    {
        public int ID { get; set; }
        public string Name { get; set; }
        
        [ForeignKey("Todo")]
        public int TodoId { get; set; }
    }
}
