
import { useState } from "react"
import contact from "../images/Contact-Us.png"
const Contact = () => {

    const [message, setMessage] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage(true);
    }

    return (
        <div className="contact-container">
            <div className="contact-left">
                <img src={contact} alt="" />
            </div>
            <div className="contact-right">
                <h1>Contact us</h1>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Name" required />
                    <textarea placeholder="Type your message here..." required></textarea>
                    <button type="submit">Submit</button>
                    {message && <span>Thanks for contacting FoodFire, we will reply Asap</span>}
                </form>
            </div>
        </div>
    )

}

export default Contact;