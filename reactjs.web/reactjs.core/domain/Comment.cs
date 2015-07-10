using System;

namespace reactjs.core.domain
{
    public class Comment
    {
        public int CommentId { get; set; }
        public string CommentText { get; set; }
        public string Author { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}