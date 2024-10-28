import { useNavigate } from "react-router-dom";
import notFoundImage from '../assets/404-page-not-found.svg';
import { Button } from "antd";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center">
            <img src={notFoundImage} alt="Not Found" className="w-1/3 mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
            <p className="text-lg mb-6">Sorry, the page you were looking for does not exist.</p>
            <Button type="primary" onClick={() => navigate('/')}>
                Go to Home
            </Button>
        </div>
    );
};

export default NotFound;