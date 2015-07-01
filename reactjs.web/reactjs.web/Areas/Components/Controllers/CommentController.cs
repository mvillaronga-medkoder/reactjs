using System.Linq;
using System.Collections.Generic;
using System.Web.Mvc;

using Newtonsoft.Json;

using reactjs.web.Areas.Components.Models;
using reactjs.web.services;
using reactjs.web.domain;
using System;

namespace reactjs.web.Areas.Components.Controllers
{
    public class CommentController : Controller
    {
        RepositoryMock repo = new RepositoryMock();

        public CommentController() {
        }

        // GET: Components/Comment
        public ActionResult Index()
        {
            return View();
        }

        //GET:  Components/Comment/List

        [HttpGet]
        public JsonResult List()
        {
            JsonResult ret = new JsonResult() { JsonRequestBehavior = JsonRequestBehavior.AllowGet };

            List<CommentModel> comments = new List<CommentModel>();

            repo.Query<Comment>().ToList().ForEach(c => comments.Add(new CommentModel().fromDomain(c)));

            ret = Json(comments);
            ret.JsonRequestBehavior = JsonRequestBehavior.AllowGet;

            return ret;
        }

        [HttpPost]
        public JsonResult Add(string text)
        {
            JsonResult ret = new JsonResult() { JsonRequestBehavior = JsonRequestBehavior.AllowGet };

            repo.Save(new Comment() {
             Author = "Villaronga, Michael", //from some app context server
             CommentText = text,
             CreatedDate = DateTime.Now
            });


            List<CommentModel> comments = new List<CommentModel>();
            repo.Query<Comment>().ToList().ForEach(c => comments.Add(new CommentModel().fromDomain(c)));
            ret = Json(comments);
            ret.JsonRequestBehavior = JsonRequestBehavior.AllowGet;

            return ret;
        }


        [HttpPost]
        public JsonResult Delete(int id)
        {
            JsonResult ret = new JsonResult() { JsonRequestBehavior = JsonRequestBehavior.AllowGet };

            Comment cmt = repo.GetById<Comment>(id);
            repo.Delete(cmt);

            List<CommentModel> comments = new List<CommentModel>();
            repo.Query<Comment>().ToList().ForEach(c => comments.Add(new CommentModel().fromDomain(c)));
            ret = Json(comments);
            ret.JsonRequestBehavior = JsonRequestBehavior.AllowGet;

            return ret;
        }
    }
}