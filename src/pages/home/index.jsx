import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/following');
    }
    return (
        <>
            <div>Home</div>
            <button onClick={handleClick}>Go to following</button>
        </>
    )
};

export default Home;