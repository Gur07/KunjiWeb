import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const AuthContainer = () => {
  const [isLoginView, setIsLoginView] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-8 items-center">
        <div className="w-full">
          {isLoginView ? (
            <LoginForm onSwitchToRegister={() => setIsLoginView(false)} />
          ) : (
            <RegisterForm onSwitchToLogin={() => setIsLoginView(true)} />
          )}
        </div>
        <div className="hidden md:block">
          <img
            src="https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&q=80"
            alt="Login illustration"
            className="w-full h-auto rounded-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default AuthContainer;