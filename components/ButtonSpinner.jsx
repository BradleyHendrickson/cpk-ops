'use client';

export default function ButtonSpinner({ loading, children, className, ...props }) {
  return (
    <button
      {...props}
      className={`flex items-center justify-center px-4 py-2 font-semibold rounded ${
        props.disabled ? 'bg-gray-400 cursor-not-allowed' : ''
      } ${className}`}
    >
      {loading ? (
        <svg
          className="animate-spin h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          role="status"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          ></path>
        </svg>
      ) : (
        children
      )}
    </button>
  );
}
