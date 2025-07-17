import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

const Footer = () => {
  return (
    <>
      <footer className="footer py-3 my-3">
        <hr className="border-bottom" />
        <p className="text-light text-center">
          Built with Django and React.js with{' '}
          <FontAwesomeIcon icon={faHeart} className="heart-icon" style={{ color: '#ff0000' }} /> by Rajesh Gangadharam
        </p>

        {/* Internal CSS */}
        <style>{`
          // .footer {
          //   background-color: #111;
          //   color: #fff;
          //   padding: 1rem 0;
          //   text-align: center;
          // }

          .border-bottom {
            border-color: rgba(255, 255, 255, 0.2);
          }

          .text-light {
            color: #f8f9fa;
          }

          .text-center {
            text-align: center;
          }

          .heart-icon {
            animation: pulse 1.5s infinite;
            margin: 0 4px;
          }

          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); }
          }

          .py-3 {
            padding-top: 1rem;
            padding-bottom: 1rem;
          }

          .my-3 {
            margin-top: 1rem;
            margin-bottom: 1rem;
          }
        `}</style>
      </footer>
    </>
  )
}

export default Footer
