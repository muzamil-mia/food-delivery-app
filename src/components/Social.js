import React from 'react';
import { SiGoogle, SiLinkedin, SiGithub } from 'react-icons/si';
import { Github_Link, Gmail_Link, Linkedin_Link } from '../constants';

class Social extends React.Component {
    constructor(props) {
        super(props);

        console.log("Social Component - constructor with props : ", this.props, " from parent and state : ", this.state, " from this component");
    }

    async componentDidMount() {
        console.log("Social Component - componentDidMount", this.props);

    }

    componentDidUpdate() {
        console.log("Social Component - componentDidUpdate")
    }

    componentWillUnmount() {
        console.log("Social Component - componentWillUnmount")
    }

    render() {
        console.log("Social Component - render");
        return (
            <div className="social-media-div text-[2em] text-center w-full flex items-center justify-center">
                <a href={Github_Link} className="mb-2.5" target="_blank"><i className = "bg-github icon--i" ><SiGithub className='m-auto' /></i></a>
                <a href={Linkedin_Link } className="mb-2.5"  target="_blank"><i className = "bg-github icon--i"><SiLinkedin className='m-auto'/></i></a>
                <a href={Gmail_Link} className="mb-2.5" ><i className = "bg-github icon--i"><SiGoogle className='m-auto' /></i></a>
            </div>
        )
    }
}

export default Social;