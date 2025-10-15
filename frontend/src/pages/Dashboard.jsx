import "../components/pages.css";

export default function Dashboard() {

    const username = localStorage.getItem("username");

    return (
        <div className="dashboard">
            <h1>Hello, {username}</h1>
            <h2 className="title-text">Your Templates</h2>
        </div>
    );
}