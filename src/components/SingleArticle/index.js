/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

import NotFound from 'src/components/NotFound';
import Post from 'src/components/Post';

function SingleArticle({ posts, isZen }) {
  const params = useParams();

  if (posts.length === 0) {
    return null;
  }

  const foundPost = posts.find((post) => post.slug === params.slug);

  if (!foundPost) {
    return <NotFound />;
  }

  return (
    <div className={isZen ? 'posts--zen' : ''}>
      <Post
        isSingle
        {...foundPost}
      />
    </div>
  );
}

SingleArticle.propTypes = {
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

export default SingleArticle;
