import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import * as taskService from '../../services/taskService';
import CommentForm from '../CommentForm/CommentForm';
import { Navigate } from 'react-router-dom';

import { AuthedUserContext } from '../../App';


const TaskDetails = (props) => {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const user = useContext(AuthedUserContext);

  useEffect(() => {
    const fetchTask = async () => {
      const taskData = await taskService.show(taskId);
      setTask(taskData);
    };
    fetchTask();
  }, [taskId]);

  const handleAddComment = async (commentFormData) => {
    const newComment = await taskService.createComment(taskId, commentFormData);
    setTask({ ...task, comments: [...task.comments, newComment] });
  };

  const handleDeleteComment = async (commentId) => {
    console.log('commentId:', commentId);
    await taskService.deleteComment(taskId, commentId);
    setTask({
      ...task,
      comments: task.comments.filter((comment) => comment._id !== commentId),
    });
  };
  if (!task) return <main>Loading...</main>;

  return (
    <main>
      <header>
        <p>{task.category.toUpperCase()}</p>
        <h1>{task.title}</h1>
        <p>
          {task.author.username} posted on
          {new Date(task.createdAt).toLocaleDateString()}
        </p>
      </header>

      <p>{task.text}</p>
      {task.author._id === user._id && (
        <>
          <Link to={`/tasks/${taskId}/edit`}>Edit</Link>
          <button onClick={() => props.handleDeleteTask(taskId)}>Delete</button>
        </>
      )}

      <section>
        <h2>Comments</h2>
        <CommentForm handleAddComment={handleAddComment} />
        {!task.comments.length && <p>There are no comments.</p>}

        {task.comments.map((comment) => (
          <article key={comment._id}>
            <header>
              <p>
                {comment.author.username} posted on
                {new Date(comment.createdAt).toLocaleDateString()}
              </p>
              {comment.author._id === user._id && (
                <>
                  <Link to={`/tasks/${taskId}/comments/${comment._id}/edit`}>Edit</Link>
                  <button onClick={() => handleDeleteComment(comment._id)}>Delete</button>
                </>
              )}
            </header>
            <p>{comment.text}</p>
          </article>
        ))}
      </section>
    </main>
  );
};



export default TaskDetails;