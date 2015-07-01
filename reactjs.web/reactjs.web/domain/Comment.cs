using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace reactjs.web.domain
{
    public class Comment
    {
        public int CommentId { get; set; }
        public string CommentText { get; set; }
        public string Author { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}