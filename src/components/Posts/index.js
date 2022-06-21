import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Post from 'src/components/Post';

import './styles.scss';

function Posts({ posts, isZen }) {
  const navigate = useNavigate();

  return (
    <main className={isZen ? 'posts posts--zen' : 'posts'}>
      <h1 className="posts-title">Dev Of Thrones</h1>
      <div className="posts-list">
        {
          posts.map((post) => (
            <Post
              key={post.id}
              {...post}
              onPostClick={() => {
                navigate(`/article/${post.slug}`);
              }}
            />
          ))
        }
      </div>
    </main>
  );
}

Posts.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      excerpt: PropTypes.string.isRequired,
    }),
  ).isRequired,
  isZen: PropTypes.bool.isRequired,
};

export default Posts;
