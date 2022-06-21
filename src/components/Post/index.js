import DOMPurify from 'dompurify';
import PropTypes from 'prop-types';
import './styles.scss';

function Post({
  title,
  category,
  excerpt,
  content,
  onPostClick,
  isSingle,
}) {
  const textToDisplay = isSingle ? content : excerpt;
  const TitleTag = isSingle ? 'h1' : 'h2';

  const cleanHTML = DOMPurify.sanitize(textToDisplay, { ALLOWED_TAGS: ['em', 'strong'] });

  return (
    <article
      className={isSingle ? 'post post--single' : 'post'}
      onClick={onPostClick}
    >
      <TitleTag className="post-title">{title}</TitleTag>
      <div className="post-category">{category}</div>
      <p
        className="post-text"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: cleanHTML }}
      />
    </article>
  );
}

Post.defaultProps = {
  isSingle: false,
  onPostClick: null,
};

Post.propTypes = {
  category: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  onPostClick: PropTypes.func,
  isSingle: PropTypes.bool,
};

export default Post;
