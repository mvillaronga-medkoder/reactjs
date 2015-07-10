using reactjs.web.domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace reactjs.web.Areas.Components.Models
{
    public class ContractListItemModel
    {
        public string value { get; set; }
        public string description { get; set; }

        public ContractListItemModel fromDomain(Contract contract) {
            this.value = contract.ContractId.ToString();
            this.description = contract.Description;

            return this;
        }
        
    }
}