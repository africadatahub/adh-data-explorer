import React, { Component } from 'react';
import { Container, Collapse, NavbarBrand, Nav, NavItem, NavLink, Media } from 'reactstrap';
import $ from 'jquery';

export default class Navigation_state extends Component {

  // Manipulate data coming in
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      expanded: this.props.expanded,
      className: this.props.className,
      logo: this.props.logoPath
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  
expanded(){
  if (this.state.expanded == true) {
    this.state.className += ' nav_mobile_expanded'
    console.log(this.state.logo)
  } else {
    this.state.logo = this.props.logoIconPath// Small logo icon for default
    console.log(this.state.logo)
  }
}

// navScroll(){
//   if (this.state.expanded == true) {
//   console.log(this.state.expanded)
//   // Make the navigation fill or transparent depending on scroll position
//   let scrollpos = window.scrollY
//   const header = document.querySelector(".navigation")
//   // const header_height = header.offsetHeight
//   const header_height = 30
//   let image = document.querySelector(".media-object")
  
//   const add_class_on_scroll = () => {
//     header.classList.remove("nav_mobile_expanded")
//     image.classList.add('animated','fadeOut');
//     image.setAttribute('src', this.props.logoIconPath)
//     image.classList.remove('fadeOut');
//     image.classList.add('fadeIn');
//     header.classList.add("fill")
//     header.classList.add("box-shadow")
//   }
  
//   const remove_class_on_scroll = () => {
//     image.setAttribute('src', this.props.logoPath);
//     setTimeout(() => {
//       header.classList.remove("fill")
//       header.classList.add("nav_mobile_expanded");
//     }, 1000);
//   }

//   window.addEventListener('scroll', function() { 
//     scrollpos = window.scrollY;

//     if (scrollpos <= header_height) { 
//       add_class_on_scroll();

//     }
//     else {
//       remove_class_on_scroll();

//      }

//     console.log(scrollpos)
//   })
   
//    // End of document ready function
//     }

// }

componentWillMount(){
  this.expanded();
}
componentDidMount(){
  // this.navScroll();
}
  
  
  render() {

 

    return (
      <div className={["navigation " + this.state.className]}> {/* Use bg_ and color classes in helpers.scss eg 'bg_transparent' */}
        <Container>
          <nav className="navbar navbar-expand-lg header-navigation"> {/* Used default bootstrap markup to avoid using reactstrap default classes */}
            <NavbarBrand href={this.props.brandHref} id="black-box-logo">
              <Media object src={this.state.logo} alt="Generic placeholder image" />
            </NavbarBrand>
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav navbar>
                {this.props.menu.items.map((item, i) =>
                  <NavItem>
                    <NavLink key={i} href={item[1]}>{item[0]}</NavLink>
                  </NavItem>
                )}
              </Nav>
              <div className="social text-left d-sm-none">
                {this.props.social.items.map((item, i) =>
                  <a key={i} href={item[0]} className="social-link"><i className={item[1]}></i></a>
                )}
              </div>
            </Collapse>
            <button aria-label="Toggle navigation" id="hamburger" type="button" className="navbar-toggler" onClick={this.toggle}>
              <span className="navbar-toggler-line"></span>
              <span className="navbar-toggler-line"></span>
              <span className="navbar-toggler-line"></span>
            </button>
          </nav>
        </Container>
      </div>
    );
  }
}
