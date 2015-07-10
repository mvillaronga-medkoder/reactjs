using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace reactjs.web.domain
{
    public class Contract
    {
        public int ContractId { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
    }
}