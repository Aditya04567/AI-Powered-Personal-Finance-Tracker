const AuthLayout = ({ children }) => {
  return (
    <div className="flex items-center justify-center min-h-screen pt-20 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-violet-50/50 via-white to-blue-50/50">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-violet-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-200/15 rounded-full blur-3xl" />
      </div>
      <div className="animate-fade-in-up">{children}</div>
    </div>
  );
};

export default AuthLayout;
