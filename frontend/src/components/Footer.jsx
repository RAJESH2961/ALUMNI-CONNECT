import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faLinkedinIn, faTwitter } from '@fortawesome/free-brands-svg-icons'

const footerStyles = {
  wrapper: {
    backgroundColor: '#F3F4F6',
    color: '#1F2937',
    marginTop: '40px',
    borderTop: '1px solid #e5e7eb'
  },
  container: {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '24px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '20px',
    flexWrap: 'wrap'
  },
  brand: {
    fontWeight: 700,
    fontSize: '18px'
  },
  links: {
    display: 'flex',
    gap: '14px',
    alignItems: 'center'
  },
  link: {
    color: '#1F2937',
    textDecoration: 'none',
    fontSize: '14px'
  },
  social: {
    display: 'flex',
    gap: '10px'
  },
  iconBtn: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    backgroundColor: '#2563EB',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}

const Footer = () => {
  return (
    <footer style={footerStyles.wrapper}>
      <div style={footerStyles.container}>
        <div style={footerStyles.brand}>© {new Date().getFullYear()} Alumni Connect</div>
        <div style={footerStyles.links}>
          <a href="#" style={footerStyles.link}>Contact</a>
          <a href="#" style={footerStyles.link}>Privacy</a>
          <a href="#" style={footerStyles.link}>Terms</a>
        </div>
        <div style={footerStyles.social}>
          <div style={footerStyles.iconBtn}><FontAwesomeIcon icon={faFacebookF} /></div>
          <div style={footerStyles.iconBtn}><FontAwesomeIcon icon={faLinkedinIn} /></div>
          <div style={footerStyles.iconBtn}><FontAwesomeIcon icon={faTwitter} /></div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
