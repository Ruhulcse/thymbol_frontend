import Subscription from '@/components/subscription';
//import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-wrap justify-evenly gap-3">
            <Subscription />
        </div>
    );
};

export default Dashboard;
