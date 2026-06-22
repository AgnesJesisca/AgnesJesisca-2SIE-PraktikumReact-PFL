import { useState } from "react"
import { Link } from "react-router-dom"
import { BsFillExclamationDiamondFill } from "react-icons/bs"
import { ImSpinner2 } from "react-icons/im"
import { supabase } from "@/lib/supabase"

export default function Forgot() {
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        setSuccess("")
        setLoading(true)

        try {
            const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/login`,
            })

            if (resetError) {
                setError(resetError.message)
                setLoading(false)
                return
            }

            setSuccess("Password reset link has been sent to your email.")
            setLoading(false)
        } catch (err) {
            setError(err.message || "An unknown error occurred")
            setLoading(false)
        }
    }

    const errorInfo = error ? (
        <div className="bg-red-200 mb-5 p-5 text-sm font-light text-gray-600 rounded flex items-center">
            <BsFillExclamationDiamondFill className="text-red-600 me-2 text-lg" />
            {error}
        </div>
    ) : null

    const successInfo = success ? (
        <div className="bg-green-100 mb-5 p-5 text-sm font-light text-green-700 rounded flex items-center">
            {success}
        </div>
    ) : null

    const loadingInfo = loading ? (
        <div className="bg-gray-200 mb-5 p-5 text-sm rounded flex items-center">
            <ImSpinner2 className="me-2 animate-spin" />
            Please wait...
        </div>
    ) : null

    return (
        <div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2 text-center">
                Forgot Your Password?
            </h2>
            
            <p className="text-sm text-gray-500 mb-6 text-center">
                Enter your email address and we'll send you a link to reset your
                password.
            </p>

            {errorInfo}
            {successInfo}
            {loadingInfo}

            <form onSubmit={handleSubmit}>
                <div className="mb-5">
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm
                            placeholder-gray-400"
                        placeholder="you@example.com"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4
                        rounded-lg transition duration-300"
                    disabled={loading}
                >
                    Send Reset Link
                </button>
            </form>
            <div className="text-center mt-4 text-sm text-gray-500">
                <Link to="/login" className="hover:text-green-600">Back to Login</Link>
            </div>
        </div>
    )
}
