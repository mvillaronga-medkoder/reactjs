using reactjs.web.Areas.Components.Models;
using reactjs.web.domain;
using reactjs.web.services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace reactjs.web.Areas.Components.Controllers
{
    public class ContractComboController : Controller
    {
        RepositoryMock repo = new RepositoryMock();

        public ContractComboController() {
            //add some contracts to be listed, would be already in the DB in a real app
            repo.Save(new Contract() { ContractId = 1, Description = "ORC 115", StartDate = new DateTime(2015, 1, 1) });
            repo.Save(new Contract() { ContractId = 2, Description = "Ochsner Ram 2014", StartDate = new DateTime(2014, 1, 1) });
            repo.Save(new Contract() { ContractId = 3, Description = "ORC 215", StartDate = new DateTime(2015, 6, 1) });
        }


        // GET: Components/ContractCombo
        public ActionResult Index()
        {
            return View();
        }

        //GET:  Components/ContractComboController/List
        [HttpGet]
        public JsonResult List()
        {
            JsonResult ret = new JsonResult() { JsonRequestBehavior = JsonRequestBehavior.AllowGet };

            List<ContractListItemModel> contracts = new List<ContractListItemModel>();

            List<Contract> cnts = (from c in repo.Query<Contract>()
                                        orderby c.StartDate descending
                                        select c)
                                        .ToList();

            cnts.ForEach(c => contracts.Add(new ContractListItemModel().fromDomain(c)));

            ret = Json(contracts);
            ret.JsonRequestBehavior = JsonRequestBehavior.AllowGet;

            return ret;
        }

    }
}