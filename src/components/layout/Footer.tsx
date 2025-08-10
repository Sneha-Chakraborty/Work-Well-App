
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-zenith-purple-light to-zenith-purple-dark flex items-center justify-center">
                <span className="text-white font-bold">Z</span>
              </div>
              <span className="text-xl font-serif font-bold bg-clip-text text-transparent bg-gradient-to-r from-zenith-purple-light to-zenith-purple-dark">
                ZenithMind
              </span>
            </Link>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              Elevate your mind to its zenith with our comprehensive wellness platform for working professionals.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Features</h3>
            <ul className="space-y-3">
              <li><Link to="/assessment" className="text-sm text-gray-600 hover:text-zenith-purple-dark dark:text-gray-400 dark:hover:text-zenith-purple-light">Stress Assessment</Link></li>
              <li><Link to="/mindfulness" className="text-sm text-gray-600 hover:text-zenith-purple-dark dark:text-gray-400 dark:hover:text-zenith-purple-light">Mindfulness & Meditation</Link></li>
              <li><Link to="/tasks" className="text-sm text-gray-600 hover:text-zenith-purple-dark dark:text-gray-400 dark:hover:text-zenith-purple-light">Task & Time Management</Link></li>
              <li><Link to="/community" className="text-sm text-gray-600 hover:text-zenith-purple-dark dark:text-gray-400 dark:hover:text-zenith-purple-light">Community Forums</Link></li>
              <li><Link to="/counseling" className="text-sm text-gray-600 hover:text-zenith-purple-dark dark:text-gray-400 dark:hover:text-zenith-purple-light">Online Counseling</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-sm text-gray-600 hover:text-zenith-purple-dark dark:text-gray-400 dark:hover:text-zenith-purple-light">About Us</Link></li>
              <li><Link to="/contact" className="text-sm text-gray-600 hover:text-zenith-purple-dark dark:text-gray-400 dark:hover:text-zenith-purple-light">Contact</Link></li>
              <li><Link to="/careers" className="text-sm text-gray-600 hover:text-zenith-purple-dark dark:text-gray-400 dark:hover:text-zenith-purple-light">Careers</Link></li>
              <li><Link to="/blog" className="text-sm text-gray-600 hover:text-zenith-purple-dark dark:text-gray-400 dark:hover:text-zenith-purple-light">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Legal</h3>
            <ul className="space-y-3">
              <li><Link to="/privacy" className="text-sm text-gray-600 hover:text-zenith-purple-dark dark:text-gray-400 dark:hover:text-zenith-purple-light">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-sm text-gray-600 hover:text-zenith-purple-dark dark:text-gray-400 dark:hover:text-zenith-purple-light">Terms of Service</Link></li>
              <li><Link to="/cookies" className="text-sm text-gray-600 hover:text-zenith-purple-dark dark:text-gray-400 dark:hover:text-zenith-purple-light">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8">
          <p className="text-sm text-center text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} ZenithMind. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
