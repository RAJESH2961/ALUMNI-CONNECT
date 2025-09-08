import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faLinkedinIn, faTwitter } from '@fortawesome/free-brands-svg-icons'

const footerStyles = {
  wrapper: {
    backgroundColor: '#111827', // black/charcoal
    color: '#D1D5DB',
    marginTop: 'auto',
    borderTop: '1px solid #1F2937',
    width: '100%'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '32px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '20px',
    flexWrap: 'wrap',
    width: '100%'
  },
  brand: {
    fontWeight: 700,
    fontSize: '18px',
    color: '#F9FAFB'
  },
  links: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center'
  },
  link: {
    color: '#D1D5DB',
    textDecoration: 'none',
    fontSize: '14px',
    transition: 'color 0.2s ease'
  },
  linkHover: {
    color: '#60A5FA'
  },
  social: {
    display: 'flex',
    gap: '12px'
  },
  iconBtn: {
    width: '38px',
    height: '38px',
    borderRadius: '50%',
    backgroundColor: '#1F2937',
    color: '#F9FAFB',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  iconBtnHover: {
    backgroundColor: '#2563EB',
    transform: 'translateY(-2px)'
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
          <div
            style={footerStyles.iconBtn}
            onMouseEnter={e => Object.assign(e.currentTarget.style, footerStyles.iconBtnHover)}
            onMouseLeave={e => Object.assign(e.currentTarget.style, footerStyles.iconBtn)}
          >
            <FontAwesomeIcon icon={faFacebookF} />
          </div>
          <div
            style={footerStyles.iconBtn}
            onMouseEnter={e => Object.assign(e.currentTarget.style, footerStyles.iconBtnHover)}
            onMouseLeave={e => Object.assign(e.currentTarget.style, footerStyles.iconBtn)}
          >
            <FontAwesomeIcon icon={faLinkedinIn} />
          </div>
          <div
            style={footerStyles.iconBtn}
            onMouseEnter={e => Object.assign(e.currentTarget.style, footerStyles.iconBtnHover)}
            onMouseLeave={e => Object.assign(e.currentTarget.style, footerStyles.iconBtn)}
          >
            <FontAwesomeIcon icon={faTwitter} />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
