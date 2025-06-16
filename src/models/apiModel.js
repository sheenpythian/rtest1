let blogs = [];
let id = 1;

class Blog {
  constructor({ blog_title, blog_body, blog_date, blog_author, blog_category }) {
    this.id = id++;
    this.blog_title = blog_title;
    this.blog_body = blog_body;
    this.blog_date = blog_date;
    this.blog_author = blog_author;
    this.blog_category = blog_category;
  }
}

module.exports = { blogs, Blog };
