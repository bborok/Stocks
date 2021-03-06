import React from 'react';
import { Button } from 'react-bootstrap';
import '../pages/css/App.css';
import 'font-awesome/css/font-awesome.min.css';

// https://www.coderomeos.org/scroll-to-top-of-the-page-a-simple-react-component
class ScrollButton extends React.Component {
    
    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    render() {
        return (
            <div>
                <Button className='scrollButton' id="scrollbtn" onClick={this.scrollToTop}><i className="fa fa-2x fa-angle-double-up"></i></Button>
            </div>
        )
    }
}

export default ScrollButton;