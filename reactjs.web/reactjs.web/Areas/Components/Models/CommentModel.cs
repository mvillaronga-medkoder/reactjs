using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using reactjs.web.domain;

namespace reactjs.web.Areas.Components.Models
{
    public class CommentModel
    {
        public string author { get; set; }
        public string createdDate { get; set; }
        public string commentText { get; set; }

        internal CommentModel fromDomain(Comment c)
        {
            this.author = c.Author;
            this.createdDate = c.CreatedDate.ToShortDateString();
            this.commentText = c.CommentText;

            return this;
        }
    }

    public class CommentsList
    {
        public CommentsList() {
            comments = new List<CommentModel>();
        }
        
        public List<CommentModel> comments { get; set; }
    }
}