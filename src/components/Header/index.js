import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import './styles.scss';

function Header({ categories, isZen, onZenToggle }) {
  return (
    <header className="menu">
      <nav>
        {
          categories.map((category) => (

            <NavLink
              key={category.route}
              className={({ isActive }) => (isActive ? 'menu-link menu-link--selected' : 'menu-link')}
              to={category.route}
            >
              {category.label}
            </NavLink>
          ))
        }
        <button
          className="menu-btn"
          type="button"
          onClick={onZenToggle}
        >
          {isZen ? 'Désactiver le mode zen' : 'Activer le mode zen'}
        </button>
      </nav>
    </header>
  );
}

Header.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      route: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  isZen: PropTypes.bool.isRequired,
  onZenToggle: PropTypes.func.isRequired,
};

export default Header;
