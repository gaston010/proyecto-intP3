import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const ForgotPasswordForm = () => {
  return (
    <div className="max-w-md mx-auto p-6">
      <form>
        <div className="mb-6">
          <div className="relative">
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              type="text"
              placeholder="Email"
              required
            />
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FaUser className="text-gray-500" />
            </span>
          </div>
        </div>
        <div className="flex justify-center gap-4 mb-6">
          <Link
            to="/login"
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
          >
            Back to Login
          </Link>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
