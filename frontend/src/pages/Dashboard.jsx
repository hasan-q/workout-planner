export default function Dashboard() {

    const username = localStorage.getItem("username");

    return (
        <div className="dashboard">
            <h2>Hello, {username}</h2>
        </div>
    );
}