import React from 'react'
import GmailIcon from '../../Assets/gmailLogo.png'
import InstagramIcon from '../../Assets/instagramLogo.png'
import FacebookIcon from '../../Assets/facebookLogo.png'
import TwitterIcon from '../../Assets/twitterLogo.png'
import { Link } from "react-router-dom";
const AdminFooter = () => {
  return (
    <div
                className="d-flex justify-content-center mt-3"
                style = {{position:"fixed", bottom :"2px", right:"5px",  width:"100%"}}
                >
                
                    
                        <Link to="mailto:bealfoundationindia@gmail.com">
                        <img
                            src={GmailIcon}
                            alt="gmail"
                            style={{ height: "25px", width: "25px", margin: "3px", marginRight: "2rem",zIndex:"100" }}
                        />
                        </Link>
                        <Link to="https://www.instagram.com/bealfoundation/">
                        <img
                            src={InstagramIcon}
                            alt="instagram"
                            style={{ margin: "auto", height: "25px", width: "25px", margin: "3px", marginRight: "2rem" }}
                        />
                        </Link>
                        <Link to="https://www.facebook.com/bealfoundation">
                        <img
                            src={FacebookIcon}
                            alt="facebook"
                            style={{ margin: "auto", height: "25px", width: "25px", margin: "3px", marginRight: "2rem" }}
                        />
                        </Link>
                        <Link to="https://twitter.com/bealfoundation">
                        <img
                            src={TwitterIcon}
                            alt="twitter"
                            style={{ margin: "auto", height: "25px", width: "25px", margin: "3px", marginRight: "2rem" }}
                        />
                        </Link>
                                        </div>
  )
}

export default AdminFooter