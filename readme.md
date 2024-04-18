!["ERD diagram showing relationships between models."]("./ERD.png")

[x] Users should have a first_name, last_name, email, password, (you can add other attributes you want to store about the user)

[x] A user should be able to sign up and sign in into the blog app

[x] Use JWT as authentication strategy and expire the token after 1 hour

[x] A blog can be in two states; draft and published

[x] Logged in and not logged in users should be able to get a list of published blogs created

[x] Logged in and not logged in users should be able to to get a published blog

[x] Logged in users should be able to create a blog.

[x] When a blog is created, it is in draft state

[x] The owner of the blog should be able to update the state of the blog to published

[x] The owner of a blog should be able to edit the blog in draft or published state

[x] The owner of the blog should be able to delete the blog in draft or published state

[x] The owner of the blog should be able to get a list of their blogs.

[x] The endpoint should be paginated

[x] It should be filterable by state

[x] Blogs created should have title, description, tags, author, timestamp, state, read_count, reading_time and body.

[x] The list of blogs endpoint that can be accessed by both logged in and not logged in users should be paginated,

[x] default it to 20 blogs per page.

[x] It should also be searchable by author, title and tags.

[x] It should also be orderable by read_count, reading_time and timestamp

[x] When a single blog is requested, the api should return the user information(the author) with the blog. The read_count of the blog too should be updated by 1

[x] Come up with any algorithm for calculating the reading_time of the blog.

[x] Write tests for all endpoints

[x] Create an ERD for entities and show relationships

[x] Use Winston and ensure functions and processes are logged
