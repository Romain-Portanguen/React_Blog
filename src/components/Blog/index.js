/* eslint-disable no-console */
import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import axios from 'axios';

import Header from 'src/components/Header';
import Posts from 'src/components/Posts';
import Footer from 'src/components/Footer';
import SingleArticle from 'src/components/SingleArticle';
import NotFound from 'src/components/NotFound';
import Spinner from 'src/components/Spinner';

import categoriesData from 'src/data/categories';
import './styles.scss';

const getPostsByCategory = (posts, categoryName) => {
  if (categoryName === 'Accueil') {
    return posts;
  }
  return posts.filter((post) => post.category === categoryName);
};

function Blog() {
  const [isZenMode, setIsZenMode] = useState(false);

  const [posts, setPosts] = useState([]);

  const [categories, setCategories] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleZenModeChange = () => {
    setIsZenMode(!isZenMode);
  };

  const loadPostsAndCateogries = () => {
    setIsLoading(true);

    Promise.all([
      axios.get('https://oclock-open-apis.vercel.app/api/blog/posts'),
      axios.get('https://oclock-open-apis.vercel.app/api/blog/categories'),
    ])
      .then((responses) => {
        setPosts(responses[0].data);
        setCategories(responses[1].data);
      })
      .catch((error) => {
        console.log('Sorry: ', error.message);
      })
      .finally(() => {
        // et je remet mon isLoading a false
        setIsLoading(false);
      });
  };

  useEffect(() => {
    loadPostsAndCateogries();
  }, []);

  useEffect(() => {
  }, [isZenMode]);

  return (
    <div className="blog">
      <Header
        categories={categoriesData}
        isZen={isZenMode}
        onZenToggle={handleZenModeChange}
      />
      {isLoading && <Spinner />}
      <Routes>
        {
          categoriesData.map((category) => (

            <Route
              key={category.route}
              path={category.route}
              element={(
                <Posts
                  posts={getPostsByCategory(posts, category.label)}
                  isZen={isZenMode}
                />
              )}
            />
          ))
        }
        <Route
          path="/article/:slug"
          element={(
            <SingleArticle
              isZen={isZenMode}
              posts={posts}
            />
          )}
        />
        {categories.length > 0 && <Route path="*" element={<NotFound />} />}
      </Routes>

      <Footer />
    </div>
  );
}

export default Blog;
