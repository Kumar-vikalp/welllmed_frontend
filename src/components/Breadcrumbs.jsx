import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentProduct } from '../store/slices/productsSlice';

export default function Breadcrumbs() {
  const location = useLocation();
  const currentProduct = useSelector(selectCurrentProduct);
  const pathnames = location.pathname.split('/').filter((x) => x);

  const breadcrumbNameMap = {
    'products': 'Products',
    'product': 'Product Details',
    'cart': 'Shopping Cart',
    'checkout': 'Checkout',
    'profile': 'My Profile',
    'orders': 'Order History',
    'search': 'Search',
    'generic-info': 'Generic Medicines',
    'about': 'About Us',
    'contact': 'Contact Us',
    'privacy': 'Privacy Policy',
    'terms': 'Terms of Service',
    'help': 'Help Center',
    'how-to-order': 'How to Order'
  };

  // Get display label for each breadcrumb
  const getDisplayName = (name, index) => {
    const isProductSlug =
      pathnames[index - 1] === 'product' &&
      currentProduct &&
      index === pathnames.length - 1;

    if (isProductSlug) {
      return currentProduct.name;
    }

    if (breadcrumbNameMap[name]) {
      return breadcrumbNameMap[name];
    }

    // Fallback: Humanize the slug
    return name
      .split('-')
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');
  };

  // Build breadcrumb path route
  const getRouteForBreadcrumb = (name, index) => {
    // Special handling for product routes
    if (pathnames[index - 1] === 'product' && index === pathnames.length - 1) {
      return `/${pathnames.slice(0, index + 1).join('/')}`;
    }
    return `/${pathnames.slice(0, index + 1).join('/')}`;
  };

  // Don't render on homepage
  if (pathnames.length === 0) return null;

  return (
    <nav className="bg-neo-canvas border-b-4 border-neo-ink">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <ol className="flex items-center space-x-3 text-sm">
          <li>
            <Link
              to="/"
              className="text-neo-ink hover:bg-neo-secondary hover:px-2 hover:shadow-neo-sm transition-all duration-100 font-bold uppercase"
            >
              <svg className="w-5 h-5 stroke-[3px]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </Link>
          </li>
          {pathnames.map((name, index) => {
            const routeTo = getRouteForBreadcrumb(name, index);
            const isLast = index === pathnames.length - 1;
            const displayName = getDisplayName(name, index);

            return (
              <li key={name} className="flex items-center">
                <svg
                  className="w-5 h-5 text-neo-ink mx-3 stroke-[3px]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                {isLast ? (
                  <span className="text-neo-ink font-black uppercase tracking-wide">
                    {displayName}
                  </span>
                ) : (
                  <Link
                    to={routeTo}
                    className="text-neo-ink hover:bg-neo-accent hover:text-white hover:px-2 hover:shadow-neo-sm transition-all duration-100 font-bold uppercase"
                  >
                    {displayName}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
