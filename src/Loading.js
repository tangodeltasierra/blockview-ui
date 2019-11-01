import React from 'react';

const Loading = props => {
  return (
    <div className="vh-100 vw-100 d-flex justify-content-center align-items-center">
      <i className="fas fa-5x fa-spin fa-spinner"></i>
    </div>
  );
};

export default Loading;
