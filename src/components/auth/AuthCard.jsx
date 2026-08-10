function AuthCard({ children }) {
    return (
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">
            {children}
        </div>
    );
}

export default AuthCard;