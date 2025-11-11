import React from 'react';
import { useNavigate } from 'react-router';

export const HomeBar = ({ user }) => {
  const navigate = useNavigate();

  return (
    <>
      {/* Bal felső sarok - Home ikon */}
      <div className="homebar-left">
        <span 
          className="homebar-icon" 
          title="Kezdőlap" 
          onClick={() => navigate('/')}
        >
          🏠
        </span>
      </div>

      {/* Jobb felső sarok - Auth ikonok */}
      {!user && (
        <div className="homebar-right">
          <span 
            className="homebar-icon" 
            title="Bejelentkezés" 
            onClick={() => navigate('/signIn')}
          >
            🔑
          </span>

          <span 
            className="homebar-icon" 
            title="Regisztráció" 
            onClick={() => navigate('/signUp')}
          >
            🧾
          </span>
        </div>
      )}
    </>
  );
};
