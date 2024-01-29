import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const BlogDetails = () => {
  const [comment, setComment] = useState("");
  const { id } = useParams();
  const [blog, setBlog] = useState("");
  const [blogComments, setBlogComments] = useState([]);
  const [commentsFetched, setCommentsFetched] = useState(false);
  const navigate = useNavigate();
  const { uid } = useContext(AuthContext);

  useEffect(() => {
    fetch(`http://localhost:5000/comments`)
      .then((res) => res.json())
      .then((data) => {
        setBlogComments(data.filter((bcomment) => bcomment.blogId === blog.id));
        setComment("");
      });
  }, [blog.id]);

  useEffect(() => {
    // Fetch blog details
    fetch(`http://localhost:5000/blogs/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setBlog(data);
      });

    // Load comments from localStorage if they have been cached
    const cachedComments = localStorage.getItem(`blogComments-${id}`);
    if (cachedComments && !commentsFetched) {
      setBlogComments(JSON.parse(cachedComments));
      console.log("Fetching comments from localStorage");
      setCommentsFetched(true);
      return; // Skip fetching from API if comments are loaded from localStorage
    }

    // Fetch comments only if they have not been fetched before
    if (!commentsFetched) {
      console.log("Fetching comments from Api");
      fetch(`http://localhost:5000/comments`)
        .then((res) => res.json())
        .then((data) => {
          setBlogComments(
            data.filter((bcomment) => bcomment.blogId === blog.id)
          );
          setComment("");

          // Cache comments in localStorage
          localStorage.setItem(
            `blogComments-${id}`,
            JSON.stringify(blogComments)
          );
        });

      setCommentsFetched(true);
    }
  }, [id, blog.id, commentsFetched, blogComments]);

  const handleDelete = () => {
    fetch(`http://localhost:5000/blogs/${id}`, {
      method: "DELETE",
    }).then(() => {
      navigate("/");
    });
  };

  const handlePostComment = () => {
    const uniqueCommentId = Date.now();
    const newComment = {
      blogId: blog.id,
      id: uniqueCommentId,
      userUid: uid,
      name: "Anonymous",
      email: "Anonymous",
      body: comment,
    };

    // Post the new comment
    fetch("http://localhost:5000/comments", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newComment),
    })
      .then((res) => res.json())
      .then(() => {
        // Fetch updated comments after posting
        fetch(`http://localhost:5000/comments`)
          .then((res) => res.json())
          .then((data) => {
            setBlogComments(
              data.filter((bcomment) => bcomment.blogId === blog.id)
            );
            setComment("");
          });
      });
  };

  const handleCommentDelete = (commentId) => {
    fetch(`http://localhost:5000/comments/${commentId}`, {
      method: "DELETE",
    }).then(() => {
      // Fetch updated comments after deletion
      fetch(`http://localhost:5000/comments`)
        .then((res) => res.json())
        .then((data) => {
          setBlogComments(
            data.filter((bcomment) => bcomment.blogId === blog.id)
          );
        });
    });
  };

  const handleCommentEditStart = (commentId, originalBody) => {
    setBlogComments((prevComments) =>
      prevComments.map((comment) =>
        comment._id === commentId
          ? { ...comment, isEditing: true, editedBody: originalBody }
          : comment
      )
    );
  };

  const handleCommentEditChange = (commentId, editedBody) => {
    setBlogComments((prevComments) =>
      prevComments.map((comment) =>
        comment._id === commentId ? { ...comment, editedBody } : comment
      )
    );
  };

  const handleCommentEditSave = (commentId) => {
    const editedComment = blogComments.find(
      (comment) => comment._id === commentId
    );

    // Save the edited comment to the server
    fetch(`http://localhost:5000/comments/${commentId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ body: editedComment.editedBody }),
    })
      .then((res) => res.json())
      .then(() => {
        // Fetch updated comments after saving the edit
        fetch(`http://localhost:5000/comments`)
          .then((res) => res.json())
          .then((data) => {
            setBlogComments(
              data.filter((bcomment) => bcomment.blogId === blog.id)
            );
          });
      });
  };

  //handle favorite
  const handleFavorite = () => {
    const favoriteUpdate = {
      isFavorite: true,
    };
    fetch(`http://localhost:5000/blogs/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(favoriteUpdate),
    })
      .then((res) => res.json())
      .then(() => {
        navigate("/favorites");
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  };
  //handle unfavorite
  const handleUnfavorite = () => {
    const favoriteUpdate = {
      isFavorite: false,
    };
    fetch(`http://localhost:5000/blogs/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(favoriteUpdate),
    })
      .then((res) => res.json())
      .then(() => {
        navigate("/favorites");
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  };

  return (
    <div className="ml-6">
      <h1 className="text-2xl font-bold">{blog.title}</h1>
      <p>{blog.body}</p>
      <div className="flex gap-4 my-4">
        {blog.userId === uid ? (
          <>
            {" "}
            <Link to={`/editblog/${blog._id}`}>
              <button className="bg-black px-4 py-2 rounded-lg text-white">
                Edit
              </button>
            </Link>
            <button
              onClick={handleDelete}
              className="bg-red-600 px-4 py-2 rounded-lg text-white"
            >
              Delete
            </button>
          </>
        ) : (
          " "
        )}
        {blog.isFavorite ? (
          <button
            onClick={handleUnfavorite}
            className="bg-black px-4 py-2 rounded-lg text-white"
          >
            Unfavorite
          </button>
        ) : (
          <button
            onClick={handleFavorite}
            className="bg-black px-4 py-2 rounded-lg text-white"
          >
            Favorite
          </button>
        )}
      </div>
      <div className="flex gap-4 mt-5">
        <input
          type="text"
          placeholder="Add comment"
          className="input input-bordered w-full max-w-xs"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          onClick={handlePostComment}
          className="bg-black px-4 py-2 rounded-lg text-white"
        >
          Add
        </button>
      </div>
      <div className="my-4">
        <ul className="w-1/2">
          {blogComments.map((comment) => (
            <li
              className="border border-gray-400 shadow-lg rounded mb-2 p-3"
              key={comment._id}
            >
              {comment.isEditing ? (
                // Render an input field for editing
                <div className="flex justify-between">
                  <input
                    type="text"
                    value={comment.editedBody}
                    onChange={(e) =>
                      handleCommentEditChange(comment._id, e.target.value)
                    }
                  />
                  <button
                    onClick={() => handleCommentEditSave(comment._id)}
                    className="mx-2 bg-green-500 px-2 py-1 rounded-lg text-white"
                  >
                    Save
                  </button>
                </div>
              ) : (
                // Render the comment text
                <div className="flex justify-between">
                  <div className="w-1/3">{comment.body}</div>
                  <div className="flex">
                    {comment.userUid === uid && (
                      <>
                        <button
                          onClick={() =>
                            handleCommentEditStart(comment._id, comment.body)
                          }
                          className="mx-2 bg-black px-4 py-2 rounded-lg text-white"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleCommentDelete(comment._id)}
                          className="ml-2 bg-red-600 px-2 py-1 rounded-lg text-white"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BlogDetails;
